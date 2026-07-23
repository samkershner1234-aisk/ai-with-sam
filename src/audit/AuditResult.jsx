import { useState } from "react";
import { RESULT_CONTENT, READINESS_LABELS, READINESS_COPY } from "./auditData";
import { T, Card, Eyebrow, PrimaryButton, SecondaryButton } from "./ui";
import { CTA_URL } from "../components/landing/constants";

function List({ items }) {
  return (
    <ul style={{ margin: "10px 0 0", paddingLeft: "18px", color: T.grey, fontSize: "14px", lineHeight: 1.7 }}>
      {items.map((x) => (<li key={x}>{x}</li>))}
    </ul>
  );
}

export function PartialResult({ answers, onContinue }) {
  const content = RESULT_CONTENT[answers.taskCategory] || RESULT_CONTENT.other;
  const desc = (answers.taskDescription || "").trim();
  const shortTask = desc.slice(0, 160);
  const readinessStart = {
    beginner: "You are starting fresh with this task.",
    experimenting: "You have already tested AI but need a clearer approach.",
    developing: "You are using AI occasionally and may benefit from a repeatable process.",
    confident: "You are ready to improve consistency and efficiency.",
  }[answers.readinessLevel] || "You are starting fresh with this task.";
  const labelStyle = { color: T.greyDim, fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "6px" };
  return (
    <div>
      <Eyebrow>We found your strongest opportunity</Eyebrow>
      <h1 style={{ fontSize: "28px", fontWeight: 800, color: T.white, margin: "0 0 20px", lineHeight: 1.25 }}> We've identified your strongest AI opportunity. See the full breakdown below. </h1> {desc && ( <Card style={{ marginBottom: "16px" }}> <div style={labelStyle}>The task you described</div> <div style={{ color: T.white, fontSize: "16px", lineHeight: 1.6 }}>{shortTask}</div> </Card> )}
      <Card style={{ marginTop: "8px" }}>
        <div style={{ color: T.white, fontWeight: 700, marginBottom: "10px" }}>Your full breakdown includes:</div>
        <List items={[
          "Why this task may be suitable for AI",
          "What AI may help with",
          "What should remain under your control",
          "A recommendation based on your current experience",
          "Three practical next steps",
        ]} />
      </Card>
      <div style={{ marginTop: "22px" }}>
        <PrimaryButton onClick={onContinue}>See My Personalised Next Steps</PrimaryButton>
      </div>
    </div>
  );
}

function ResponsibilityCards({ content }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px", marginTop: "10px" }}>
      <Card>
        <div style={{ color: T.orange, fontWeight: 700, marginBottom: "4px" }}>AI may help with</div>
        <List items={content.aiHelp} />
      </Card>
      <Card>
        <div style={{ color: T.white, fontWeight: 700, marginBottom: "4px" }}>You remain responsible for</div>
        <List items={content.responsible} />
      </Card>
    </div>
  );
}

