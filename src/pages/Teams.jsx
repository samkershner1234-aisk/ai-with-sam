import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { T } from "../audit/ui";
import {
  TEAM_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  PARTICIPANT_OPTIONS,
  buildTeamBookingUrl,
} from "../teams/teamsBooking";
import { SAM_PHOTO, WHATSAPP_URL } from "../components/landing/constants";
import Navbar from "../components/landing/Navbar";

const PROD_ORIGIN = "https://www.aiforeveryrole.com";
const TEAMS_PATH = "/teams";
const CANONICAL_URL = PROD_ORIGIN + TEAMS_PATH;
const PRICE = "5,000₪ / $1,500 / £1,250";

function track(event, props) {
  try {
    if (typeof window === "undefined") return;
    if (typeof window.plausible === "function") window.plausible(event, { props });
    else if (typeof window.gtag === "function") window.gtag("event", event, props || {});
  } catch (e) { /* never block on analytics */ }
}

function upsertNamedMeta(name, content) {
  try {
    let el = document.head.querySelector('meta[name="' + name + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("name", name); document.head.appendChild(el); }
    el.setAttribute("content", content);
  } catch (e) { /* ignore */ }
}

function upsertPropertyMeta(prop, content) {
  try {
    let el = document.head.querySelector('meta[property="' + prop + '"]');
    if (!el) { el = document.createElement("meta"); el.setAttribute("property", prop); document.head.appendChild(el); }
    el.setAttribute("content", content);
  } catch (e) { /* ignore */ }
}

