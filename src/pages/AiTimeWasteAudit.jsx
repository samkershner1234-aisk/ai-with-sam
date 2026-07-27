import { useEffect, useMemo, useReducer, useRef, useState } from "react";
import AuditHeader from "../audit/AuditHeader";
import AuditQuestions from "../audit/AuditQuestions";
import { PartialResult, FullResult, ThankYou } from "../audit/AuditResult";
import { Shell, Card, Eyebrow, PrimaryButton, SecondaryButton, T, useReducedMotion } from "../audit/ui";
import { AUDIT_PATH, SCHEMA_VERSION, computeTimeEstimate } from "../audit/auditData";

const STORAGE_KEY = "ai_time_waste_audit_v1";
const RESULT_KEY = "aiTimeWasteAuditResult";
const PROD_ORIGIN = "https://www.aiforeveryrole.com";
const CANONICAL_URL = PROD_ORIGIN + AUDIT_PATH;

// Analytics is a safe no-op: the site has no analytics provider installed.
// If window.plausible / window.gtag is added later, events flow automatically.
function track(event, props) {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.plausible === "function") window.plausible(event, { props });
    else if (typeof window.gtag === "function") window.gtag("event", event, props || {});
  } catch (e) { /* never block on analytics */ }
}

function loadSession() {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    // never restore into contact/result state; only non-contact answers
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (e) { return {}; }
}
function saveSession(answers) {
  try {
    const { firstName, email, whatsapp, jobTitle, ...safe } = answers;
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(safe));
  } catch (e) { /* ignore */ }
}
function clearSession() {
  try { sessionStorage.removeItem(STORAGE_KEY); } catch (e) {}
}

// Persist the completed result so a page refresh keeps it during the session.
function saveResult(result) {
  try { sessionStorage.setItem(RESULT_KEY, JSON.stringify(result)); } catch (e) { /* ignore */ }
}
function loadResult() {
  try {
    const raw = sessionStorage.getItem(RESULT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === "object" && parsed.taskCategory) return parsed;
    return null;
  } catch (e) { return null; }
}
function clearResult() {
  try { sessionStorage.removeItem(RESULT_KEY); } catch (e) {}
}