export function FullResult({ answers, canonicalUrl, onRetake, onShare }) {
  const content = RESULT_CONTENT[answers.taskCategory] || RESULT_CONTENT.other;
  const [copied, setCopied] = useState(false);
  const firstName = answers.firstName || "There";
  const shortTask = (answers.taskDescription || "").trim().slice(0, 220) || (answers.taskCategoryLabel || content.title);
  const readinessLabel = READINESS_LABELS[answers.readinessLevel] || READINESS_LABELS.beginner;
  const readinessCopy = READINESS_COPY[answers.readinessLevel] || READINESS_COPY.beginner;

  const section = (title, children) => (
    <div style={{ marginTop: "28px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: T.white, margin: "0 0 10px" }}>{title}</h2>
      {children}
    </div>
  );

  const copyLink = async () => {
    try { await navigator.clipboard.writeText(canonicalUrl); setCopied(true); setTimeout(() => setCopied(false), 2000); onShare && onShare("copy"); }
    catch (e) { /* ignore */ }
  };
  const shareNative = async () => {
    const text = "I just completed this free AI Time-Waste Audit. It helps you identify which repetitive part of your job may be worth improving with AI: " + canonicalUrl;
    if (navigator.share) { try { await navigator.share({ title: "AI Time-Waste Audit", text, url: canonicalUrl }); onShare && onShare("native"); } catch (e) {} }
    else { copyLink(); }
  };
  const shareWhatsApp = () => {
    const text = "I just completed this free AI Time-Waste Audit. It helps you identify which repetitive part of your job may be worth improving with AI: " + canonicalUrl;
    window.open("https://wa.me/?text=" + encodeURIComponent(text), "_blank", "noopener,noreferrer");
    onShare && onShare("whatsapp");
  };

  return (
    <div>
      <div style={{ display: "inline-block", background: "rgba(249,115,22,0.12)", color: T.orange, fontWeight: 700, fontSize: "12px", letterSpacing: "1.2px", textTransform: "uppercase", padding: "6px 12px", borderRadius: "999px", marginBottom: "14px" }}>
        Your strongest AI opportunity
      </div>
      <h1 style={{ fontSize: "28px", fontWeight: 800, color: T.white, margin: "0 0 6px", lineHeight: 1.25 }}>
        {firstName}, your strongest opportunity is {content.title}.
      </h1>

      {section("Why this may be a good AI opportunity", ( <Card> <div style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7 }}>{content.diagnosis}</div> </Card> ))} {section("What AI may and may not do here", ( <Card> <div style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7 }}>AI may help with {content.aiHelp.join(", ")}.</div> <div style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7, marginTop: "8px" }}>You remain responsible for {content.responsible.join(", ")}.</div> </Card> ))}

      {section("Your current AI readiness", (
        <Card>
          <div style={{ color: T.orange, fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}>{readinessLabel}</div>
          <div style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7 }}>{readinessCopy}</div>
        </Card>
      ))}

      {section("Your best next step", ( <Card> <div style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7 }}>Do not try to automate your entire job. Start with this one task, defining the information you start with, the steps you repeat, and the result you need.</div> </Card> ))} {section("Want Help Building the Actual Solution?", ( <Card> <div style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7 }}> During a free 20-minute call, we will review this task and decide whether a personalised session is the right next step for you. </div> <div style={{ color: T.white, fontSize: "15px", lineHeight: 1.7, marginTop: "10px", fontWeight: 600 }}> You have already identified the task. Now let us map out the actual solution together. </div>
          <div style={{ marginTop: "16px" }}>
            <a href={CTA_URL} target="_blank" rel="noopener noreferrer" onClick={() => onShare && onShare("booking")}
               style={{ display: "block", textAlign: "center", background: T.orange, color: T.white, fontWeight: 700, fontSize: "16px", padding: "16px 24px", borderRadius: T.radiusPill, textDecoration: "none", minHeight: "48px", boxSizing: "border-box" }}>
              Book My Free 20-Minute Call
            </a>
          </div>
          <div style={{ color: T.greyDim, fontSize: "13px", marginTop: "12px" }}>
            Because each session is personally prepared, only a limited number of new clients can be supported each week.
          </div>
        </Card>
      ))}

      {section("Know Someone Else Losing Time to Repetitive Work?", (
        <Card>
          <div style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7, marginBottom: "14px" }}>
            Send them the free audit so they can identify where AI may help them first.
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            <SecondaryButton onClick={copyLink} style={{ flex: "1 1 auto" }}>{copied ? "Link copied" : "Copy audit link"}</SecondaryButton>
            {typeof navigator !== "undefined" && navigator.share && (
              <SecondaryButton onClick={shareNative} style={{ flex: "1 1 auto" }}>Share</SecondaryButton>
            )}
            <SecondaryButton onClick={shareWhatsApp} style={{ flex: "1 1 auto" }}>Share on WhatsApp</SecondaryButton>
          </div>
        </Card>
      ))}

      <div style={{ marginTop: "28px", textAlign: "center" }}>
        <button type="button" onClick={onRetake} style={{ background: "none", border: "none", color: T.greyDim, fontSize: "14px", textDecoration: "underline", cursor: "pointer" }}>
          Retake the Audit
        </button>
      </div>
    </div>
  );
}
