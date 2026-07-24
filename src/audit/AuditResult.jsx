import { useState } from "react";
import { RESULT_CONTENT, READINESS_LABELS, READINESS_COPY } from "./auditData";
import { T, Card, Eyebrow, PrimaryButton, SecondaryButton } from "./ui";
import { CTA_URL } from "../components/landing/constants";

function esc(s) {
  return String(s == null ? "" : s);
}

function CheckList({ items }) {
  return (
    <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, color: T.grey, fontSize: "15px", lineHeight: 1.7 }}>
      {items.map((x) => (
        <li key={x} style={{ display: "flex", gap: "10px", marginBottom: "8px" }}>
          <span aria-hidden="true" style={{ color: T.orange, fontWeight: 800 }}>&#10003;</span>
          <span>{x}</span>
        </li>
      ))}
    </ul>
  );
}

function TimeEstimate({ weeklyDisplay, monthlyDisplay }) {
  return (
    <div>
      <p style={{ color: T.grey, fontSize: "15px", lineHeight: 1.5, margin: "0 0 8px" }}>
        This task may currently take approximately
      </p>
      <p style={{ color: T.orange, fontSize: "26px", fontWeight: 800, lineHeight: 1.2, margin: "0 0 4px" }}>
        {weeklyDisplay}
      </p>
      <p style={{ color: T.grey, fontSize: "17px", fontWeight: 600, lineHeight: 1.3, margin: 0 }}>
        ({monthlyDisplay}).
      </p>
    </div>
  );
}

