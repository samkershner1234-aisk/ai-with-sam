// Vercel serverless function: secure server-side lead submission.
// Runtime: Node.js (Vercel default). Never exposes the Apps Script URL or shared secret to the browser.

const SCHEMA_VERSION = 2;

const CATEGORY_VALUES = ["writing","research","organisation","meetings","content","analysis","administration","other"];
const READINESS_VALUES = ["beginner","experimenting","developing","confident"];

const FREQUENCY_VALUES = [60, 20, 12, 4, 2, 0.5];
const TIME_VALUES = [0.17, 0.375, 0.75, 1.5, 3, 5];

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

function computeMonthlyHours(f, t) {
  const a = Number(f), b = Number(t);
  if (!isFinite(a) || !isFinite(b) || a < 0 || b < 0) return 0;
  return Math.round(a * b * 100) / 100;
}
function mapMonthlyRange(hours) {
  const h = Number(hours);
  if (!isFinite(h) || h < 1) return "Under 1 hour per month";
  if (h < 3) return "Around 1-3 hours per month";
  if (h < 5) return "Around 3-5 hours per month";
  if (h < 10) return "Around 5-10 hours per month";
  return "More than 10 hours per month";
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
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ip = (req.headers["x-forwarded-for"] || "").toString().split(",")[0].trim() || "unknown";
  if (throttled(ip)) return res.status(429).json({ ok: false, error: "Too many requests" });

  const body = await readBody(req);
  if (!body || typeof body !== "object") return res.status(400).json({ ok: false, error: "Invalid request" });

  // Honeypot: any value means bot. Return a generic OK so bots do not learn anything.
  if (str(body.company, 200).trim().length > 0) return res.status(200).json({ ok: true });

  const firstName = str(body.firstName, 80).trim();
  const email = str(body.email, 160).trim();
  if (!firstName) return res.status(400).json({ ok: false, error: "First name is required" });
  if (!EMAIL_RE.test(email)) return res.status(400).json({ ok: false, error: "A valid email is required" });

  const taskCategory = CATEGORY_VALUES.includes(body.taskCategory) ? body.taskCategory : "other";
  const taskDescriptionValue = str(body.taskDescription, 300);
  if (taskCategory === "other" && taskDescriptionValue.trim().length < 3) {
    return res.status(400).json({ ok: false, error: "Please describe the task" });
  }
  const readinessLevel = READINESS_VALUES.includes(body.readinessLevel) ? body.readinessLevel : "beginner";
  const monthlyFrequency = FREQUENCY_VALUES.includes(Number(body.monthlyFrequency)) ? Number(body.monthlyFrequency) : 0;
  const timePerOccurrenceHours = TIME_VALUES.includes(Number(body.timePerOccurrenceHours)) ? Number(body.timePerOccurrenceHours) : 0;

  // Server-side recalculation (never trust client math).
  const estimatedMonthlyHours = computeMonthlyHours(monthlyFrequency, timePerOccurrenceHours);
  const estimatedMonthlyRange = mapMonthlyRange(estimatedMonthlyHours);

  let frustrationReasons = Array.isArray(body.frustrationReasons) ? body.frustrationReasons.slice(0, 3).map((x) => str(x, 80)) : [];

  const APPS_SCRIPT_URL = process.env.AI_AUDIT_APPS_SCRIPT_URL;
  const SHARED_SECRET = process.env.AI_AUDIT_SHARED_SECRET;
  if (!APPS_SCRIPT_URL || !SHARED_SECRET) {
    // Do not leak which variable is missing.
    return res.status(503).json({ ok: false, error: "Lead storage is not configured" });
  }

  const payload = {
    schemaVersion: SCHEMA_VERSION,
    sharedSecret: SHARED_SECRET,
    firstName,
    email,
    whatsapp: str(body.whatsapp, 40).trim(),
    jobTitle: str(body.jobTitle, 100).trim(),
    workType: str(body.workType, 80),
    workTypeOther: str(body.workTypeOther, 120),
    taskCategory,
    taskCategoryLabel: str(body.taskCategoryLabel, 120),
    taskDescription: taskDescriptionValue,
    taskFrequencyLabel: str(body.taskFrequencyLabel, 60),
    monthlyFrequency,
    timePerOccurrenceLabel: str(body.timePerOccurrenceLabel, 60),
    timePerOccurrenceHours,
    frustrationReasons,
    frustrationOther: str(body.frustrationOther, 120),
    aiExperienceLabel: str(body.aiExperienceLabel, 120),
    readinessLevel,
    desiredOutcome: str(body.desiredOutcome, 120),
    estimatedMonthlyHours,
    estimatedMonthlyRange,
    source: "AI Time-Waste Audit",
    submittedAt: new Date().toISOString(),
    utmSource: str(body.utmSource, 120),
    utmMedium: str(body.utmMedium, 120),
    utmCampaign: str(body.utmCampaign, 120),
    utmContent: str(body.utmContent, 120),
    utmTerm: str(body.utmTerm, 120),
    referrer: str(body.referrer, 300),
  };

  try {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 9000);
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

    if (!upstream.ok) {
      console.error("Audit upstream non-OK status:", upstream.status);
      return res.status(502).json({ ok: false, error: "Could not save your details" });
    }
    if (!data || data.success !== true) {
      console.error("Audit storage rejected:", data && data.code ? data.code : "unknown");
      return res.status(502).json({ ok: false, error: "Could not save your details" });
    }
    return res.status(200).json({ ok: true, stored: true });
  } catch (err) {
    console.error("Audit submission error:", err && err.name ? err.name : "unknown");
    return res.status(502).json({ ok: false, error: "Could not save your details" });
  }
}