function getUtm() {
  try {
    const p = new URLSearchParams(window.location.search);
    const pick = (k) => { const v = p.get(k); return v ? String(v).slice(0, 120) : ""; };
    return {
      utmSource: pick("utm_source"), utmMedium: pick("utm_medium"),
      utmCampaign: pick("utm_campaign"), utmContent: pick("utm_content"), utmTerm: pick("utm_term"),
    };
  } catch (e) { return { utmSource: "", utmMedium: "", utmCampaign: "", utmContent: "", utmTerm: "" }; }
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function ContactForm({ answers, onSubmit, submitting, submitError, onRetry }) {
  const [firstName, setFirstName] = useState(answers.firstName || "");
  const [email, setEmail] = useState(answers.email || "");
  const [whatsapp, setWhatsapp] = useState(answers.whatsapp || "");
  const [jobTitle, setJobTitle] = useState(answers.jobTitle || "");
  const [company, setCompany] = useState(""); // honeypot
  const [touched, setTouched] = useState(false);
  const headingRef = useRef(null);
  useEffect(() => { if (headingRef.current) headingRef.current.focus(); }, []);

  const nameOk = firstName.trim().length > 0 && firstName.length <= 80;
  const emailOk = emailRe.test(email) && email.length <= 160;
  const valid = nameOk && emailOk;

  const field = { width: "100%", background: T.panel, border: "2px solid " + T.border, borderRadius: "12px", padding: "14px", color: T.white, fontSize: "15px", fontFamily: T.font, minHeight: "48px", boxSizing: "border-box" };
  const label = { display: "block", color: T.grey, fontSize: "14px", marginBottom: "6px", fontWeight: 600 };
  const wrap = { marginBottom: "16px" };
  const err = { color: "#FCA5A5", fontSize: "13px", marginTop: "6px" };

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) return;
    onSubmit({ firstName: firstName.trim(), email: email.trim(), whatsapp: whatsapp.trim(), jobTitle: jobTitle.trim(), company });
  };

  return (
    <form onSubmit={submit} noValidate>
      <Eyebrow>Almost there</Eyebrow>
      <h1 ref={headingRef} tabIndex={-1} style={{ outline: "none", fontSize: "26px", fontWeight: 800, color: T.white, margin: "0 0 8px" }}>See Your Personalised Next Steps</h1>
      <p style={{ color: T.grey, fontSize: "15px", lineHeight: 1.6, marginBottom: "22px" }}>Enter your details to view your complete breakdown.</p>
      <Card>
        <div style={wrap}>
          <label style={label} htmlFor="firstName">First name</label>
          <input id="firstName" style={field} value={firstName} maxLength={80} autoComplete="given-name" onChange={(e) => setFirstName(e.target.value)} />
          {touched && !nameOk && <div style={err}>Please enter your first name.</div>}
        </div>
        <div style={wrap}>
          <label style={label} htmlFor="email">Email address</label>
          <input id="email" type="email" style={field} value={email} maxLength={160} autoComplete="email" inputMode="email" onChange={(e) => setEmail(e.target.value)} />
          {touched && !emailOk && <div style={err}>Please enter a valid email address.</div>}
        </div>
        <div style={wrap}>
          <label style={label} htmlFor="whatsapp">WhatsApp number <span style={{ color: T.greyDim, fontWeight: 400 }}>(optional)</span></label>
          <input id="whatsapp" style={field} value={whatsapp} maxLength={40} autoComplete="tel" inputMode="tel" onChange={(e) => setWhatsapp(e.target.value)} />
        </div>
        <div style={{ marginBottom: "4px" }}>
          <label style={label} htmlFor="jobTitle">Job title <span style={{ color: T.greyDim, fontWeight: 400 }}>(optional)</span></label>
          <input id="jobTitle" style={field} value={jobTitle} maxLength={100} autoComplete="organization-title" onChange={(e) => setJobTitle(e.target.value)} />
        </div>
        {/* honeypot: visually hidden, not for humans */}
        <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
          <label htmlFor="company">Company</label>
          <input id="company" tabIndex={-1} autoComplete="off" value={company} onChange={(e) => setCompany(e.target.value)} />
        </div>
      </Card>
      <p style={{ color: T.greyDim, fontSize: "13px", lineHeight: 1.6, margin: "14px 0" }}>
        Your details are used to provide your audit result and relevant practical AI guidance. They will not be sold or shared.
      </p>
      {submitError && (
        <div style={{ background: "rgba(252,165,165,0.08)", border: "1px solid #7F1D1D", borderRadius: "12px", padding: "14px", marginBottom: "14px" }}>
          <div style={{ color: "#FCA5A5", fontSize: "14px", marginBottom: "10px" }} aria-live="assertive">
            We could not save your details, but your audit result is available below.
          </div>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <SecondaryButton onClick={onRetry} style={{ flex: "1 1 auto" }}>Try saving again</SecondaryButton>
            <div style={{ flex: "1 1 auto" }}><PrimaryButton onClick={onRetry} type="button">View my result</PrimaryButton></div>
          </div>
        </div>
      )}
      <PrimaryButton type="submit" disabled={submitting}>{submitting ? "Saving..." : "Show My Personalised Next Steps"}</PrimaryButton>
    </form>
  );
}

function Analysing({ reduced, onDone }) {
  const msgs = ["Analysing your task...", "Identifying your strongest AI opportunity...", "Preparing your next step..."];
  const [i, setI] = useState(0);
  useEffect(() => {
    if (reduced) { const t = setTimeout(onDone, 250); return () => clearTimeout(t); }
    const step = setInterval(() => setI((v) => Math.min(v + 1, msgs.length - 1)), 450);
    const done = setTimeout(onDone, 1350);
    return () => { clearInterval(step); clearTimeout(done); };
  }, [reduced]);
  return (
    <div style={{ textAlign: "center", paddingTop: "80px" }} aria-live="polite">
      <div style={{ width: "40px", height: "40px", border: "3px solid " + T.border, borderTopColor: T.orange, borderRadius: "50%", margin: "0 auto 20px", animation: reduced ? "none" : "auditspin 0.8s linear infinite" }} />
      <div style={{ color: T.white, fontSize: "17px", fontWeight: 600 }}>{msgs[i]}</div>
      <style>{"@keyframes auditspin{to{transform:rotate(360deg)}}"}</style>
    </div>
  );
}