export function PartialResult({ answers, onContinue }) {
  const content = RESULT_CONTENT[answers.taskCategory] || RESULT_CONTENT.other;
  const desc = (answers.taskDescription || "").trim();
  const categoryLabel = answers.taskCategoryLabel || content.title;
  const startingPoint = {
    beginner: "You have not yet tried AI for this task.",
    experimenting: "You have tried AI, but the results have not been useful enough.",
    developing: "You use AI occasionally but do not yet have a repeatable process.",
    confident: "You already use AI and are ready to improve the system.",
  }[answers.readinessLevel] || "You have not yet tried AI for this task.";

  const item = { marginTop: "16px" };
  const itemLabel = { color: T.greyDim, fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" };
  const itemValue = { color: T.white, fontSize: "16px", lineHeight: 1.5 };

  return (
    <div>
      <Eyebrow>We found your strongest opportunity</Eyebrow>
      <h1 style={{ fontSize: "28px", fontWeight: 800, color: T.white, margin: "0 0 12px", lineHeight: 1.25 }}>
        This task may be costing you more time than you realise.
      </h1>
      <p style={{ color: T.grey, fontSize: "16px", lineHeight: 1.7, marginBottom: "22px" }}>
        Based on your answers, this looks like a strong opportunity to use AI more effectively without changing your entire way of working.
      </p>

      <Card>
        <div style={item}>
          <div style={itemLabel}>Your task area</div>
          <div style={itemValue}>{esc(categoryLabel)}</div>
        </div>
        {desc && (
          <div style={item}>
            <div style={itemLabel}>The task you described</div>
            <div style={itemValue}>{esc(desc)}</div>
          </div>
        )}
        <div style={item}>
          <div style={itemLabel}>Estimated time spent</div>
          <div style={{ marginTop: "6px" }}>
            <TimeEstimate weeklyDisplay={answers.estimatedWeeklyDisplay} monthlyDisplay={answers.estimatedMonthlyDisplay} />
          </div>
        </div>
        <div style={item}>
          <div style={itemLabel}>Your current AI starting point</div>
          <div style={itemValue}>{startingPoint}</div>
        </div>
      </Card>

      <div style={{ marginTop: "26px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: 700, color: T.white, margin: "0 0 6px" }}>
          Your personalised breakdown will show you:
        </h2>
        <CheckList
          items={[
            "Why this task may be a strong AI opportunity",
            "Where AI could help most",
            "What should stay under your control",
            "The best starting point for your current experience",
            "Three practical steps to take next",
          ]}
        />
      </div>

      <div style={{ marginTop: "28px" }}>
        <h2 style={{ fontSize: "20px", fontWeight: 800, color: T.white, margin: "0 0 6px" }}>
          See Your Personalised Breakdown
        </h2>
        <p style={{ color: T.grey, fontSize: "15px", lineHeight: 1.6, marginBottom: "18px" }}>
          Enter your details to view your complete result and recommended next steps.
        </p>
        <PrimaryButton onClick={onContinue}>See My Personalised Next Steps</PrimaryButton>
      </div>
    </div>
  );
}

export function FullResult({ answers, canonicalUrl, onRetake, onShare }) {
  const content = RESULT_CONTENT[answers.taskCategory] || RESULT_CONTENT.other;
  const [copied, setCopied] = useState(false);
  const firstName = answers.firstName || "There";
  const desc = (answers.taskDescription || "").trim();
  const identifiedTask = desc || (answers.taskCategoryLabel || content.title);
  const readinessLabel = READINESS_LABELS[answers.readinessLevel] || READINESS_LABELS.beginner;
  const readinessCopy = READINESS_COPY[answers.readinessLevel] || READINESS_COPY.beginner;

  const section = (title, children) => (
    <div style={{ marginTop: "28px" }}>
      <h2 style={{ fontSize: "20px", fontWeight: 700, color: T.white, margin: "0 0 10px" }}>{title}</h2>
      {children}
    </div>
  );

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(canonicalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) { /* ignore */ }
  };

  const shareMessage = "I just did this free 2-minute AI Time-Waste Audit and it showed where AI could save me time. Worth a look:";
  const shareNative = async () => {
    if (onShare) onShare("native");
    try {
      if (typeof navigator !== "undefined" && navigator.share) {
        await navigator.share({ title: "AI Time-Waste Audit", text: shareMessage, url: canonicalUrl });
      } else {
        await copyLink();
      }
    } catch (e) { /* user cancelled or unsupported */ }
  };
  const shareWhatsApp = () => {
    if (onShare) onShare("whatsapp");
    if (typeof window !== "undefined") {
      window.open("https://wa.me/?text=" + encodeURIComponent(shareMessage + " " + canonicalUrl), "_blank", "noopener,noreferrer");
    }
  };

  const cardText = { color: T.grey, fontSize: "15px", lineHeight: 1.7 };

  return (
    <div>
      <div ref={(el) => { if (el) el.focus(); }} tabIndex={-1} style={{ outline: "none" }}>
        <div style={{ display: "inline-block", background: "rgba(255,116,23,0.12)", color: T.orange, fontSize: "12px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", padding: "6px 12px", borderRadius: "999px", marginBottom: "14px" }}>
          Your personalised breakdown
        </div>
        <h1 style={{ fontSize: "30px", fontWeight: 800, color: T.white, margin: "0 0 10px", lineHeight: 1.2 }}>
          {esc(firstName)}, here is your strongest AI opportunity.
        </h1>
        <p style={{ color: T.grey, fontSize: "16px", lineHeight: 1.7, margin: 0 }}>
          You have already identified the task. Now you can see where AI may help and what to do next.
        </p>
      </div>

      <div style={{ marginTop: "20px" }}>
        <div style={{ color: T.greyDim, fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.5px", marginBottom: "4px" }}>Your strongest AI opportunity</div>
        <div style={{ fontSize: "22px", fontWeight: 800, color: T.orange }}>{content.title}</div>
      </div>

      {section("The task you identified", (
        <Card>
          <div style={cardText}>{esc(identifiedTask)}</div>
        </Card>
      ))}

      {section("This task may be taking more time than it appears", (
        <Card>
          <TimeEstimate weeklyDisplay={answers.estimatedWeeklyDisplay} monthlyDisplay={answers.estimatedMonthlyDisplay} />
          <p style={{ color: T.greyDim, fontSize: "13px", lineHeight: 1.6, margin: "14px 0 0" }}>
            This is an estimate based on your answers, not a guaranteed saving.
          </p>
        </Card>
      ))}

      {section("Why this may be a good AI opportunity", (
        <Card>
          <div style={cardText}>{content.diagnosis}</div>
        </Card>
      ))}

      <div style={{ marginTop: "28px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "16px" }}>
        <Card>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: T.white, margin: "0 0 10px" }}>AI may help with</h3>
          <ul style={{ margin: 0, paddingLeft: "18px", color: T.grey, fontSize: "14px", lineHeight: 1.7 }}>
            {content.aiHelp.slice(0, 5).map((x) => (<li key={x}>{x}</li>))}
          </ul>
        </Card>
        <Card>
          <h3 style={{ fontSize: "16px", fontWeight: 700, color: T.white, margin: "0 0 10px" }}>You remain responsible for</h3>
          <ul style={{ margin: 0, paddingLeft: "18px", color: T.grey, fontSize: "14px", lineHeight: 1.7 }}>
            {content.responsible.slice(0, 5).map((x) => (<li key={x}>{x}</li>))}
          </ul>
        </Card>
      </div>

      {section("Your current starting point", (
        <Card>
          <div style={{ color: T.orange, fontWeight: 700, fontSize: "16px", marginBottom: "6px" }}>{readinessLabel}</div>
          <div style={cardText}>{readinessCopy}</div>
        </Card>
      ))}

      {section("Your next three steps", (
        <Card>
          <p style={{ color: T.grey, fontSize: "15px", lineHeight: 1.6, margin: "0 0 12px" }}>
            Do not try to automate your entire job. Start with this one task.
          </p>
          <ol style={{ margin: 0, paddingLeft: "18px", color: T.grey, fontSize: "15px", lineHeight: 1.8 }}>
            <li>Gather two or three examples of the work.</li>
            <li>Identify the structure or decisions that repeat.</li>
            <li>Define what a good final result should look like.</li>
          </ol>
        </Card>
      ))}

      {section("Want Help Building the Actual Process?", (
        <Card>
          <p style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7, margin: "0 0 12px" }}>
            During a free 20-minute call, we&rsquo;ll review the task you identified and decide whether a personalised AI Clarity Session is the right next step.
          </p>
          <p style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7, margin: "0 0 12px" }}>
            If it is a good fit, the paid 60-minute session focuses on turning one real task into a clear AI-powered process you can start using with confidence.
          </p>
          <p style={{ color: T.white, fontSize: "15px", fontWeight: 600, lineHeight: 1.7, margin: "0 0 16px" }}>
            You have identified the opportunity. The next step is deciding what the solution should look like.
          </p>
          <a href={CTA_URL} target="_blank" rel="noopener noreferrer" onClick={() => onShare && onShare("booking")}
            style={{ display: "inline-block", background: T.orange, color: "#fff", fontWeight: 700, fontSize: "16px", padding: "14px 24px", borderRadius: "999px", textDecoration: "none" }}>
            Book My Free 20-Minute Call
          </a>
          <p style={{ color: T.greyDim, fontSize: "13px", lineHeight: 1.6, margin: "14px 0 0" }}>
            Because every call is personally prepared, only a limited number are available each week.
          </p>
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
