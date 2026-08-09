import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { T } from "../audit/ui";
import {
  TEAM_OPTIONS,
  COMPANY_SIZE_OPTIONS,
  PARTICIPANT_OPTIONS,
  buildTeamBookingUrl,
} from "../teams/teamsBooking";

const PROD_ORIGIN = "https://www.aiforeveryrole.com";
const TEAMS_PATH = "/teams";
const CANONICAL_URL = PROD_ORIGIN + TEAMS_PATH;
const PRICE = "5,000\u20AA / $1,500 / \u00A31,250";

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
  const mark = positive ? "\u2713" : "\u00B7";
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
  { title: "Personalised Implementation", body: "Five employees each get a 60 minute session built around real work from their role.", tags: ["Real tasks", "Practical workflows"] },
  { title: "Resources and Support", body: "Each participant receives a personalised Prompt Kit, session resources and 14 days of implementation support.", tags: [] },
  { title: "Measurement", body: "We measure what changed where practical and give the employer a simple summary after the pilot.", tags: [] },
];

const FULL_INCLUSIONS = [
  "Five personalised 60 minute one to one sessions",
  "Sessions built around each employee\u2019s real recurring work",
  "A personalised Prompt Kit for every participant",
  "Session resources and saved outputs",
  "14 days of implementation support per participant",
  "A short before and after view where a task can be measured",
  "A simple summary for the employer after the pilot",
  "One time 30 day pilot with no long term contract",
];

const GENERIC_POINTS = ["Same examples for everyone", "Mostly watching", "Tool focused", "Harder to measure what changed"];
const SAM_POINTS = ["One to one", "Real employee tasks", "Build during the session", "Measure what changed"];

const HOW_STEPS = [
  { n: "1", title: "Understand the Team", body: "We identify your priorities, current AI use and relevant company guidelines." },
  { n: "2", title: "Choose Five People", body: "Start with the employees most likely to benefit from practical AI implementation." },
  { n: "3", title: "Find Real Work", body: "Each participant identifies recurring tasks, tools and time drains before the session." },
  { n: "4", title: "Build Together", body: "We create and test something useful during the 60 minute session." },
  { n: "5", title: "Measure the Change", body: "Where practical, we compare the task before and after implementation." },
];

const USE_CASES = [
  { title: "Research and Reporting", body: "Research, briefs, summaries, recurring reports and structured updates." },
  { title: "Writing and Communication", body: "Emails, documents, proposals, editing and internal communication." },
  { title: "Meetings and Admin", body: "Preparation, notes, actions, follow up and repetitive administration." },
  { title: "Marketing and Sales", body: "Content workflows, research, account preparation, briefs and follow up." },
  { title: "HR and Customer Success", body: "Recruiting tasks, documentation, customer communication and preparation." },
  { title: "Operations and Leadership", body: "Processes, synthesis, planning, documentation and decision preparation." },
];

const MEASURE_LIST = ["Adoption of the new workflow", "Task time before and after", "Estimated time recovered per week", "Employee confidence with the workflow"];

const STRONG_FIT = ["Employees do knowledge work", "Repetitive tasks consume time", "AI use is allowed", "Leadership wants practical implementation"];
const NOT_FIT = ["You only want a keynote", "Employees cannot use AI", "You require guaranteed financial ROI", "You want a full company rollout before testing"];

