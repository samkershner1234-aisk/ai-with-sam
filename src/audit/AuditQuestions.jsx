import { useMemo, useRef, useState } from "react";
import {
  WORK_TYPES, TASK_CATEGORIES, FREQUENCY_OPTIONS, TIME_OPTIONS,
  FRUSTRATION_OPTIONS, EXPERIENCE_OPTIONS, OUTCOME_OPTIONS,
} from "./auditData";
import { T, Card, ProgressBar, OptionCard, PrimaryButton, SecondaryButton, useReducedMotion } from "./ui";

const TOTAL = 8;

function reducedNow() {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function QuestionFrame({ step, heading, helper, children, onBack, onNext, nextDisabled, headingRef, reduced }) {
  return (
    <div>
      <ProgressBar current={step} total={TOTAL} reduced={reduced} />
      <Card>
        <h2 ref={headingRef} tabIndex={-1} style={{ outline: "none", fontSize: "22px", fontWeight: 700, color: T.white, margin: "0 0 8px", lineHeight: 1.3 }}>
          {heading}
        </h2>
        {helper && <p style={{ color: T.greyDim, fontSize: "14px", margin: "0 0 18px" }}>{helper}</p>}
        <div style={{ marginTop: helper ? 0 : "14px" }}>{children}</div>
      </Card>
      <div style={{ display: "flex", gap: "12px", marginTop: "20px" }}>
        <SecondaryButton onClick={onBack} style={{ flex: "0 0 auto", minWidth: "110px" }}>Back</SecondaryButton>
        <div style={{ flex: 1 }}>
          <PrimaryButton onClick={onNext} disabled={nextDisabled}>Next</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default function AuditQuestions({ answers, setAnswers, onComplete, onBackToIntro }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(answers.__step || 1);
  const [error, setError] = useState("");
  const headingRef = useRef(null);

  const set = (patch) => setAnswers((prev) => ({ ...prev, ...patch }));
  const focusHeading = () => { if (headingRef.current) headingRef.current.focus(); };

  const goNext = () => {
    setError("");
    const target = step + 1;
    if (target > TOTAL) { onComplete(); return; }
    set({ __step: target });
    setStep(target);
    setTimeout(focusHeading, 0);
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" });
  };
  const goBack = () => {
    setError("");
    if (step === 1) { onBackToIntro(); return; }
    const target = step - 1;
    set({ __step: target });
    setStep(target);
    setTimeout(focusHeading, 0);
  };

  const single = (key, value, extra) => set({ [key]: value, ...(extra || {}) });

  const valid = useMemo(() => {
    switch (step) {
      case 1:
        if (!answers.workType) return false;
        if (answers.workType === "Other" && (!answers.workTypeOther || answers.workTypeOther.trim().length < 2)) return false;
        return true;
      case 2: return !!answers.taskCategory;
      case 3: return answers.taskDescription && answers.taskDescription.trim().length >= 10 && answers.taskDescription.length <= 300;
      case 4: return answers.monthlyFrequency != null;
      case 5: return answers.timePerOccurrenceHours != null;
      case 6: {
        const list = answers.frustrationReasons || [];
        if (list.length === 0) return false;
        if (list.includes("Something else") && (!answers.frustrationOther || answers.frustrationOther.trim().length < 2)) return false;
        return true;
      }
      case 7: return !!answers.readinessLevel;
      case 8: return !!answers.desiredOutcome;
      default: return false;
    }
  }, [step, answers]);

  const toggleFrustration = (opt) => {
    const list = answers.frustrationReasons || [];
    if (list.includes(opt)) { set({ frustrationReasons: list.filter((x) => x !== opt) }); setError(""); }
    else {
      if (list.length >= 3) { setError("You can choose up to three."); return; }
      set({ frustrationReasons: [...list, opt] }); setError("");
    }
  };

  const errStyle = { color: "#FCA5A5", fontSize: "13px", marginTop: "10px" };
  const fieldStyle = { width: "100%", background: T.panel, border: "2px solid " + T.border, borderRadius: "12px", padding: "14px", color: T.white, fontSize: "15px", fontFamily: T.font, minHeight: "48px", boxSizing: "border-box" };
  const attemptNext = () => { if (!valid) { setError("Please choose an answer to continue."); return; } goNext(); };

  return (
    <form onSubmit={(e) => { e.preventDefault(); attemptNext(); }}>
      {step === 1 && (
        <QuestionFrame reduced={reduced} step={1} heading="What best describes your current work?" helper="Choose the closest option." onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef}>
          {WORK_TYPES.map((w) => (<OptionCard key={w} selected={answers.workType === w} onClick={() => single("workType", w)}>{w}</OptionCard>))}
          {answers.workType === "Other" && (
            <div style={{ marginTop: "8px" }}>
              <label htmlFor="workTypeOther" style={{ display: "block", color: T.grey, fontSize: "14px", marginBottom: "6px" }}>Tell us briefly what you do</label>
              <input id="workTypeOther" style={fieldStyle} value={answers.workTypeOther || ""} maxLength={120} onChange={(e) => set({ workTypeOther: e.target.value })} />
            </div>
          )}
          {error && <div style={errStyle} aria-live="polite">{error}</div>}
        </QuestionFrame>
      )}
      {step === 2 && (
        <QuestionFrame reduced={reduced} step={2} heading="What kind of task takes up the most unnecessary time?" helper="Choose the closest match. You can describe the exact task next." onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef}>
          {TASK_CATEGORIES.map((c) => (<OptionCard key={c.value} selected={answers.taskCategory === c.value} onClick={() => single("taskCategory", c.value, { taskCategoryLabel: c.label })}>{c.label}</OptionCard>))}
          {error && <div style={errStyle} aria-live="polite">{error}</div>}
        </QuestionFrame>
      )}
      {step === 3 && (
        <QuestionFrame reduced={reduced} step={3} heading="What is the specific task?" helper="Describe it in one sentence. For example: Writing a weekly client update, or Turning meeting notes into follow-up emails." onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef}>
          <textarea id="taskDescription" aria-label="Describe the specific task" placeholder="I repeatedly spend time..." style={{ ...fieldStyle, minHeight: "110px", resize: "vertical" }} value={answers.taskDescription || ""} maxLength={300} onChange={(e) => set({ taskDescription: e.target.value })} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
            <span style={{ color: T.greyDim, fontSize: "12px" }}>Please describe the task without confidential or personally identifiable information.</span>
            <span style={{ color: T.greyDim, fontSize: "12px" }}>{(answers.taskDescription || "").length}/300</span>
          </div>
          {error && <div style={errStyle} aria-live="polite">{error}</div>}
        </QuestionFrame>
      )}
      {step === 4 && (
        <QuestionFrame reduced={reduced} step={4} heading="How often do you usually do this task?" onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef}>
          {FREQUENCY_OPTIONS.map((o) => (<OptionCard key={o.label} selected={answers.taskFrequencyLabel === o.label} onClick={() => single("taskFrequencyLabel", o.label, { monthlyFrequency: o.value })}>{o.label}</OptionCard>))}
          {error && <div style={errStyle} aria-live="polite">{error}</div>}
        </QuestionFrame>
      )}
      {step === 5 && (
        <QuestionFrame reduced={reduced} step={5} heading="How long does it normally take each time?" onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef}>
          {TIME_OPTIONS.map((o) => (<OptionCard key={o.label} selected={answers.timePerOccurrenceLabel === o.label} onClick={() => single("timePerOccurrenceLabel", o.label, { timePerOccurrenceHours: o.value })}>{o.label}</OptionCard>))}
          {error && <div style={errStyle} aria-live="polite">{error}</div>}
        </QuestionFrame>
      )}
      {step === 6 && (
        <QuestionFrame reduced={reduced} step={6} heading="What makes this task most frustrating?" helper="Choose up to three." onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef}>
          {FRUSTRATION_OPTIONS.map((o) => (<OptionCard key={o} selected={(answers.frustrationReasons || []).includes(o)} onClick={() => toggleFrustration(o)}>{o}</OptionCard>))}
          {(answers.frustrationReasons || []).includes("Something else") && (
            <div style={{ marginTop: "8px" }}>
              <label htmlFor="frustrationOther" style={{ display: "block", color: T.grey, fontSize: "14px", marginBottom: "6px" }}>Tell us briefly</label>
              <input id="frustrationOther" style={fieldStyle} value={answers.frustrationOther || ""} maxLength={120} onChange={(e) => set({ frustrationOther: e.target.value })} />
            </div>
          )}
          {error && <div style={errStyle} aria-live="polite">{error}</div>}
        </QuestionFrame>
      )}
      {step === 7 && (
        <QuestionFrame reduced={reduced} step={7} heading="Have you already tried using AI for this task?" onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef}>
          {EXPERIENCE_OPTIONS.map((o) => (<OptionCard key={o.label} selected={answers.aiExperienceLabel === o.label} onClick={() => single("aiExperienceLabel", o.label, { readinessLevel: o.value })}>{o.label}</OptionCard>))}
          {error && <div style={errStyle} aria-live="polite">{error}</div>}
        </QuestionFrame>
      )}
      {step === 8 && (
        <QuestionFrame reduced={reduced} step={8} heading="What would make improving this task worthwhile?" helper="Choose the result that matters most." onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef}>
          {OUTCOME_OPTIONS.map((o) => (<OptionCard key={o} selected={answers.desiredOutcome === o} onClick={() => single("desiredOutcome", o)}>{o}</OptionCard>))}
          {error && <div style={errStyle} aria-live="polite">{error}</div>}
        </QuestionFrame>
      )}
    </form>
  );
}
