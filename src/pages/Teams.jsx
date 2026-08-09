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
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ----- Shared presentational primitives (dash free copy throughout) -----
const maxW = 1080;

function Section({ id, bg, children, style }) {
  return (
    <section id={id} style={{ background: bg || T.navy, padding: "72px 24px", ...style }}>
      <div style={{ maxWidth: maxW, margin: "0 auto" }}>{children}</div>
    </section>
  );
}

function Eyebrow({ children }) {
  return (
    <div style={{ color: T.orange, fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>
      {children}
    </div>
  );
}

function H2({ children, style }) {
  return <h2 style={{ fontSize: "clamp(26px,3.4vw,38px)", fontWeight: 800, color: T.white, lineHeight: 1.2, margin: "0 0 18px", ...style }}>{children}</h2>;
}

function Lead({ children, style }) {
  return <p style={{ color: T.grey, fontSize: "17px", lineHeight: 1.7, margin: "0 0 18px", maxWidth: "760px", ...style }}>{children}</p>;
}

function Panel({ children, style }) {
  return <div style={{ background: T.card, border: "1px solid " + T.border, borderRadius: "16px", padding: "28px", ...style }}>{children}</div>;
}

function Check() {
  return <span aria-hidden="true" style={{ color: T.orange, fontWeight: 800, marginRight: "10px", flex: "0 0 auto" }}>{"\u2713"}</span>;
}

function TickList({ items }) {
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
      {items.map((t, i) => (
        <li key={i} style={{ display: "flex", alignItems: "flex-start", color: T.grey, fontSize: "15px", lineHeight: 1.6, marginBottom: "12px" }}>
          <Check />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );
}

function PrimaryPill({ children, onClick, type, disabled }) {
  return (
    <button type={type || "button"} onClick={onClick} disabled={disabled}
      style={{ background: disabled ? "#3F2A18" : T.orange, color: disabled ? "#B98A5E" : T.white, fontWeight: 700, fontSize: "16px", padding: "15px 30px", minHeight: "50px", border: "none", borderRadius: "50px", cursor: disabled ? "not-allowed" : "pointer" }}>
      {children}
    </button>
  );
}

function SecondaryPill({ children, onClick, style }) {
  return (
    <button type="button" onClick={onClick}
      style={{ background: "transparent", color: T.grey, fontWeight: 600, fontSize: "15px", padding: "15px 26px", minHeight: "50px", border: "1px solid " + T.border, borderRadius: "50px", cursor: "pointer", ...style }}>
      {children}
    </button>
  );
}

// ----- Header -----
function TeamsHeader() {
  return (
    <header style={{ background: T.navy, height: "64px", position: "sticky", top: 0, zIndex: 1000, borderBottom: "1px solid " + T.border }}>
      <div style={{ maxWidth: maxW, margin: "0 auto", padding: "0 24px", height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link to="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <img src="/logo.png" alt="AI For Every Role home" style={{ height: "36px", width: "36px", objectFit: "contain" }} />
          <span style={{ fontWeight: 800, color: T.white, fontSize: "20px" }}><span style={{ color: T.orange }}>AI</span> For Teams</span>
        </Link>
        <nav style={{ display: "flex", gap: "22px", alignItems: "center" }} aria-label="Teams">
          <Link to="/" style={{ color: T.grey, fontSize: "15px", fontWeight: 500, textDecoration: "none" }} className="teams-navlink">For Individuals</Link>
          <PrimaryPill onClick={() => { track("teams_primary_cta_click", { location: "header" }); scrollToId("qualify"); }}>Discuss a Team Pilot</PrimaryPill>
        </nav>
      </div>
    </header>
  );
}

// ----- Hero -----
function Hero() {
  return (
    <Section id="top" bg={T.navy} style={{ paddingTop: "64px", paddingBottom: "56px" }}>
      <Eyebrow>AI For Teams</Eyebrow>
      <h1 style={{ fontSize: "clamp(32px,5vw,52px)", fontWeight: 800, color: T.white, lineHeight: 1.15, margin: "0 0 20px", maxWidth: "820px" }}>Make AI Useful Across Your Team</h1>
      <Lead style={{ fontSize: "19px", maxWidth: "720px" }}>Give five employees personalised one to one AI workflow sessions built around the work they already do. Start with a 30 day pilot, measure what changes, then decide whether expanding makes sense.</Lead>
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", margin: "26px 0 18px" }}>
        <PrimaryPill onClick={() => { track("teams_primary_cta_click", { location: "hero" }); scrollToId("qualify"); }}>Discuss a 5 Person Pilot</PrimaryPill>
        <SecondaryPill onClick={() => scrollToId("pilot")}>See How the Pilot Works</SecondaryPill>
      </div>
      <p style={{ color: T.greyDim, fontSize: "15px", margin: "0 0 22px" }}>{"5 employees \u00B7 30 days \u00B7 no long term commitment"}</p>
      <Panel style={{ display: "inline-block", padding: "18px 24px" }}>
        <span style={{ color: T.greyDim, fontSize: "13px", display: "block", marginBottom: "4px" }}>Pilot price</span>
        <span style={{ color: T.white, fontSize: "22px", fontWeight: 800 }}>{PRICE}</span>
      </Panel>
    </Section>
  );
}

// ----- Problem and Differentiation -----
function ProblemDiff() {
  const trio = [
    { k: "Access", v: "Employees have AI tools." },
    { k: "Application", v: "Employees identify where those tools genuinely help." },
    { k: "Adoption", v: "Employees leave with practical workflows they can keep using." },
  ];
  const traditional = [
    "Same material for everyone",
    "Generic demonstrations",
    "Tool focused",
    "Employees mostly watch and take notes",
    "Relevance varies by role",
    "Difficult to see what changed afterwards",
  ];
  const ours = [
    "Personalised one to one sessions",
    "Built around actual employee work",
    "Workflow focused",
    "Employees build during the session",
    "Personalised resources afterwards",
    "Implementation support",
    "Outcomes measured where practical",
  ];
  return (
    <Section id="problem" bg={T.panel}>
      <Eyebrow>The Problem</Eyebrow>
      <H2>AI Access Is Not the Same as AI Adoption</H2>
      <Lead>Giving employees access to AI tools is easy. The harder question is helping each person understand where AI can genuinely improve their own work.</Lead>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: "16px", margin: "28px 0 40px" }}>
        {trio.map((t) => (
          <Panel key={t.k}>
            <div style={{ color: T.orange, fontWeight: 800, fontSize: "18px", marginBottom: "8px" }}>{t.k}</div>
            <div style={{ color: T.grey, fontSize: "15px", lineHeight: 1.6 }}>{t.v}</div>
          </Panel>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px" }}>
        <Panel style={{ background: T.navy }}>
          <div style={{ color: T.greyDim, fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>Traditional AI Training</div>
          <TickList items={traditional} />
        </Panel>
        <Panel style={{ border: "1px solid " + T.orange }}>
          <div style={{ color: T.orange, fontWeight: 700, fontSize: "14px", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "16px" }}>AI For Every Role</div>
          <TickList items={ours} />
        </Panel>
      </div>
      <Lead style={{ marginTop: "32px", color: T.white, fontWeight: 600 }}>We do not need every employee to become an AI expert. We need them to know where AI genuinely improves their work.</Lead>
      <div style={{ marginTop: "20px" }}>
        <SecondaryPill onClick={() => scrollToId("pilot")}>See the 5 Person Pilot</SecondaryPill>
      </div>
    </Section>
  );
}

// ----- How It Works -----
function HowItWorks() {
  const steps = [
    { n: 1, t: "Understand the Team", d: "We start with a short employer conversation to understand your team, current AI use, priorities and important company guidelines." },
    { n: 2, t: "Choose the Participants", d: "Start with five employees or choose the group where practical AI implementation is most likely to create value." },
    { n: 3, t: "Identify Real Work", d: "Each participant shares their role, tools, recurring tasks and biggest time drains before the session." },
    { n: 4, t: "Build One to One", d: "Each employee gets a 60 minute working session focused on a real task. We identify a useful AI opportunity, build the prompt or workflow together and test it during the session." },
    { n: 5, t: "Measure What Changed", d: "Where practical, compare the relevant task before and after implementation. The employer receives a simple summary of program adoption, what was built and measurable outcomes." },
  ];
  return (
    <Section id="how" bg={T.navy}>
      <Eyebrow>How It Works</Eyebrow>
      <H2>Turn AI Into Something Employees Actually Use</H2>
      <div style={{ display: "grid", gap: "16px", marginTop: "28px" }}>
        {steps.map((s) => (
          <Panel key={s.n} style={{ display: "flex", gap: "18px", alignItems: "flex-start" }}>
            <div style={{ flex: "0 0 auto", width: "40px", height: "40px", borderRadius: "50%", background: T.orange, color: T.white, fontWeight: 800, display: "flex", alignItems: "center", justifyContent: "center" }}>{s.n}</div>
            <div>
              <div style={{ color: T.white, fontWeight: 700, fontSize: "18px", marginBottom: "6px" }}>{s.t}</div>
              <div style={{ color: T.grey, fontSize: "15px", lineHeight: 1.6 }}>{s.d}</div>
            </div>
          </Panel>
        ))}
      </div>
      <div style={{ marginTop: "24px" }}>
        <PrimaryPill onClick={() => { track("teams_primary_cta_click", { location: "how" }); scrollToId("qualify"); }}>Discuss My Team</PrimaryPill>
      </div>
    </Section>
  );
}

// ----- Pilot Offer -----
function PilotOffer() {
  const includes = [
    "Initial employer kickoff call",
    "Five personalised 60 minute employee sessions",
    "Real work brought into every session",
    "One practical implementation focus for every participant",
    "Personalised AI Prompt Kit for every participant",
    "Session resources and recording where appropriate",
    "14 days of implementation support",
    "Before and after measurement where practical",
    "End of pilot employer summary",
    "Recommendations for additional AI opportunities",
  ];
  return (
    <Section id="pilot" bg={T.panel}>
      <Eyebrow>Start Small</Eyebrow>
      <H2>Start With a 5 Person AI Productivity Pilot</H2>
      <Lead>Do not commit to a company wide AI initiative before knowing whether employees will actually use what they learn. Start with five people, implement around real work, measure what happens and then decide whether expanding makes sense.</Lead>
      <Panel style={{ marginTop: "28px", maxWidth: "640px" }}>
        <div style={{ color: T.white, fontWeight: 800, fontSize: "22px", marginBottom: "6px" }}>5 Person AI Productivity Pilot</div>
        <div style={{ color: T.orange, fontWeight: 800, fontSize: "26px", marginBottom: "10px" }}>{PRICE}</div>
        <div style={{ color: T.greyDim, fontSize: "14px", marginBottom: "20px" }}>{"One time 30 day pilot \u00B7 No long term contract required"}</div>
        <TickList items={includes} />
        <div style={{ marginTop: "18px" }}>
          <PrimaryPill onClick={() => { track("teams_primary_cta_click", { location: "pilot" }); scrollToId("qualify"); }}>Discuss a 5 Person Pilot</PrimaryPill>
        </div>
        <p style={{ color: T.greyDim, fontSize: "13px", marginTop: "14px", marginBottom: 0 }}>We will first make sure the pilot is a sensible fit for your team.</p>
      </Panel>
    </Section>
  );
}

// ----- Commitment -----
function Commitment() {
  return (
    <Section id="commitment" bg={T.navy}>
      <Eyebrow>Our Commitment</Eyebrow>
      <H2>Every Participant Should Leave With Something Practical</H2>
      <Lead>Each session is built around an agreed real task. The goal is for the participant to leave with a practical workflow they can use with the approved tools available to them. If the agreed workflow is not working by the end of the session, we will provide reasonable follow up help during the included 14 day implementation support period at no additional cost, provided the participant has access to the required approved tools and takes part in the follow up.</Lead>
      <Lead style={{ color: T.greyDim }}>We do not guarantee a specific number of hours saved or a financial return. Different roles, tasks and adoption levels produce different results.</Lead>
    </Section>
  );
}

// ----- Use Cases -----
function UseCases() {
  const cases = [
    { t: "Research", d: "Summarising information, preparing briefs and finding useful starting points faster." },
    { t: "Reporting", d: "Creating first drafts, structuring updates and reducing repetitive reporting work." },
    { t: "Writing and Communication", d: "Emails, internal communication, proposals, documentation and editing." },
    { t: "Meetings", d: "Preparation, notes, follow up and turning discussions into actions." },
    { t: "Marketing", d: "Research, content workflows, repurposing, briefs and reporting." },
    { t: "Sales", d: "Account research, preparation, follow up and drafting." },
    { t: "Recruiting and HR", d: "Job related writing, research, interview preparation and internal documentation." },
    { t: "Operations", d: "Process documentation, repetitive administration and information handling." },
    { t: "Customer Success", d: "Preparation, summaries, follow up and recurring customer communication." },
    { t: "Leadership", d: "Research, synthesis, planning documents and decision preparation." },
  ];
  return (
    <Section id="usecases" bg={T.panel}>
      <Eyebrow>Real Work, Different Roles</Eyebrow>
      <H2>What Can Employees Work On?</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))", gap: "16px", marginTop: "28px" }}>
        {cases.map((c) => (
          <Panel key={c.t}>
            <div style={{ color: T.white, fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}>{c.t}</div>
            <div style={{ color: T.grey, fontSize: "14px", lineHeight: 1.6 }}>{c.d}</div>
          </Panel>
        ))}
      </div>
      <Lead style={{ marginTop: "28px", color: T.white, fontWeight: 600 }}>The goal is not to use AI everywhere. It is to find the places where it creates meaningful value.</Lead>
    </Section>
  );
}

// ----- Measurement -----
function Measurement() {
  const measures = [
    "workflows implemented",
    "employee adoption",
    "task time before",
    "task time after",
    "estimated weekly time recovered",
    "participant feedback",
    "additional opportunities identified",
  ];
  const cell = { padding: "18px", borderRadius: "12px", background: T.navy, border: "1px solid " + T.border, flex: "1 1 200px" };
  return (
    <Section id="measure" bg={T.navy}>
      <Eyebrow>Measure the Impact</Eyebrow>
      <H2>Do Not Measure Training Attendance. Measure What Changed.</H2>
      <Lead>Where a task can reasonably be measured, we establish a simple baseline before implementation and check what happened afterwards.</Lead>
      <div style={{ color: T.orange, fontWeight: 700, fontSize: "13px", textTransform: "uppercase", letterSpacing: "1px", margin: "18px 0 12px" }}>Illustrative example</div>
      <div style={{ display: "flex", gap: "14px", flexWrap: "wrap", marginBottom: "10px" }}>
        <div style={cell}>
          <div style={{ color: T.greyDim, fontSize: "13px", marginBottom: "6px" }}>Recurring task</div>
          <div style={{ color: T.white, fontWeight: 700 }}>{"45 minutes \u00D7 4 times per week"}</div>
        </div>
        <div style={cell}>
          <div style={{ color: T.greyDim, fontSize: "13px", marginBottom: "6px" }}>AI assisted workflow</div>
          <div style={{ color: T.white, fontWeight: 700 }}>{"15 minutes \u00D7 4 times per week"}</div>
        </div>
        <div style={{ ...cell, borderColor: T.orange }}>
          <div style={{ color: T.greyDim, fontSize: "13px", marginBottom: "6px" }}>Potential time recovered</div>
          <div style={{ color: T.orange, fontWeight: 800 }}>2 hours per week</div>
        </div>
      </div>
      <p style={{ color: T.greyDim, fontSize: "13px", fontStyle: "italic", margin: "0 0 24px" }}>This is an illustrative example, not a customer result.</p>
      <div style={{ color: T.white, fontWeight: 600, marginBottom: "12px" }}>Possible measurements</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "24px" }}>
        {measures.map((m) => (
          <span key={m} style={{ background: T.card, border: "1px solid " + T.border, borderRadius: "50px", padding: "8px 16px", color: T.grey, fontSize: "14px" }}>{m}</span>
        ))}
      </div>
      <Lead style={{ color: T.greyDim }}>Employer reporting focuses on agreed program level outcomes. Private employee conversations or sensitive information should not be shared with management without appropriate knowledge and consent.</Lead>
      <div style={{ marginTop: "16px" }}>
        <SecondaryPill onClick={() => scrollToId("qualify")}>See If This Fits My Team</SecondaryPill>
      </div>
    </Section>
  );
}

// ----- Fit -----
function Fit() {
  const strong = [
    "employees do knowledge work",
    "employees have repetitive or time consuming tasks",
    "teams use AI or are starting to adopt it",
    "leadership wants implementation rather than theory",
    "employees can use approved AI tools on real work",
    "leadership wants to measure whether work improves",
  ];
  const notFit = [
    "you only want a motivational keynote",
    "employees are prohibited from using AI tools",
    "you require guaranteed financial ROI",
    "you expect every employee to use one identical workflow",
    "you want immediate company wide transformation without testing first",
  ];
  return (
    <Section id="fit" bg={T.panel}>
      <H2>Is This a Good Fit for Your Team?</H2>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: "16px", marginTop: "24px" }}>
        <Panel style={{ border: "1px solid " + T.orange }}>
          <div style={{ color: T.orange, fontWeight: 700, fontSize: "16px", marginBottom: "16px" }}>A Strong Fit</div>
          <TickList items={strong} />
        </Panel>
        <Panel style={{ background: T.navy }}>
          <div style={{ color: T.greyDim, fontWeight: 700, fontSize: "16px", marginBottom: "16px" }}>Probably Not a Fit</div>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {notFit.map((t, i) => (
              <li key={i} style={{ display: "flex", alignItems: "flex-start", color: T.greyDim, fontSize: "15px", lineHeight: 1.6, marginBottom: "12px" }}>
                <span aria-hidden="true" style={{ color: T.greyDim, fontWeight: 800, marginRight: "10px" }}>{"\u00D7"}</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </Section>
  );
}

// ----- After the Pilot -----
function AfterPilot() {
  const uses = [
    "employees who have not participated",
    "new hires",
    "additional teams",
    "new workflows",
    "deeper implementation",
    "changing responsibilities",
    "new AI opportunities",
  ];
  return (
    <Section id="after" bg={T.navy}>
      <Eyebrow>After the Pilot</Eyebrow>
      <H2>If It Works, Expand It</H2>
      <Lead>Companies that want to continue can reserve a set amount of personalised implementation capacity each month for additional employees, teams and workflows.</Lead>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", margin: "18px 0 24px" }}>
        {uses.map((u) => (
          <span key={u} style={{ background: T.card, border: "1px solid " + T.border, borderRadius: "50px", padding: "8px 16px", color: T.grey, fontSize: "14px" }}>{u}</span>
        ))}
      </div>
      <Lead style={{ color: T.greyDim }}>We recommend deciding what ongoing support should look like after the pilot, once there is real usage and evidence to work from.</Lead>
      <div style={{ marginTop: "16px" }}>
        <PrimaryPill onClick={() => { track("teams_primary_cta_click", { location: "after" }); scrollToId("qualify"); }}>Start With the Pilot</PrimaryPill>
      </div>
    </Section>
  );
}

// ----- Qualification Form -----
function QualificationForm() {
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
  const valid = nameOk && emailOk && companyOk && sizeOk && countOk && teamsOk && goalOk;

  const markStarted = () => {
    if (!startedRef.current) { startedRef.current = true; track("teams_form_start"); }
  };

  const toggleTeam = (index) => {
    markStarted();
    setTeams((prev) => (prev.includes(index) ? prev.filter((n) => n !== index) : [...prev, index]));
  };

  const field = { width: "100%", background: T.panel, border: "2px solid " + T.border, borderRadius: "12px", padding: "14px", color: T.white, fontSize: "15px", fontFamily: T.font, minHeight: "50px", boxSizing: "border-box" };
  const labelStyle = { display: "block", color: T.grey, fontSize: "14px", marginBottom: "6px", fontWeight: 600 };
  const wrap = { marginBottom: "18px" };
  const errStyle = { color: "#FCA5A5", fontSize: "13px", marginTop: "6px" };

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    setRedirectError(false);
    if (!valid) {
      const firstErr = document.querySelector("[data-invalid=\"true\"]");
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
    <Section id="qualify" bg={T.panel}>
      <Eyebrow>Tell Me About Your Team</Eyebrow>
      <H2>See If a Small Pilot Makes Sense</H2>
      <Lead>Tell me a little about your team. This takes about a minute and helps me understand whether a small AI productivity pilot makes sense for your company.</Lead>
      <p style={{ color: T.greyDim, fontSize: "14px", marginBottom: "24px" }}>No long term commitment. The next step is a free 20 minute conversation.</p>
      <form onSubmit={submit} noValidate style={{ maxWidth: "640px" }}>
        <Panel>
          <div style={wrap}>
            <label style={labelStyle} htmlFor="tf-name">Your name</label>
            <input id="tf-name" style={field} value={name} maxLength={80} autoComplete="name" data-invalid={touched && !nameOk} aria-invalid={touched && !nameOk} aria-describedby="tf-name-err" onChange={(e) => { markStarted(); setName(e.target.value); }} />
            {touched && !nameOk && <div id="tf-name-err" style={errStyle}>Please enter your name.</div>}
          </div>
          <div style={wrap}>
            <label style={labelStyle} htmlFor="tf-email">Work email</label>
            <input id="tf-email" type="email" style={field} value={email} maxLength={160} autoComplete="email" inputMode="email" data-invalid={touched && !emailOk} aria-invalid={touched && !emailOk} aria-describedby="tf-email-err" onChange={(e) => { markStarted(); setEmail(e.target.value); }} />
            <div style={{ color: T.greyDim, fontSize: "13px", marginTop: "6px" }}>Work email preferred.</div>
            {touched && !emailOk && <div id="tf-email-err" style={errStyle}>Please enter a valid email address.</div>}
          </div>
          <div style={wrap}>
            <label style={labelStyle} htmlFor="tf-company">Company name</label>
            <input id="tf-company" style={field} value={company} maxLength={120} autoComplete="organization" data-invalid={touched && !companyOk} aria-invalid={touched && !companyOk} aria-describedby="tf-company-err" onChange={(e) => { markStarted(); setCompany(e.target.value); }} />
            {touched && !companyOk && <div id="tf-company-err" style={errStyle}>Please enter your company name.</div>}
          </div>
          <div style={wrap}>
            <label style={labelStyle} htmlFor="tf-size">Company size</label>
            <select id="tf-size" style={field} value={companySize} data-invalid={touched && !sizeOk} aria-invalid={touched && !sizeOk} aria-describedby="tf-size-err" onChange={(e) => { markStarted(); setCompanySize(e.target.value); }}>
              <option value="">Please choose</option>
              {COMPANY_SIZE_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {touched && !sizeOk && <div id="tf-size-err" style={errStyle}>Please choose a company size.</div>}
          </div>
          <div style={wrap}>
            <label style={labelStyle} htmlFor="tf-count">Approximately how many employees would you initially want to support?</label>
            <select id="tf-count" style={field} value={participantCount} data-invalid={touched && !countOk} aria-invalid={touched && !countOk} aria-describedby="tf-count-err" onChange={(e) => { markStarted(); setParticipantCount(e.target.value); }}>
              <option value="">Please choose</option>
              {PARTICIPANT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {touched && !countOk && <div id="tf-count-err" style={errStyle}>Please choose an approximate number.</div>}
          </div>
          <fieldset style={{ ...wrap, border: "none", padding: 0, margin: "0 0 18px" }} data-invalid={touched && !teamsOk}>
            <legend style={{ ...labelStyle, padding: 0 }}>Which team or teams are you considering?</legend>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "8px", marginTop: "6px" }}>
              {TEAM_OPTIONS.map((opt) => {
                const checked = teams.includes(opt.index);
                return (
                  <label key={opt.index} style={{ display: "flex", alignItems: "center", gap: "10px", background: checked ? "rgba(249,115,22,0.12)" : T.panel, border: "2px solid " + (checked ? T.orange : T.border), borderRadius: "12px", padding: "12px 14px", cursor: "pointer", color: T.white, fontSize: "15px", minHeight: "48px" }}>
                    <input type="checkbox" checked={checked} onChange={() => toggleTeam(opt.index)} style={{ width: "18px", height: "18px", accentColor: T.orange }} />
                    <span>{opt.label}</span>
                  </label>
                );
              })}
            </div>
            {touched && !teamsOk && <div style={errStyle}>Please choose at least one team.</div>}
          </fieldset>
          <div style={{ marginBottom: "4px" }}>
            <label style={labelStyle} htmlFor="tf-goal">What is the main thing you would like AI to help your team improve?</label>
            <textarea id="tf-goal" style={{ ...field, minHeight: "110px", resize: "vertical" }} value={mainGoal} maxLength={800} placeholder="For example, repetitive reporting, research, admin, content workflows or meeting follow up" data-invalid={touched && !goalOk} aria-invalid={touched && !goalOk} aria-describedby="tf-goal-err" onChange={(e) => { markStarted(); setMainGoal(e.target.value); }} />
            {touched && !goalOk && <div id="tf-goal-err" style={errStyle}>Please tell me what you would like AI to help improve.</div>}
          </div>
          <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: "1px", height: "1px", overflow: "hidden" }}>
            <label htmlFor="tf-website">Website</label>
            <input id="tf-website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
        </Panel>
        {touched && !valid && <div role="alert" aria-live="assertive" style={{ ...errStyle, marginTop: "14px" }}>Please complete the highlighted fields before continuing.</div>}
        {redirectError && <div role="alert" aria-live="assertive" style={{ ...errStyle, marginTop: "14px" }}>We could not open the booking page. Please try again in a moment.</div>}
        <div style={{ marginTop: "18px" }}>
          <PrimaryPill type="submit" disabled={submitting}>{submitting ? "Opening your booking page..." : "Continue to Book My Team Call"}</PrimaryPill>
        </div>
        <p style={{ color: T.greyDim, fontSize: "13px", marginTop: "12px" }}>Next: choose a time for your free 20 minute Team Call.</p>
      </form>
    </Section>
  );
}

// ----- FAQ -----
function Faq() {
  const items = [
    { q: "What happens during each employee session?", a: "Each participant brings real work from their role. We identify a useful AI opportunity, build or improve a practical workflow together and test it during the 60 minute session." },
    { q: "Do employees need to be technical?", a: "No. The service is designed for non technical professionals." },
    { q: "Does everyone receive the same training?", a: "No. Different employees can work on completely different tasks according to their role and responsibilities." },
    { q: "What does the 5 person pilot cost?", a: PRICE + ". It covers the 30 day pilot for five employees and does not require a long term contract." },
    { q: "What happens after the pilot?", a: "If useful adoption and outcomes are achieved, the company can discuss reserving implementation capacity for additional employees, teams and workflows." },
    { q: "Can we start with more than five employees?", a: "Yes. Five employees is the recommended starting point so the company can test the approach before committing to a larger rollout." },
    { q: "What AI tools do employees use?", a: "Sessions work within the tools and AI policies approved by the employer. Employees should not put confidential, sensitive or restricted company information into AI systems unless their organisation explicitly permits it." },
    { q: "Do you guarantee a specific amount of time saved?", a: "No. Different roles and workflows produce different results. Where practical, we establish a baseline and measure what changed." },
    { q: "Where are sessions held?", a: "Sessions are remote and use Google Meet according to the existing confirmed business setup." },
  ];
  const [open, setOpen] = useState(-1);
  return (
    <Section id="faq" bg={T.navy}>
      <Eyebrow>Questions</Eyebrow>
      <H2>Common Questions</H2>
      <div style={{ marginTop: "24px", maxWidth: "820px" }}>
        {items.map((it, i) => {
          const isOpen = open === i;
          return (
            <div key={i} style={{ borderBottom: "1px solid " + T.border }}>
              <button type="button" onClick={() => setOpen(isOpen ? -1 : i)} aria-expanded={isOpen}
                style={{ width: "100%", textAlign: "left", background: "none", border: "none", cursor: "pointer", color: T.white, fontWeight: 700, fontSize: "17px", padding: "18px 0", display: "flex", justifyContent: "space-between", gap: "16px" }}>
                <span>{it.q}</span>
                <span aria-hidden="true" style={{ color: T.orange, flex: "0 0 auto", display: "inline-block", transition: "transform 0.15s ease", transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
              </button>
              {isOpen && <p style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7, margin: "0 0 18px" }}>{it.a}</p>}
            </div>
          );
        })}
      </div>
    </Section>
  );
}

// ----- Final CTA -----
function FinalCta() {
  return (
    <Section id="final" bg={T.panel}>
      <H2>Start With Five People. Measure What Happens.</H2>
      <Lead>You do not need to commit to a company wide AI transformation. Start with a small group, build around real work and see whether employees actually use what they create.</Lead>
      <div style={{ color: T.white, fontWeight: 700, fontSize: "17px", margin: "18px 0" }}>5 person pilot: <span style={{ color: T.orange }}>{PRICE}</span></div>
      <PrimaryPill onClick={() => { track("teams_primary_cta_click", { location: "final" }); scrollToId("qualify"); }}>Tell Me About Your Team</PrimaryPill>
      <p style={{ color: T.greyDim, fontSize: "14px", marginTop: "14px" }}>{"Free 20 minute Team Call \u00B7 No long term commitment"}</p>
    </Section>
  );
}

// ----- Footer (self contained, dash free) -----
function TeamsFooter() {
  return (
    <footer style={{ background: "#0A0F1E", padding: "48px 24px 40px" }}>
      <div style={{ maxWidth: maxW, margin: "0 auto", display: "flex", flexWrap: "wrap", gap: "24px", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img src="/logo.png" alt="AI For Every Role home" style={{ height: "32px", width: "32px", objectFit: "contain" }} />
          <span style={{ fontWeight: 800, color: T.white, fontSize: "18px" }}>AI For Every Role</span>
        </div>
        <nav style={{ display: "flex", gap: "20px", flexWrap: "wrap" }} aria-label="Footer">
          <Link to="/" style={{ color: T.greyDim, fontSize: "14px", textDecoration: "none" }}>For Individuals</Link>
          <a href="#pilot" style={{ color: T.greyDim, fontSize: "14px", textDecoration: "none" }}>The Pilot</a>
          <a href="#faq" style={{ color: T.greyDim, fontSize: "14px", textDecoration: "none" }}>Questions</a>
        </nav>
      </div>
      <div style={{ maxWidth: maxW, margin: "28px auto 0", borderTop: "1px solid " + T.border, paddingTop: "20px", color: "#475569", fontSize: "12px" }}>Copyright 2026 AI For Every Role. All rights reserved.</div>
    </footer>
  );
}

// ----- Mobile sticky CTA (restrained, hidden near the form) -----
function MobileSticky() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      const past = window.scrollY > 600;
      const form = document.getElementById("qualify");
      let nearForm = false;
      if (form) {
        const r = form.getBoundingClientRect();
        nearForm = r.top < window.innerHeight && r.bottom > 0;
      }
      setShow(past && !nearForm);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="teams-sticky" style={{ position: "fixed", left: 0, right: 0, bottom: 0, zIndex: 1200, background: T.navy, borderTop: "1px solid " + T.border, padding: "12px 16px", display: show ? "block" : "none", boxShadow: "0 -6px 20px rgba(0,0,0,0.35)" }}>
      <button type="button" onClick={() => { track("teams_primary_cta_click", { location: "sticky" }); scrollToId("qualify"); }}
        style={{ width: "100%", background: T.orange, color: T.white, fontWeight: 700, fontSize: "16px", padding: "14px", minHeight: "50px", border: "none", borderRadius: "50px", cursor: "pointer" }}>Discuss a Team Pilot</button>
    </div>
  );
}

// ----- Page -----
export default function Teams() {
  useEffect(() => {
    document.title = "AI Training for Teams | Personalised AI Workflows | AI For Every Role";
    upsertNamedMeta("description", "Help employees turn AI into practical improvements in their real work. Start with a personalised 5 person, 30 day AI productivity pilot with no long term commitment.");
    upsertNamedMeta("robots", "index, follow");
    upsertCanonical(CANONICAL_URL);
    upsertPropertyMeta("og:title", "AI Training for Teams | AI For Every Role");
    upsertPropertyMeta("og:description", "Personalised one to one AI workflow sessions for your team. Start with a 5 person, 30 day pilot.");
    upsertPropertyMeta("og:type", "website");
    upsertPropertyMeta("og:url", CANONICAL_URL);
    upsertPropertyMeta("og:image", PROD_ORIGIN + "/logo.png");
    upsertNamedMeta("twitter:card", "summary_large_image");
    upsertNamedMeta("twitter:title", "AI Training for Teams | AI For Every Role");
    upsertNamedMeta("twitter:description", "Personalised one to one AI workflow sessions for your team. Start with a 5 person, 30 day pilot.");
    upsertNamedMeta("twitter:image", PROD_ORIGIN + "/logo.png");
    track("teams_page_view");
    window.scrollTo({ top: 0, behavior: "auto" });
  }, []);
  return (
    <div style={{ fontFamily: T.font, background: T.navy, color: T.white }}>
      <TeamsHeader />
      <main>
        <Hero />
        <ProblemDiff />
        <HowItWorks />
        <PilotOffer />
        <Commitment />
        <UseCases />
        <Measurement />
        <Fit />
        <AfterPilot />
        <QualificationForm />
        <Faq />
        <FinalCta />
      </main>
      <TeamsFooter />
      <MobileSticky />
      <style>{"@media(min-width:769px){.teams-sticky{display:none!important}} @media(max-width:520px){.teams-navlink{display:none!important}}"}</style>
    </div>
  );
}