const FAQS = [
  { q: "What actually happens during a session?", a: "We take one real task from the employee, then build and test a working AI workflow for it together in 60 minutes." },
  { q: "Do employees need technical skills?", a: "No. If they can use everyday work software, they can take part." },
  { q: "How is this different from generic AI training?", a: "It is one to one and built around each person\u2019s real work, not a shared demo everyone watches." },
  { q: "How much is the pilot?", a: "The 30 day pilot for five employees is " + PRICE + "." },
  { q: "What happens after the pilot?", a: "If it works, we can discuss more employees, teams or workflows, decided using the real pilot results." },
  { q: "Can we start with more than five employees?", a: "The pilot is designed for five. We can talk about a larger group once the pilot shows results." },
  { q: "Which AI tools do you use?", a: "We work within the tools your company already approves, so nothing conflicts with your guidelines." },
  { q: "Do you guarantee a specific time saving?", a: "No. We focus on building useful workflows and measuring what changed where practical." },
  { q: "Where do the sessions take place?", a: "Sessions run online so employees can join from wherever they work." },
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
        <h1 style={{ color: T.white, fontWeight: 900, fontSize: "clamp(30px,7vw,46px)", lineHeight: 1.1, letterSpacing: "-1px", margin: "0 0 16px" }}>
          Make AI Useful Across Your Team
        </h1>
        <p style={{ color: T.grey, fontSize: "clamp(17px,2.4vw,19px)", lineHeight: 1.55, margin: "0 auto 18px", maxWidth: 560 }}>
          Give five employees personalised one to one AI sessions built around their real work. Start with a 30 day pilot and measure what changes.
        </p>
        <div style={{ color: T.greyDim, fontWeight: 700, fontSize: "15px", marginBottom: "6px" }}>5 employees · 30 days</div>
        <div style={{ marginBottom: "22px" }}><PriceBlock /></div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "12px" }}>
          <PrimaryButton onClick={() => goToQualify("hero")}>Discuss a Team Pilot</PrimaryButton>
          <SecondaryLink onClick={() => scrollToId("how")}>See how it works</SecondaryLink>
        </div>
      </div>
    </section>
  );
}

/* ----- 2. What Your Team Gets ----- */
function WhatYouGet() {
  return (
    <Section id="pilot" bg={T.navy}>
      <Eyebrow>The Pilot</Eyebrow>
      <H2>What Your Team Gets</H2>
      <Rail cols={3} label="What your team gets">
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
      <div style={{ textAlign: "center", marginTop: "28px" }}>
        <div style={{ color: T.greyDim, fontSize: "14px", fontWeight: 600, marginBottom: "8px" }}>One time 30 day pilot · no long term contract</div>
        <div style={{ marginBottom: "18px" }}><PriceBlock small /></div>
        <PrimaryButton onClick={() => goToQualify("pilot")}>Discuss a Team Pilot</PrimaryButton>
      </div>
      <div style={{ maxWidth: 640, margin: "26px auto 0" }}>
        <Accordion summary="See everything included">
          <TickList items={FULL_INCLUSIONS} positive />
        </Accordion>
      </div>
    </Section>
  );
}