function upsertCanonical(href) {
  try {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) { el = document.createElement("link"); el.setAttribute("rel", "canonical"); document.head.appendChild(el); }
    el.setAttribute("href", href);
  } catch (e) { /* ignore */ }
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function scrollToId(id) {
  const el = document.getElementById(id);
  if (el && el.scrollIntoView) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

function goToQualify(source) {
  track("teams_primary_cta_click", { source: source || "unknown" });
  scrollToId("qualify");
}

/* ----- Shared layout primitives ----- */
function Section({ id, bg, children, style }) {
  return (
    <section id={id} style={{ background: bg || T.navy, padding: "clamp(40px,7vw,88px) 20px", ...style }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{ color: T.orange, fontWeight: 800, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>
      {children}
    </div>
  );
}

function H2({ children, style }) {
  return (
    <h2 style={{ color: T.white, fontWeight: 900, fontSize: "clamp(26px,4.5vw,40px)", lineHeight: 1.15, margin: "0 0 14px", letterSpacing: "-0.5px", ...style }}>
      {children}
    </h2>
  );
}

function Lead({ children }) {
  return (
    <p style={{ color: T.grey, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, margin: "0 0 8px", maxWidth: 640 }}>{children}</p>
  );
}

function Panel({ children, style }) {
  return (
    <div style={{ background: T.card, border: "1.5px solid " + T.border, borderRadius: 16, padding: "22px 20px", ...style }}>{children}</div>
  );
}

function TickList({ items, positive }) {
  const mark = positive ? "✓" : "·";
  const color = positive ? T.orange : T.greyDim;
  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: "10px" }}>
      {items.map((it, i) => (
        <li key={i} style={{ display: "flex", gap: "10px", alignItems: "flex-start", color: T.grey, fontSize: "15px", lineHeight: 1.5 }}>
          <span aria-hidden="true" style={{ color, fontWeight: 800, flex: "0 0 auto" }}>{mark}</span>
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

function PriceBlock({ small }) {
  return (
    <div style={{ fontWeight: 900, color: T.white, fontSize: small ? "clamp(20px,3vw,24px)" : "clamp(24px,4vw,32px)", letterSpacing: "-0.5px" }}>
      {PRICE}
    </div>
  );
}

function PrimaryButton({ children, onClick, full }) {
  return (
    <button type="button" onClick={onClick} style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      background: T.orange, color: "#0B1220", fontWeight: 800, fontSize: "16px",
      border: "none", borderRadius: 12, padding: "14px 26px", cursor: "pointer",
      width: full ? "100%" : "auto", boxShadow: "0 8px 24px rgba(249,115,22,0.28)", fontFamily: T.font,
    }}>{children}</button>
  );
}

function SecondaryLink({ children, onClick }) {
  return (
    <button type="button" onClick={onClick} style={{
      background: "none", border: "none", color: T.greyDim, fontSize: "15px", fontWeight: 600,
      textDecoration: "underline", textUnderlineOffset: "3px", cursor: "pointer", padding: "6px 2px", fontFamily: T.font,
    }}>{children}</button>
  );
}

function Rail({ children, cols, label }) {
  return (
    <div className="rail" role="group" aria-label={label} tabIndex={0} style={{ ["--cols"]: cols || 3 }}>
      {children}
    </div>
  );
}

function RailCard({ children }) {
  return <div className="rail-card">{children}</div>;
}
/* ----- Content data (zero authored dashes) ----- */
const WHAT_YOU_GET = [
  { title: "One to One Session", body: "Each employee gets a personalised 60 minute session built around a real recurring task from their role.", tags: ["Real tasks", "Practical workflows"] },
  { title: "Prompt Kit and Resources", body: "A personalised Prompt Kit, session resources and 30 days of WhatsApp implementation support.", tags: [] },
  { title: "A Workflow They Can Use", body: "Employees leave with a practical AI workflow built around how they already work, ready to put into practice.", tags: [] },
];

const FULL_INCLUSIONS = [
  "Five personalised 60 minute one to one sessions",
  "Sessions built around each employee’s real recurring work",
  "A personalised Prompt Kit for every participant",
  "Session resources and saved outputs",
  "30 days of WhatsApp implementation support per participant",
  "A short before and after view where a task can be measured",
  "A simple summary for the employer after the pilot",
  "One time 30 day pilot with no long term contract",
];

const HOW_STEPS = [
  { n: "1", title: "Understand", body: "A short manager kickoff to find where the team loses time and which workflows are worth improving." },
  { n: "2", title: "Implement", body: "Each participating employee gets personalised one to one help building AI around a real recurring task from their role." },
  { n: "3", title: "Apply", body: "Employees use the workflow during the pilot, with the support already included and refinement where it is needed." },
  { n: "4", title: "Measure", body: "We review what was built, what people actually used and what may be worth expanding." },
];

const USE_CASES = [
  { title: "Marketing", body: "Research, briefs, campaign drafts and reporting." },
  { title: "Sales", body: "Prospect research, meeting preparation and follow-up." },
  { title: "Partnerships", body: "Partner research, personalised outreach and relationship follow-up." },
  { title: "Managers", body: "Meeting preparation, summaries, actions and recurring updates." },
  { title: "Operations", body: "Reporting, admin and recurring information handoffs." },
  { title: "Recruitment / People", body: "Candidate research, interview preparation and structured notes." },
];

const RESULTS_SUMMARY = [
  "The workflows created across the team",
  "What each employee used AI for",
  "Where AI created the most value",
  "What worked and what did not",
  "Opportunities worth expanding across the team",
];

const STRONG_FIT = ["Employees do knowledge work", "Repetitive tasks consume time", "AI use is allowed", "Leadership wants practical implementation"];
const NOT_FIT = ["You only want a keynote", "Employees cannot use AI", "You require guaranteed financial ROI", "You want a full company rollout before testing"];

const FAQS = [
  { q: "Do employees need previous AI experience?", a: "No. If they can use everyday work software, they can take part." },
  { q: "Which AI tools do you work with?", a: "We work within the tools your company already approves, so nothing conflicts with your guidelines." },
  { q: "How much employee time does the pilot require?", a: "Each employee joins one focused session, plus light follow up during the 30 days." },
  { q: "Can you work with remote teams?", a: "Yes. Sessions run online, so employees can join from wherever they work." },
  { q: "How do you handle sensitive company information?", a: "We build inside the tools you already approve and follow your company guidelines. Nothing needs to move outside them." },
  { q: "What happens after the 30 days?", a: "You get the Pilot Results Summary. You then decide whether a wider rollout makes sense, using the real results." },
  { q: "Can we expand beyond five employees?", a: "Yes, once the pilot shows what works. The pilot itself stays focused on five." },
];
/* Accessible accordion (details/summary based) */
function Accordion({ summary, children, defaultOpen }) {
  return (
    <details className="acc" open={!!defaultOpen}>
      <summary style={{ cursor: "pointer", listStyle: "none", color: T.white, fontWeight: 700, fontSize: "16px", padding: "16px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", gap: "12px" }}>
        <span>{summary}</span>
        <span aria-hidden="true" className="acc-plus" style={{ color: T.orange, fontWeight: 800, fontSize: "20px", flex: "0 0 auto" }}>+</span>
      </summary>
      <div style={{ padding: "0 18px 18px", color: T.grey, fontSize: "15px", lineHeight: 1.6 }}>{children}</div>
    </details>
  );
}
/* ----- 1. Compact Hero ----- */
function Hero() {
  return (
    <section id="top" style={{ background: T.navy, padding: "clamp(28px,6vw,64px) 20px clamp(32px,6vw,56px)" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center" }}><Eyebrow>AI For Teams</Eyebrow></div>
        <h1 style={{ color: T.white, fontWeight: 900, fontSize: "clamp(38px,9vw,46px)", lineHeight: 1.1, letterSpacing: "-1px", margin: "0 0 16px" }}>
          Make AI Useful Across Your Team.
        </h1>
        <p style={{ color: T.grey, fontSize: "clamp(18px,2.4vw,20px)", lineHeight: 1.5, margin: "0 auto 18px", maxWidth: 560 }}>
          Start with a 30-day implementation pilot for 5 employees. We identify useful workflows, build them around each person's actual work, support adoption and measure what gets used.
        </p>
        <div style={{ color: T.greyDim, fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>5 Employees · 30 Days · No Long-Term Commitment</div>
        <div style={{ marginBottom: "22px" }}><PriceBlock /></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <PrimaryButton onClick={() => goToQualify("hero")}>Discuss a 30-Day Pilot</PrimaryButton>
          <SecondaryLink onClick={() => scrollToId("how")}>See How the Pilot Works ↓</SecondaryLink>
        </div>
      </div>
    </section>
  );
}

/* ----- 2. The Problem ----- */
function BuiltAroundRealWork() {
  return (
    <Section id="problem" bg={T.panel}>
      <div style={{ maxWidth: 720 }}>
        <Eyebrow>The Problem</Eyebrow>
        <H2>Your Team Has AI Tools. That Doesn't Mean the Work Has Changed.</H2>
        <Lead>Employees are experimenting with ChatGPT, Claude, Copilot and other tools, but generic training rarely shows each person how AI fits into their actual role.</Lead>
        <Lead>The pilot focuses on real recurring work and turns useful opportunities into workflows employees can actually use.</Lead>
      </div>
    </Section>
  );
}

/* ----- 3. What AI Could Look Like Across the Team ----- */
function UseCases() {
  return (
    <Section id="usecases" bg={T.navy}>
      <Eyebrow>Across the Team</Eyebrow>
      <H2>What AI Could Look Like Across Your Team</H2>
      <Lead>These are illustrative examples. Not every workflow can necessarily be automated.</Lead>
      <div style={{ height: 8 }} />
      <Rail cols={3} label="What AI could look like across the team">
        {USE_CASES.map((c, i) => (
          <RailCard key={i}>
            <div style={{ color: T.white, fontWeight: 800, fontSize: "16px", marginBottom: "8px" }}>{c.title}</div>
            <div style={{ color: T.grey, fontSize: "14px", lineHeight: 1.5 }}>{c.body}</div>
          </RailCard>
        ))}
      </Rail>
    </Section>
  );
}

/* ----- 4. How the 30-Day Pilot Works ----- */
function HowItWorks() {
  return (
    <Section id="how" bg={T.panel}>
      <Eyebrow>How It Works</Eyebrow>
      <H2>How the 30-Day Pilot Works</H2>
      <Rail cols={4} label="How the 30 day pilot works">
        {HOW_STEPS.map((s, i) => (
          <RailCard key={i}>
            <div style={{ width: 36, height: 36, borderRadius: 999, background: T.orange, color: "#0B1220", fontWeight: 900, fontSize: "17px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>{s.n}</div>
            <div style={{ color: T.white, fontWeight: 800, fontSize: "16px", marginBottom: "8px" }}>{s.title}</div>
            <div style={{ color: T.grey, fontSize: "14px", lineHeight: 1.5 }}>{s.body}</div>
          </RailCard>
        ))}
      </Rail>
    </Section>
  );
}

/* ----- 5. What Each Employee Gets ----- */
function WhatYouGet() {
  return (
    <Section id="pilot" bg={T.navy}>
      <Eyebrow>The Pilot</Eyebrow>
      <H2>What Each Employee Gets</H2>
      <Rail cols={3} label="What each employee gets">
        {WHAT_YOU_GET.map((c, i) => (
          <RailCard key={i}>
            <div style={{ color: T.white, fontWeight: 800, fontSize: "18px", marginBottom: "10px" }}>{c.title}</div>
            <div style={{ color: T.grey, fontSize: "15px", lineHeight: 1.55, marginBottom: c.tags.length ? "14px" : 0 }}>{c.body}</div>
            {c.tags.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                {c.tags.map((t2, j) => (
                  <span key={j} style={{ background: T.panel, color: T.greyDim, fontSize: "12px", fontWeight: 700, borderRadius: 999, padding: "6px 12px" }}>{t2}</span>
                ))}
              </div>
            )}
          </RailCard>
        ))}
      </Rail>
    </Section>
  );
}
/* ----- 6. What You Get as the Team Lead ----- */
function ManagerGets() {
  return (
    <Section id="manager" bg={T.panel}>
      <div style={{ maxWidth: 640 }}>
        <Eyebrow>For the Team Lead</Eyebrow>
        <H2>What You Get as the Team Lead</H2>
        <Lead>Beyond the employee sessions, you receive a clear view of what was built and what may be worth doing next.</Lead>
      </div>
      <div style={{ maxWidth: 640, margin: "22px 0 0" }}>
        <Panel style={{ background: T.card }}>
          <div style={{ color: T.white, fontWeight: 800, fontSize: "16px", marginBottom: "14px" }}>AI Pilot Results Summary</div>
          <TickList items={RESULTS_SUMMARY} positive />
        </Panel>
        <div style={{ color: T.greyDim, fontSize: "13px", marginTop: "12px" }}>Example of what could be measured. We do not guarantee a specific amount of time saved or financial return.</div>
      </div>
    </Section>
  );
}

/* ----- 7. Pricing ----- */
function PricingSection() {
  return (
    <Section id="pricing" bg={T.navy}>
      <div style={{ textAlign: "center" }}>
        <Eyebrow>Pricing</Eyebrow>
        <H2 style={{ margin: "0 auto 14px" }}>Simple, Transparent Pricing</H2>
        <div style={{ color: T.greyDim, fontSize: "14px", fontWeight: 600, marginBottom: "18px" }}>One time 30 day pilot for 5 employees · no long term contract</div>
        <div style={{ marginBottom: "24px" }}><PriceBlock /></div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <PrimaryButton onClick={() => goToQualify("pricing")}>Discuss a 30-Day Pilot</PrimaryButton>
        </div>
      </div>
      <div style={{ maxWidth: 640, margin: "32px auto 0" }}>
        <div style={{ border: "1.5px solid " + T.border, borderRadius: 14, overflow: "hidden", background: T.card }}>
          <Accordion summary="See everything included">
            <TickList items={FULL_INCLUSIONS} positive />
          </Accordion>
        </div>
      </div>
    </Section>
  );
}

/* ----- 8. Responsible AI / Trust ----- */
function ResponsibleAI() {
  return (
    <Section id="trust" bg={T.panel}>
      <div style={{ maxWidth: 720 }}>
        <Eyebrow>Responsible AI</Eyebrow>
        <H2>Built for Real Work. With Human Review.</H2>
        <Lead>Every workflow respects the AI tools and platforms your company already allows. We discuss what information should and should not be shared, where human review remains important, and how employees can use AI responsibly in day to day work.</Lead>
        <div style={{ color: T.greyDim, fontSize: "13px", lineHeight: 1.6, marginTop: "12px" }}>Company policies and legal, compliance, IT and security requirements always take precedence. This pilot does not provide legal, compliance or cybersecurity advice.</div>
      </div>
    </Section>
  );
}
/* ----- 9. Fit / Commitment ----- */
function FitSection() {
  return (
    <Section id="fit" bg={T.navy}>
      <Eyebrow>Fit</Eyebrow>
      <H2>Is This Right for Your Team?</H2>
      <Rail cols={2} label="Team fit">
        <RailCard>
          <div style={{ color: T.orange, fontWeight: 800, fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>Strong Fit</div>
          <TickList items={STRONG_FIT} positive />
        </RailCard>
        <RailCard>
          <div style={{ color: T.greyDim, fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>Probably Not a Fit</div>
          <TickList items={NOT_FIT} />
        </RailCard>
      </Rail>
      <div style={{ display: "grid", gap: "12px", maxWidth: 640, margin: "24px auto 0" }}>
        <div style={{ border: "1.5px solid " + T.border, borderRadius: 14, overflow: "hidden", background: T.card }}>
          <Accordion summary="Our Commitment">
            <p style={{ margin: "0 0 10px" }}>Each session focuses on an agreed real task. If the agreed workflow is not working by the end of the session, we provide reasonable follow up help during the included 30 day WhatsApp implementation support period.</p>
            <p style={{ margin: 0, color: T.greyDim }}>We do not guarantee a specific amount of time saved or financial return.</p>
          </Accordion>
        </div>
      </div>
    </Section>
  );
}

/* ----- FAQ ----- */
function FAQ() {
  return (
    <Section id="faq" bg={T.panel}>
      <Eyebrow>FAQ</Eyebrow>
      <H2>Common Questions</H2>
      <div style={{ maxWidth: 720, margin: "20px auto 0", display: "grid", gap: "12px" }}>
        {FAQS.map((f, i) => (
          <div key={i} style={{ border: "1.5px solid " + T.border, borderRadius: 14, overflow: "hidden", background: T.card }}>
            <Accordion summary={f.q}>{f.a}</Accordion>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ----- Final CTA ----- */
function FinalCTA() {
  return (
    <Section id="final" bg={T.navy}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <H2 style={{ marginBottom: "12px" }}>Start With Five People</H2>
        <p style={{ color: T.grey, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, margin: "0 0 18px" }}>
          Test the approach with a small group, measure what happens and decide what comes next.
        </p>
        <div style={{ marginBottom: "20px" }}><PriceBlock /></div>
        <PrimaryButton onClick={() => goToQualify("final")}>Discuss a 30-Day Pilot</PrimaryButton>
      </div>
    </Section>
  );
}
/* ----- Qualification Form (two step) ----- */
function QualificationForm() {
  const [step, setStep] = useState(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [companySize, setCompanySize] = useState("");
  const [participantCount, setParticipantCount] = useState("");
  const [teams, setTeams] = useState([]);
  const [mainGoal, setMainGoal] = useState("");
  const [website, setWebsite] = useState("");
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [redirectError, setRedirectError] = useState(false);
  const startedRef = useRef(false);

  const nameOk = name.trim().length > 0 && name.length <= 80;
  const emailOk = emailRe.test(email.trim()) && email.length <= 160;
  const companyOk = company.trim().length > 0 && company.length <= 120;
  const sizeOk = COMPANY_SIZE_OPTIONS.includes(companySize);
  const countOk = PARTICIPANT_OPTIONS.includes(participantCount);
  const teamsOk = teams.length > 0;
  const goalOk = mainGoal.trim().length > 0 && mainGoal.length <= 800;
  const step1Ok = nameOk && emailOk && companyOk;
  const valid = step1Ok && sizeOk && countOk && teamsOk && goalOk;

  const markStarted = () => {
    if (!startedRef.current) { startedRef.current = true; track("teams_form_start"); }
  };

  const toggleTeam = (index) => {
    markStarted();
    setTeams((prev) => (prev.includes(index) ? prev.filter((n) => n !== index) : [...prev, index]));
  };

  const field = { width: "100%", background: T.panel, border: "2px solid " + T.border, borderRadius: "12px", padding: "14px", color: T.white, fontSize: "15px", fontFamily: T.font, minHeight: "50px", boxSizing: "border-box" };
  const labelStyle = { display: "block", color: T.grey, fontSize: "14px", marginBottom: "6px", fontWeight: 600 };
  const wrapS = { marginBottom: "18px" };
  const errStyle = { color: "#FCA5A5", fontSize: "13px", marginTop: "6px" };

  const goStep2 = () => {
    markStarted();
    setTouched(true);
    if (!step1Ok) {
      const firstErr = document.querySelector('[data-invalid="true"]');
      if (firstErr && firstErr.focus) firstErr.focus();
      return;
    }
    setTouched(false);
    setStep(2);
    scrollToId("qualify");
  };
  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    setRedirectError(false);
    if (!valid) {
      if (!step1Ok) { setStep(1); }
      const firstErr = document.querySelector('[data-invalid="true"]');
      if (firstErr && firstErr.focus) firstErr.focus();
      return;
    }
    if (website) return;
    setSubmitting(true);
    track("teams_form_complete");
    const url = buildTeamBookingUrl({
      name: name.trim(),
      email: email.trim(),
      company: company.trim(),
      companySize,
      participantCount,
      teamIndexes: teams,
      mainGoal: mainGoal.trim(),
    });
    track("teams_booking_opened");
    // Capture the questionnaire answers in the existing Notion CRM (same backend as the
    // Free Audit) before continuing. Fire-and-forget: a CRM hiccup must never block
    // a qualified prospect from reaching the existing Team Calendly booking page.
    try {
      const teamsLabel = TEAM_OPTIONS.filter((opt) => teams.includes(opt.index)).map((opt) => opt.label).join(", ");
      fetch("/api/teams-questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          company: company.trim(),
          companySize,
          participantCount,
          teamsLabel,
          mainGoal: mainGoal.trim(),
          pageSource: "/teams",
          website,
        }),
        keepalive: true,
      }).catch(() => { /* never block booking on a CRM error */ });
    } catch (crmErr) { /* never block booking on a CRM error */ }
    try {
      window.location.assign(url);
    } catch (err) {
      setSubmitting(false);
      setRedirectError(true);
    }
  };
  return (
    <Section id="qualify" bg={T.navy}>
      <div style={{ maxWidth: 620, margin: "0 auto" }}>
        <Eyebrow>Tell Me About Your Team</Eyebrow>
        <H2>See If a Small Pilot Makes Sense</H2>
        <div style={{ color: T.greyDim, fontSize: "13px", fontWeight: 700, letterSpacing: "0.5px", margin: "0 0 20px" }}>
          {step === 1 ? "1 of 2" : "2 of 2"}
        </div>
        <form onSubmit={submit} noValidate style={{ background: T.card, border: "1.5px solid " + T.border, borderRadius: 18, padding: "clamp(20px,4vw,32px)" }}>
          {step === 1 && (
            <div>
              <div style={{ color: T.white, fontWeight: 800, fontSize: "18px", marginBottom: "18px" }}>About You</div>
              <div style={wrapS}>
                <label style={labelStyle} htmlFor="tf-name">Your name</label>
                <input id="tf-name" type="text" value={name} maxLength={80} onFocus={markStarted}
                  onChange={(e) => setName(e.target.value)} data-invalid={touched && !nameOk ? "true" : "false"}
                  style={{ ...field, borderColor: touched && !nameOk ? "#7F1D1D" : T.border }} />
                {touched && !nameOk && <div id="tf-name-err" style={errStyle}>Please enter your name.</div>}
              </div>
              <div style={wrapS}>
                <label style={labelStyle} htmlFor="tf-email">Work email</label>
                <input id="tf-email" type="email" value={email} maxLength={160} onFocus={markStarted}
                  onChange={(e) => setEmail(e.target.value)} data-invalid={touched && !emailOk ? "true" : "false"}
                  style={{ ...field, borderColor: touched && !emailOk ? "#7F1D1D" : T.border }} />
                {touched && !emailOk && <div id="tf-email-err" style={errStyle}>Please enter a valid work email.</div>}
              </div>
              <div style={wrapS}>
                <label style={labelStyle} htmlFor="tf-company">Company name</label>
                <input id="tf-company" type="text" value={company} maxLength={120} onFocus={markStarted}
                  onChange={(e) => setCompany(e.target.value)} data-invalid={touched && !companyOk ? "true" : "false"}
                  style={{ ...field, borderColor: touched && !companyOk ? "#7F1D1D" : T.border }} />
                {touched && !companyOk && <div id="tf-company-err" style={errStyle}>Please enter your company name.</div>}
              </div>
              <input type="text" id="tf-website" value={website} onChange={(e) => setWebsite(e.target.value)}
                tabIndex={-1} autoComplete="off" aria-hidden="true"
                style={{ position: "absolute", left: "-9999px", width: 1, height: 1, opacity: 0 }} />
              <button type="button" onClick={goStep2} style={{
                width: "100%", background: T.orange, color: "#0B1220", fontWeight: 800, fontSize: "16px",
                border: "none", borderRadius: 12, padding: "15px", cursor: "pointer", fontFamily: T.font, marginTop: "4px",
              }}>Continue</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <div style={{ color: T.white, fontWeight: 800, fontSize: "18px", marginBottom: "18px" }}>About Your Team</div>
              <div style={wrapS}>
                <label style={labelStyle} htmlFor="tf-size">Company size</label>
                <select id="tf-size" value={companySize} onChange={(e) => setCompanySize(e.target.value)}
                  data-invalid={touched && !sizeOk ? "true" : "false"}
                  style={{ ...field, borderColor: touched && !sizeOk ? "#7F1D1D" : T.border }}>
                  <option value="">Select company size</option>
                  {COMPANY_SIZE_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
                </select>
                {touched && !sizeOk && <div id="tf-size-err" style={errStyle}>Please choose a company size.</div>}
              </div>
              <div style={wrapS}>
                <label style={labelStyle} htmlFor="tf-count">Employees initially supported</label>
                <select id="tf-count" value={participantCount} onChange={(e) => setParticipantCount(e.target.value)}
                  data-invalid={touched && !countOk ? "true" : "false"}
                  style={{ ...field, borderColor: touched && !countOk ? "#7F1D1D" : T.border }}>
                  <option value="">Select a number</option>
                  {PARTICIPANT_OPTIONS.map((o) => (<option key={o} value={o}>{o}</option>))}
                </select>
                {touched && !countOk && <div id="tf-count-err" style={errStyle}>Please choose how many employees.</div>}
              </div>
              <div style={wrapS}>
                <span style={labelStyle}>Teams being considered</span>
                <div data-invalid={touched && !teamsOk ? "true" : "false"} style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(150px,1fr))", gap: "8px" }}>
                  {TEAM_OPTIONS.map((opt) => {
                    const checked = teams.includes(opt.index);
                    return (
                      <label key={opt.index} style={{ display: "flex", alignItems: "center", gap: "8px", background: T.panel, border: "2px solid " + (checked ? T.orange : T.border), borderRadius: 10, padding: "10px 12px", cursor: "pointer", color: T.white, fontSize: "14px" }}>
                        <input type="checkbox" checked={checked} onChange={() => toggleTeam(opt.index)} style={{ accentColor: T.orange }} />
                        <span>{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
                {touched && !teamsOk && <div id="tf-teams-err" style={errStyle}>Please select at least one team.</div>}
              </div>
              <div style={wrapS}>
                <label style={labelStyle} htmlFor="tf-goal">Main AI goal</label>
                <textarea id="tf-goal" value={mainGoal} maxLength={800} rows={3} onFocus={markStarted}
                  onChange={(e) => setMainGoal(e.target.value)} data-invalid={touched && !goalOk ? "true" : "false"}
                  style={{ ...field, resize: "vertical", borderColor: touched && !goalOk ? "#7F1D1D" : T.border }} />
                {touched && !goalOk && <div id="tf-goal-err" style={errStyle}>Please share your main goal.</div>}
              </div>
              <div style={{ display: "flex", gap: "12px", marginTop: "4px" }}>
                <button type="button" onClick={() => { setStep(1); scrollToId("qualify"); }} style={{
                  flex: "0 0 auto", background: "none", color: T.grey, fontWeight: 700, fontSize: "15px",
                  border: "2px solid " + T.border, borderRadius: 12, padding: "15px 20px", cursor: "pointer", fontFamily: T.font,
                }}>Back</button>
                <button type="submit" disabled={submitting} style={{
                  flex: 1, background: T.orange, color: "#0B1220", fontWeight: 800, fontSize: "16px",
                  border: "none", borderRadius: 12, padding: "15px", cursor: submitting ? "default" : "pointer",
                  opacity: submitting ? 0.7 : 1, fontFamily: T.font,
                }}>{submitting ? "Opening booking…" : "Book My Team Call"}</button>
              </div>
              {redirectError && (
                <div style={{ ...errStyle, marginTop: "12px" }}>Something went wrong opening the booking page. Please try again.</div>
              )}
            </div>
          )}
        </form>
      </div>
    </Section>
  );
}
/* ----- Mobile sticky CTA (hides at the form) ----- */
function StickyCTA() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const qualify = document.getElementById("qualify");
    const onScroll = () => {
      const scrolled = window.scrollY > 520;
      let past = false;
      if (qualify) {
        const r = qualify.getBoundingClientRect();
        past = r.top < window.innerHeight * 0.9;
      }
      setShow(scrolled && !past);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);
  return (
    <div className="sticky-cta" aria-hidden={!show} style={{
      position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 40,
      transform: show ? "translateY(0)" : "translateY(120%)", transition: "transform 0.25s ease",
      background: "rgba(15,23,42,0.96)", borderTop: "1px solid " + T.border,
      padding: "12px 16px calc(12px + env(safe-area-inset-bottom))", backdropFilter: "blur(8px)",
    }}>
      <button type="button" onClick={() => goToQualify("sticky")} style={{
        width: "100%", background: T.orange, color: "#0B1220", fontWeight: 800, fontSize: "16px",
        border: "none", borderRadius: 12, padding: "14px", cursor: "pointer", fontFamily: T.font,
      }}>Discuss a 30-Day Pilot</button>
    </div>
  );
}

const STYLES = [
  "html { scroll-padding-top: 66px; }",
  ".rail { display: grid; gap: 16px; grid-template-columns: repeat(var(--cols), 1fr); }",
  ".rail-card { background: " + T.card + "; border: 1.5px solid " + T.border + "; border-radius: 16px; padding: 22px 20px; }",
  ".acc summary::-webkit-details-marker { display: none; }",
  ".acc[open] .acc-plus { transform: rotate(45deg); }",
  ".acc .acc-plus { transition: transform 0.2s ease; display: inline-block; }",
  ".rail:focus-visible { outline: 2px solid " + T.orange + "; outline-offset: 4px; }",
  ".sticky-cta { display: none; }",
  "@media (max-width: 760px) { .sticky-cta { display: block; } }",
  "@media (max-width: 760px) {",
  "  .rail { grid-auto-flow: row; grid-template-columns: 1fr; grid-auto-columns: auto; overflow-x: visible; }",
  "}",
  "@media (prefers-reduced-motion: reduce) {",
  "  * { scroll-behavior: auto !important; }",
  "  .sticky-cta { transition: none !important; }",
  "}",
].join("\n");
/* ----- Proof: real client results (individual clients, not team pilot) ----- */
const PROOF = [
  {
    initials: "GK",
    color: "#7C3AED",
    name: "Gideon K.",
    role: "Senior Growth Marketing Manager, Tel Aviv",
    quote: "In one session Sam built me a prompt system that now writes my first draft for every brief. I save at least 4 hours a week.",
  },
  {
    initials: "MR",
    color: "#0D9488",
    name: "Michal R.",
    role: "Marketing Manager, Tel Aviv",
    quote: "Within one hour, Sam built me a system that now handles all my client follow-ups automatically. I got back at least 5 hours in the first week alone.",
  },
];

function Testimonials() {
  return (
    <Section id="proof" bg={T.navy} style={{ paddingTop: "clamp(24px,4vw,44px)" }}>
      <div style={{ textAlign: "center", marginBottom: "24px" }}>
        <Eyebrow>Proof</Eyebrow>
        <H2 style={{ margin: "0 auto" }}>Real Work. Real Results.</H2>
      </div>
      <div className="rail" role="group" aria-label="Client results" style={{ ["--cols"]: 2, maxWidth: 900, margin: "0 auto" }}>
        {PROOF.map((p, i) => (
          <div key={i} className="rail-card" style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            <p style={{ color: T.white, fontSize: "16px", lineHeight: 1.55, margin: 0, fontWeight: 500 }}>{"“" + p.quote + "”"}</p>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "auto" }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: p.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>{p.initials}</div>
              <div>
                <div style={{ color: T.white, fontWeight: 700, fontSize: "15px" }}>{p.name}</div>
                <div style={{ color: T.greyDim, fontSize: "13px" }}>{p.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
/* ----- Who You're Working With (Teams variant, no individual CTA) ----- */
function WhoYouAreWorkingWith() {
  return (
    <Section id="about" bg={T.navy}>
      <div style={{ textAlign: "center", marginBottom: "8px" }}>
        <Eyebrow>Who You're Working With</Eyebrow>
      </div>
      <div style={{ maxWidth: 640, margin: "0 auto", background: T.panel, borderRadius: 20, padding: "clamp(24px,4vw,36px) clamp(20px,4vw,32px)", border: "1.5px solid " + T.border, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <img src={SAM_PHOTO} alt="Sam Kershner" style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover", border: "4px solid " + T.orange, display: "block", marginBottom: "14px" }} />
        <div style={{ fontWeight: 800, fontSize: "22px", color: T.white, marginBottom: "3px", textAlign: "center" }}>Sam Kershner</div>
        <div style={{ color: T.greyDim, fontSize: "14px", marginBottom: "14px", textAlign: "center" }}>AI Systems Builder, Tel Aviv</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", justifyContent: "center", marginBottom: "22px" }}>
          <a href="https://www.linkedin.com/in/sam-kershner/" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(255,255,255,0.08)", color: "#CBD5E1", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none", border: "1px solid rgba(255,255,255,0.1)" }}>💼 LinkedIn</a>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "#22C55E", color: "#fff", borderRadius: 8, padding: "8px 16px", fontSize: 13, fontWeight: 600, textDecoration: "none" }}>💬 WhatsApp</a>
        </div>
        <div style={{ width: "100%", height: 1, background: T.border, marginBottom: "20px" }} />
        <h3 style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 800, color: T.white, margin: "0 0 12px", lineHeight: 1.3, textAlign: "center" }}>I Build Job Specific AI Systems Around Your Real Work.</h3>
        <p style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7, margin: 0, textAlign: "center", maxWidth: 520 }}>I have spent 4+ years as an AI native marketer across fintech, media and gaming industries. I don't just talk about AI tools, I build with them. Every employee leaves with a practical AI workflow built around real work they already do.</p>
      </div>
    </Section>
  );
}

/* ----- Free 60 Second AI Audit (secondary fallback, after final paid CTA) ----- */
function FreeAuditTeams() {
  return (
    <Section id="free-audit" bg={T.navy}>
      <div style={{ maxWidth: 640, margin: "0 auto", background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.04))", border: "1.5px solid rgba(249,115,22,0.35)", borderRadius: 18, padding: "clamp(28px,4vw,40px) clamp(20px,4vw,36px)", textAlign: "center", boxShadow: "0 0 40px rgba(249,115,22,0.08)" }}>
        <div style={{ color: T.orange, fontWeight: 800, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "12px" }}>Free 60 Second AI Audit</div>
        <h3 style={{ color: T.white, fontWeight: 800, fontSize: "clamp(22px,3.5vw,30px)", lineHeight: 1.25, margin: "0 auto 14px", maxWidth: 480 }}>Not Ready to Discuss the Pilot?</h3>
        <p style={{ color: T.grey, fontSize: "16px", lineHeight: 1.6, margin: "0 auto 24px", maxWidth: 500 }}>Answer 4 quick questions. See where AI could save you the most time and get 3 prompts for a real task. No call. No credit card. 60 seconds.</p>
        <Link to="/ai-time-waste-audit" style={{ display: "inline-block", whiteSpace: "nowrap", background: "none", color: T.orange, fontWeight: 700, fontSize: "16px", padding: "13px 28px", borderRadius: 12, textDecoration: "none", border: "2px solid " + T.orange }}>Get My Free AI Audit</Link>
      </div>
    </Section>
  );
}
/* ----- Page ----- */
export default function Teams() {
  useEffect(() => {
    document.title = "AI Training & Implementation for Teams | AI With Sam";
    upsertNamedMeta("description", "A practical AI implementation pilot for employees. Build role-specific workflows around real work, support adoption and measure what actually gets used.");
    upsertNamedMeta("robots", "index, follow");
    upsertCanonical(CANONICAL_URL);
    upsertPropertyMeta("og:title", "AI Training & Implementation for Teams | AI With Sam");
    upsertPropertyMeta("og:description", "A practical AI implementation pilot for employees. Build role-specific workflows around real work, support adoption and measure what actually gets used.");
    upsertPropertyMeta("og:type", "website");
    upsertPropertyMeta("og:url", CANONICAL_URL);
    upsertPropertyMeta("og:image", PROD_ORIGIN + "/logo.png");
    upsertNamedMeta("twitter:card", "summary_large_image");
    upsertNamedMeta("twitter:title", "AI Training & Implementation for Teams | AI With Sam");
    upsertNamedMeta("twitter:description", "A practical AI implementation pilot for employees. Build role-specific workflows around real work, support adoption and measure what actually gets used.");
    track("teams_page_view");
  }, []);

  return (
    <div style={{ fontFamily: T.font, background: T.navy, minHeight: "100vh" }}>
      <style>{STYLES}</style>
      <Navbar variant="teams" />
      <Hero />
      {/* 2. The problem */}
      <BuiltAroundRealWork />
      {/* 3. What AI could look like across the team */}
      <UseCases />
      {/* 4. The 30-day pilot */}
      <HowItWorks />
      {/* 5. What each employee gets */}
      <WhatYouGet />
      {/* 6. What the manager gets */}
      <ManagerGets />
      {/* 7. Pricing */}
      <PricingSection />
      {/* 8. Responsible AI / privacy / human review */}
      <ResponsibleAI />
      {/* 9. Proof */}
      <Testimonials />
      <FitSection />
      <QualificationForm />
      {/* 10. Who you're working with */}
      <WhoYouAreWorkingWith />
      {/* 11. FAQ */}
      <FAQ />
      {/* 12. Final CTA */}
      <FinalCTA />
      <FreeAuditTeams />
      <StickyCTA />
    </div>
  );
}
