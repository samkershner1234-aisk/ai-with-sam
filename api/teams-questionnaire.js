// Vercel serverless function: secure server-side submission for the Teams
// questionnaire (Tell Me About Your Team / See If a Small Pilot Makes Sense).
// Reuses the SAME Apps Script endpoint and shared secret as the Free AI Audit.
// Never exposes the Apps Script URL or shared secret to the browser.

const SCHEMA_VERSION = 2;

export const maxDuration = 60;

// ---- basic in-memory throttle (best-effort; per warm instance only) ----
const HITS = new Map();
const WINDOW_MS = 60 * 1000;
const MAX_PER_WINDOW = 8;
function throttled(ip) {
  const now = Date.now();
  const arr = (HITS.get(ip) || []).filter((t) => now - t < WINDOW_MS);
  arr.push(now);
  HITS.set(ip, arr);
  if (HITS.size > 2000) HITS.clear();
  return arr.length > MAX_PER_WINDOW;
}

function str(v, max) {
  if (v == null) return "";
  return String(v).slice(0, max);
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  return await new Promise((resolve) => {
    let data = "";
    req.on("data", (c) => { data += c; if (data.length > 100000) req.destroy(); });
    req.on("end", () => { try { resolve(JSON.parse(data || "{}")); } catch (e) { resolve(null); } });
    req.on("error", () => resolve(null));
  });
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ success: false, code: "METHOD_NOT_ALLOWED", message: "Method not allowed." });
  }

  const ip = (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() || "unknown";
  if (throttled(ip)) return res.status(429).json({ success: false, code: "RATE_LIMITED", message: "Too many requests. Please try again shortly." });

  const body = await readBody(req);
  if (!body || typeof body !== "object") return res.status(400).json({ success: false, code: "INVALID_REQUEST", message: "We could not read your submission." });

  // Honeypot: mirrors the hidden "website" field on the Teams form. Any value means bot.
  if (str(body.website, 200).trim().length > 0) return res.status(200).json({ ok: true });

  const name = str(body.name, 100).trim();
  const email = str(body.email, 160).trim().toLowerCase();
  if (!name) return res.status(400).json({ success: false, code: "INVALID_REQUEST", message: "Please enter your name." });
  if (!email || email.length > 160 || !EMAIL_RE.test(email)) {
    return res.status(400).json({ success: false, code: "INVALID_REQUEST", message: "Please enter a valid work email." });
  }

  const APPS_SCRIPT_URL = process.env.AI_AUDIT_APPS_SCRIPT_URL;
  const SHARED_SECRET = process.env.AI_AUDIT_SHARED_SECRET;
  if (!APPS_SCRIPT_URL || !SHARED_SECRET) {
    // Do not leak which variable is missing.
    return res.status(503).json({ success: false, code: "NOT_CONFIGURED", message: "Lead storage is not configured." });
  }

  const payload = {
    schemaVersion: SCHEMA_VERSION,
    sharedSecret: SHARED_SECRET,
    formType: "teams_questionnaire",
    source: "Teams Questionnaire",
    questionnaireName: "Tell Me About Your Team / See If a Small Pilot Makes Sense",
    pageSource: str(body.pageSource, 200) || "/teams",
    submittedAt: new Date().toISOString(),
    name,
    email,
    company: str(body.company, 120).trim(),
    companySize: str(body.companySize, 40).trim(),
    participantCount: str(body.participantCount, 60).trim(),
    teamsLabel: str(body.teamsLabel, 300).trim(),
    mainGoal: str(body.mainGoal, 800).trim(),
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 20000);
    const upstream = await fetch(APPS_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timer);

    let data = null;
    const text = await upstream.text();
    try { data = JSON.parse(text); } catch (e) { data = null; }

    if (!upstream.ok || !data || data.success !== true) {
      console.error("Teams questionnaire storage rejected:", data && data.code ? data.code : "unknown");
      return res.status(502).json({ success: false, code: "SUBMISSION_FAILED", message: "We could not save your details." });
    }
    return res.status(200).json({ success: true, action: data.action === "updated" ? "updated" : "created" });
  } catch (e) {
    console.error("Teams questionnaire upstream error:", e && e.name ? e.name : "exception");
    return res.status(502).json({ success: false, code: "SUBMISSION_FAILED", message: "We could not save your details." });
  }
}