/* ----- 3. Built Around Real Work ----- */
function BuiltAroundRealWork() {
  return (
    <Section id="problem" bg={T.panel}>
      <Eyebrow>Why This Is Different</Eyebrow>
      <H2>Built Around Real Work</H2>
      <Lead>AI access alone does not create useful adoption. Employees need to know where AI fits into their actual job.</Lead>
      <div style={{ marginTop: "24px" }}>
        <Rail cols={2} label="Comparison of training approaches">
          <RailCard>
            <div style={{ color: T.greyDim, fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>Generic AI Training</div>
            <TickList items={GENERIC_POINTS} />
          </RailCard>
          <RailCard>
            <div style={{ color: T.orange, fontWeight: 800, fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "14px" }}>AI With Sam</div>
            <TickList items={SAM_POINTS} positive />
          </RailCard>
        </Rail>
      </div>
    </Section>
  );
}

/* ----- 4. How It Works ----- */
function HowItWorks() {
  return (
    <Section id="how" bg={T.navy}>
      <Eyebrow>How It Works</Eyebrow>
      <H2>A Simple Five Step Pilot</H2>
      <Rail cols={5} label="How the pilot works">
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

/* ----- 5. Employee Use Cases ----- */
function UseCases() {
  return (
    <Section id="usecases" bg={T.panel}>
      <Eyebrow>Employee Use Cases</Eyebrow>
      <H2>What Can Employees Work On?</H2>
      <Rail cols={3} label="Employee use cases">
        {USE_CASES.map((c, i) => (
          <RailCard key={i}>
            <div style={{ color: T.white, fontWeight: 800, fontSize: "16px", marginBottom: "8px" }}>{c.title}</div>
            <div style={{ color: T.grey, fontSize: "14px", lineHeight: 1.5 }}>{c.body}</div>
          </RailCard>
        ))}
      </Rail>
      <p style={{ color: T.grey, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, margin: "26px auto 0", maxWidth: 640, textAlign: "center" }}>
        The goal is not to use AI everywhere. It is to use it where it genuinely improves the work.
      </p>
    </Section>
  );
}

/* ----- 6. Measurement ----- */
function Measurement() {
  return (
    <Section id="measure" bg={T.navy}>
      <Eyebrow>Measurement</Eyebrow>
      <H2>Measure What Changed</H2>
      <Lead>Where a task can be measured, we compare the workflow before and after implementation.</Lead>
      <div style={{ maxWidth: 560, margin: "24px auto 0" }}>
        <Panel style={{ textAlign: "center", background: T.card }}>
          <div style={{ color: T.greyDim, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "18px" }}>Illustrative example</div>
          <div style={{ color: T.greyDim, fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>Before</div>
          <div style={{ color: T.white, fontWeight: 800, fontSize: "clamp(18px,3vw,22px)" }}>45 minutes × 4 times per week</div>
          <div aria-hidden="true" style={{ color: T.orange, fontSize: "24px", margin: "6px 0" }}>↓</div>
          <div style={{ color: T.greyDim, fontSize: "13px", fontWeight: 700, marginBottom: "4px" }}>After</div>
          <div style={{ color: T.white, fontWeight: 800, fontSize: "clamp(18px,3vw,22px)" }}>15 minutes × 4 times per week</div>
          <div aria-hidden="true" style={{ color: T.orange, fontSize: "24px", margin: "6px 0" }}>↓</div>
          <div style={{ color: T.greyDim, fontSize: "13px", fontWeight: 700, marginTop: "6px" }}>Potential time recovered</div>
          <div style={{ color: T.orange, fontWeight: 900, fontSize: "clamp(26px,5vw,36px)", letterSpacing: "-0.5px" }}>2 hours per week</div>
        </Panel>
      </div>
      <p style={{ color: T.grey, fontSize: "15px", lineHeight: 1.6, margin: "20px auto 0", maxWidth: 560, textAlign: "center" }}>
        We can track adoption, task time and estimated time recovered where practical.
      </p>
      <div style={{ maxWidth: 560, margin: "18px auto 0" }}>
        <Accordion summary="What we can measure">
          <TickList items={MEASURE_LIST} positive />
        </Accordion>
      </div>
    </Section>
  );
}

/* ----- 7. Fit / Commitment / After ----- */
function FitSection() {
  return (
    <Section id="fit" bg={T.panel}>
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
            <p style={{ margin: "0 0 10px" }}>Each session focuses on an agreed real task. If the agreed workflow is not working by the end of the session, we provide reasonable follow up help during the included 14 day implementation support period.</p>
            <p style={{ margin: 0, color: T.greyDim }}>We do not guarantee a specific amount of time saved or financial return.</p>
          </Accordion>
        </div>
        <div id="after" style={{ border: "1.5px solid " + T.border, borderRadius: 14, overflow: "hidden", background: T.card }}>
          <Accordion summary="What happens after the pilot?">
            <p style={{ margin: 0 }}>If the pilot works, we can discuss continuing with more employees, teams or workflows. We decide that using real results from the pilot.</p>
          </Accordion>
        </div>
      </div>
    </Section>
  );
}

/* ----- 9. FAQ ----- */
function FAQ() {
  return (
    <Section id="faq" bg={T.navy}>
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

/* ----- 10. Final CTA ----- */
function FinalCTA() {
  return (
    <Section id="final" bg={T.panel}>
      <div style={{ maxWidth: 560, margin: "0 auto", textAlign: "center" }}>
        <H2 style={{ marginBottom: "12px" }}>Start With Five People</H2>
        <p style={{ color: T.grey, fontSize: "clamp(16px,2.2vw,18px)", lineHeight: 1.6, margin: "0 0 18px" }}>
          Test the approach with a small group, measure what happens and decide what comes next.
        </p>
        <div style={{ marginBottom: "20px" }}><PriceBlock /></div>
        <PrimaryButton onClick={() => goToQualify("final")}>Discuss a Team Pilot</PrimaryButton>
      </div>
    </Section>
  );
}

/* ----- 8. Qualification Form (two step) ----- */
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
                }}>{submitting ? "Opening booking\u2026" : "Book My Team Call"}</button>
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
      }}>Discuss Pilot</button>
    </div>
  );
}

const STYLES = [
  ".rail { display: grid; gap: 16px; grid-template-columns: repeat(var(--cols), 1fr); }",
  ".rail-card { background: " + T.card + "; border: 1.5px solid " + T.border + "; border-radius: 16px; padding: 22px 20px; }",
  ".acc summary::-webkit-details-marker { display: none; }",
  ".acc[open] .acc-plus { transform: rotate(45deg); }",
  ".acc .acc-plus { transition: transform 0.2s ease; display: inline-block; }",
  ".rail:focus-visible { outline: 2px solid " + T.orange + "; outline-offset: 4px; }",
  ".sticky-cta { display: none; }",
  "@media (max-width: 760px) { .sticky-cta { display: block; } }",
  "@media (max-width: 760px) {",
  "  .rail { grid-auto-flow: column; grid-template-columns: none; grid-auto-columns: 82%; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; padding-bottom: 10px; scrollbar-width: none; }",
  "  .rail::-webkit-scrollbar { display: none; }",
  "  .rail-card { scroll-snap-align: start; }",
  "}",
  "@media (prefers-reduced-motion: reduce) {",
  "  * { scroll-behavior: auto !important; }",
  "  .sticky-cta { transition: none !important; }",
  "}",
].join("\n");

/* ----- Page ----- */
export default function Teams() {
  useEffect(() => {
    document.title = "AI Training for Teams | Personalised AI Workflows | AI With Sam";
    upsertNamedMeta("description", "Help employees turn AI into practical improvements in their real work. Start with a personalised 5 person, 30 day AI productivity pilot.");
    upsertNamedMeta("robots", "index, follow");
    upsertCanonical(CANONICAL_URL);
    upsertPropertyMeta("og:title", "AI Training for Teams | AI With Sam");
    upsertPropertyMeta("og:description", "Personalised one to one AI workflow sessions for your team. Start with a 5 person, 30 day pilot.");
    upsertPropertyMeta("og:type", "website");
    upsertPropertyMeta("og:url", CANONICAL_URL);
    upsertPropertyMeta("og:image", PROD_ORIGIN + "/logo.png");
    upsertNamedMeta("twitter:card", "summary_large_image");
    upsertNamedMeta("twitter:title", "AI Training for Teams | AI With Sam");
    upsertNamedMeta("twitter:description", "Personalised one to one AI workflow sessions for your team. Start with a 5 person, 30 day pilot.");
    track("teams_page_view");
  }, []);

  return (
    <div style={{ fontFamily: T.font, background: T.navy, minHeight: "100vh" }}>
      <style>{STYLES}</style>
      <Hero />
      <WhatYouGet />
      <BuiltAroundRealWork />
      <HowItWorks />
      <UseCases />
      <Measurement />
      <FitSection />
      <QualificationForm />
      <FAQ />
      <FinalCTA />
      <StickyCTA />
    </div>
  );
}