export default function AiTimeWasteAudit() {
  const reduced = useReducedMotion();
  const savedResult = loadResult();
  const [phase, setPhase] = useState(savedResult ? "result" : "intro"); // intro | questions | partial | contact | analysing | result
  const [answers, setAnswers] = useState(() => (savedResult ? { ...loadSession(), ...savedResult } : loadSession()));
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const submittedOnce = useRef(false);

  useEffect(() => {
    document.title = "Free AI Time-Waste Audit | AI With Sam";
    track("audit_viewed");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);

  useEffect(() => { saveSession(answers); }, [answers]);

  const withComputed = (a) => {
    const est = computeTimeEstimate(a.weeklyOccurrences, a.monthlyOccurrences, a.timePerOccurrenceMinutes);
    return { ...a, ...est };
  };

  const startAudit = () => { track("audit_started"); setAnswers((p) => ({ ...p, __step: 1 })); setPhase("questions"); };
  const completeQuestions = () => {
    setAnswers((p) => withComputed(p));
    track("audit_partial_result_viewed", { taskCategory: answers.taskCategory });
    setPhase("partial");
    window.scrollTo({ top: 0, behavior: "auto" });
  };
  const goContact = () => { track("audit_contact_viewed"); setPhase("contact"); window.scrollTo({ top: 0, behavior: "auto" }); };

  const doSubmit = async (contact) => {
    if (contact.company) { return; } // honeypot triggered: silently ignore
    if (submitting) return;
    const merged = withComputed({ ...answers, firstName: contact.firstName, email: contact.email, whatsapp: contact.whatsapp, jobTitle: contact.jobTitle });
    setAnswers(merged);
    setSubmitting(true);
    setSubmitError(false);
    const utm = getUtm();
    const payload = {
      schemaVersion: SCHEMA_VERSION,
      firstName: contact.firstName, email: contact.email, whatsapp: contact.whatsapp, jobTitle: contact.jobTitle,
      taskCategory: merged.taskCategory || "", taskCategoryLabel: merged.taskCategoryLabel || "",
      taskDescription: merged.taskDescription || "",
      taskFrequencyLabel: merged.taskFrequencyLabel || "", weeklyOccurrences: merged.weeklyOccurrences, monthlyOccurrences: merged.monthlyOccurrences,
      timePerOccurrenceLabel: merged.timePerOccurrenceLabel || "", timePerOccurrenceMinutes: merged.timePerOccurrenceMinutes,
      aiExperienceLabel: merged.aiExperienceLabel || "", readinessLevel: merged.readinessLevel || "",
      estimatedWeeklyHours: merged.estimatedWeeklyHours, estimatedMonthlyHours: merged.estimatedMonthlyHours,
      estimatedWeeklyDisplay: merged.estimatedWeeklyDisplay, estimatedMonthlyDisplay: merged.estimatedMonthlyDisplay,
      company: contact.company || "",
      ...utm,
      referrer: (typeof document !== "undefined" && document.referrer ? document.referrer.slice(0, 300) : ""),
    };
    let ok = false;
    let serverResult = null;
    try {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 12000);
      const res = await fetch("/api/ai-time-waste-audit", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload), signal: ctrl.signal,
      });
      clearTimeout(timer);
      const data = await res.json().catch(() => ({}));
      ok = res.ok && data && data.success === true;
      if (ok && data.result && typeof data.result === "object") serverResult = data.result;
    } catch (e) { ok = false; }
    setSubmitting(false);
    if (ok) {
      submittedOnce.current = true;
      // Server values are authoritative; fall back to the client estimate if absent.
      const resultState = {
        firstName: contact.firstName,
        taskCategory: serverResult && serverResult.taskCategory ? serverResult.taskCategory : merged.taskCategory,
        taskCategoryLabel: serverResult && serverResult.taskCategoryLabel ? serverResult.taskCategoryLabel : (merged.taskCategoryLabel || ""),
        taskDescription: serverResult && typeof serverResult.taskDescription === "string" ? serverResult.taskDescription : (merged.taskDescription || ""),
        readinessLevel: serverResult && serverResult.readinessLevel ? serverResult.readinessLevel : merged.readinessLevel,
        estimatedWeeklyHours: serverResult && serverResult.estimatedWeeklyHours != null ? serverResult.estimatedWeeklyHours : merged.estimatedWeeklyHours,
        estimatedMonthlyHours: serverResult && serverResult.estimatedMonthlyHours != null ? serverResult.estimatedMonthlyHours : merged.estimatedMonthlyHours,
        estimatedWeeklyDisplay: serverResult && serverResult.estimatedWeeklyDisplay ? serverResult.estimatedWeeklyDisplay : merged.estimatedWeeklyDisplay,
        estimatedMonthlyDisplay: serverResult && serverResult.estimatedMonthlyDisplay ? serverResult.estimatedMonthlyDisplay : merged.estimatedMonthlyDisplay,
      };
      setAnswers((p) => ({ ...p, ...resultState }));
      saveResult(resultState); // persist synchronously before navigation
      track("audit_submitted", { taskCategory: resultState.taskCategory, readinessLevel: resultState.readinessLevel });
      setPhase("analysing");
    } else {
      track("audit_submission_failed");
      setSubmitError(true);
    }
  };

  const forceViewResult = () => { setSubmitError(false); setPhase("analysing"); };

  const onAnalysingDone = () => { track("audit_result_viewed", { taskCategory: answers.taskCategory }); setPhase("result"); window.scrollTo({ top: 0, behavior: "auto" }); };

  const retake = () => {
    if (!window.confirm("Retake the audit? This will clear your current result.")) return;
    clearSession();
    clearResult();
    track("audit_retake_clicked");
    setAnswers({});
    setSubmitError(false);
    setPhase("intro");
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  // guard invalid direct access to result-ish phases
  useEffect(() => {
    if ((phase === "partial" || phase === "contact" || phase === "analysing" || phase === "result") && !answers.taskCategory) {
      setPhase("intro");
    }
  }, [phase, answers.taskCategory]);

  return (
    <>
      <AuditHeader />
      <Shell>
        {phase === "intro" && (
          <div>
            <Eyebrow>Free 60-Second AI Audit</Eyebrow>
            <h1 style={{ fontSize: "32px", fontWeight: 800, color: T.white, margin: "0 0 14px", lineHeight: 1.2 }}>
              Which Part of Your Job Should You Use AI For First?
            </h1>
            <p style={{ color: T.grey, fontSize: "16px", lineHeight: 1.7, marginBottom: "22px" }}>
              Answer four quick questions and discover where AI may help you reduce unnecessary repetitive work.
            </p>
            <PrimaryButton onClick={startAudit}>Find My Best AI Opportunity</PrimaryButton>
            <p style={{ color: T.greyDim, fontSize: "13px", marginTop: "14px", textAlign: "center" }}>Takes about 60 seconds. No complicated AI questions.</p>
            <p style={{ color: T.greyDim, fontSize: "13px", marginTop: "4px", textAlign: "center" }}>Built for professionals in every role and industry.</p>
          </div>
        )}

        {phase === "questions" && (
          <AuditQuestions answers={answers} setAnswers={setAnswers} onComplete={completeQuestions} onBackToIntro={() => setPhase("intro")} />
        )}

        {phase === "partial" && (<PartialResult answers={answers} onContinue={goContact} />)}

        {phase === "contact" && (
          <ContactForm answers={answers} onSubmit={doSubmit} submitting={submitting} submitError={submitError} onRetry={submitError ? forceViewResult : undefined} />
        )}

        {phase === "analysing" && (<Analysing reduced={reduced} onDone={onAnalysingDone} />)}

        {phase === "result" && (
          <ThankYou answers={answers} onRetake={retake} />
        )}
      </Shell>
    </>
  );
}
