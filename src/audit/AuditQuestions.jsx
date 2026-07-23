import { useMemo, useRef, useState } from "react";
import {
  TASK_CATEGORIES, FREQUENCY_OPTIONS, TIME_OPTIONS, EXPERIENCE_OPTIONS,
  computeMonthlyHours, mapMonthlyRange,
} from "./auditData";
import { T, Card, ProgressBar, OptionCard, PrimaryButton, SecondaryButton, useReducedMotion } from "./ui";

const TOTAL = 4;
const MAX_DESC = 300;

function QuestionFrame({ step, heading, helper, children, onBack, onNext, nextDisabled, headingRef, reduced, error }) {
  return (
    <div>
      <ProgressBar current={step} total={TOTAL} reduced={reduced} />
      <Card>
        <h2 ref={headingRef} tabIndex={-1} style={{ outline: "none", fontSize: "22px", fontWeight: 700, color: T.white, margin: "0 0 8px", lineHeight: 1.3 }}>
          {heading}
        </h2>
        {helper && <p style={{ color: T.greyDim, fontSize: "14px", margin: "0 0 16px" }}>{helper}</p>}
        <div style={{ marginTop: helper ? 0 : "12px" }}>{children}</div>
        {error && <p role="alert" style={{ color: "#FCA5A5", fontSize: "13px", marginTop: "12px" }}>{error}</p>}
      </Card>
      <div style={{ display: "flex", gap: "12px", marginTop: "22px" }}>
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
        <div style={{ flex: "1 1 auto" }}>
          <PrimaryButton type="submit" disabled={nextDisabled} onClick={onNext}>Next</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function ValueCard({ range, onBack, onContinue, headingRef, reduced }) {
  return (
    <div>
      <ProgressBar current={3} total={TOTAL} reduced={reduced} />
      <Card>
        <div style={{ color: T.greyDim, fontSize: "13px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Based on your answers...</div>
        <h2 ref={headingRef} tabIndex={-1} style={{ outline: "none", fontSize: "20px", fontWeight: 700, color: T.white, margin: "0 0 10px", lineHeight: 1.4 }}>
          This task may currently take <span style={{ color: T.orange }}>{range}</span>.
        </h2>
        <p style={{ color: T.grey, fontSize: "15px", lineHeight: 1.7, margin: 0 }}>
          That makes it worth checking whether a clearer AI-assisted process could reduce repeated effort.
        </p>
      </Card>
      <div style={{ display: "flex", gap: "12px", marginTop: "22px" }}>
        <SecondaryButton onClick={onBack}>Back</SecondaryButton>
        <div style={{ flex: "1 1 auto" }}>
          <PrimaryButton type="button" onClick={onContinue}>Continue</PrimaryButton>
        </div>
      </div>
    </div>
  );
}

export default function AuditQuestions({ answers, setAnswers, onComplete, onBackToIntro }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(answers.__step || 1);
  const [showValue, setShowValue] = useState(false);
  const [error, setError] = useState("");
  const headingRef = useRef(null);

  const set = (patch) => setAnswers((prev) => ({ ...prev, ...patch }));
  const focusHeading = () => { if (headingRef.current) headingRef.current.focus(); };
  const scrollTop = () => { if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: reduced ? "auto" : "smooth" }); };

  const estimatedRange = useMemo(() => {
    const hours = computeMonthlyHours(answers.monthlyFrequency, answers.timePerOccurrenceHours);
    return mapMonthlyRange(hours);
  }, [answers.monthlyFrequency, answers.timePerOccurrenceHours]);

  const valid = useMemo(() => {
    switch (step) {
      case 1: {
        if (!answers.taskCategory) return false;
        if (answers.taskCategory === "other") {
          return !!(answers.taskDescription && answers.taskDescription.trim().length >= 3);
        }
        return true;
      }
      case 2: return answers.monthlyFrequency != null;
      case 3: return answers.timePerOccurrenceHours != null;
      case 4: return !!answers.readinessLevel;
      default: return false;
    }
  }, [step, answers]);

  const goNext = () => {
    setError("");
    if (step === 3) { setShowValue(true); setStep(4); set({ __step: 4 }); setTimeout(focusHeading, 0); scrollTop(); return; }
    const target = step + 1;
    if (target > TOTAL) { onComplete(); return; }
    set({ __step: target });
    setStep(target);
    setTimeout(focusHeading, 0);
    scrollTop();
  };
  const goBack = () => {
    setError("");
    if (showValue) { setShowValue(false); setStep(3); set({ __step: 3 }); setTimeout(focusHeading, 0); scrollTop(); return; }
    if (step === 1) { onBackToIntro(); return; }
    const target = step - 1;
    set({ __step: target });
    setStep(target);
    setTimeout(focusHeading, 0);
    scrollTop();
  };
  const continueFromValue = () => {
    setShowValue(false);
    setStep(4);
    set({ __step: 4 });
    setTimeout(focusHeading, 0);
    scrollTop();
  };

  const attemptNext = () => { if (!valid) { setError("Please choose an answer to continue."); return; } goNext(); };

  const selectCategory = (opt) => { set({ taskCategory: opt.value, taskCategoryLabel: opt.label }); setError(""); };
  const selectFrequency = (opt) => { set({ monthlyFrequency: opt.value, taskFrequencyLabel: opt.label }); setError(""); };
  const selectTime = (opt) => { set({ timePerOccurrenceHours: opt.value, timePerOccurrenceLabel: opt.label }); setError(""); };
  const selectExperience = (opt) => { set({ readinessLevel: opt.value, aiExperienceLabel: opt.label }); setError(""); };

  const descLen = (answers.taskDescription || "").length;
  const descRequired = answers.taskCategory === "other";

  if (showValue) {
    return <ValueCard range={estimatedRange} onBack={goBack} onContinue={continueFromValue} headingRef={headingRef} reduced={reduced} />;
  }

  return (
    <form onSubmit={(e) => { e.preventDefault(); attemptNext(); }}>
      {step === 1 && (
        <QuestionFrame step={1} heading="Which repetitive task takes up the most unnecessary time?" helper="Choose the closest match." onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef} reduced={reduced} error={error}>
          <div role="group" aria-label="Task categories">
            {TASK_CATEGORIES.map((opt) => (
              <OptionCard key={opt.value} selected={answers.taskCategory === opt.value} onClick={() => selectCategory(opt)}>{opt.label}</OptionCard>
            ))}
          </div>
          {answers.taskCategory && (
            <div style={{ marginTop: "18px" }}>
              <label htmlFor="audit-task-desc" style={{ display: "block", color: T.grey, fontSize: "14px", marginBottom: "6px", fontWeight: 600 }}>
                {descRequired ? "Describe the task in one sentence." : "Optional: describe the task in one sentence for a more personalised result."}
              </label>
              <textarea
                id="audit-task-desc"
                value={answers.taskDescription || ""}
                maxLength={MAX_DESC}
                rows={3}
                onChange={(e) => { set({ taskDescription: e.target.value.slice(0, MAX_DESC) }); setError(""); }}
                placeholder="Writing a weekly client update, or Turning meeting notes into follow-up emails"
                style={{ width: "100%", background: T.panel, border: "2px solid " + T.border, borderRadius: "12px", padding: "14px", color: T.white, fontSize: "15px", fontFamily: T.font, minHeight: "84px", boxSizing: "border-box", resize: "vertical" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px" }}>
                <span style={{ color: T.greyDim, fontSize: "12px" }}>Please do not include confidential or personally identifiable information.</span>
                <span style={{ color: T.greyDim, fontSize: "12px" }}>{descLen}/{MAX_DESC}</span>
              </div>
            </div>
          )}
        </QuestionFrame>
      )}

      {step === 2 && (
        <QuestionFrame step={2} heading="How often do you usually do this task?" onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef} reduced={reduced} error={error}>
          <div role="group" aria-label="Task frequency">
            {FREQUENCY_OPTIONS.map((opt) => (
              <OptionCard key={opt.label} selected={answers.monthlyFrequency === opt.value} onClick={() => selectFrequency(opt)}>{opt.label}</OptionCard>
            ))}
          </div>
        </QuestionFrame>
      )}

      {step === 3 && (
        <QuestionFrame step={3} heading="How long does it normally take each time?" onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef} reduced={reduced} error={error}>
          <div role="group" aria-label="Time per task">
            {TIME_OPTIONS.map((opt) => (
              <OptionCard key={opt.label} selected={answers.timePerOccurrenceHours === opt.value} onClick={() => selectTime(opt)}>{opt.label}</OptionCard>
            ))}
          </div>
        </QuestionFrame>
      )}

      {step === 4 && (
        <QuestionFrame step={4} heading="What have you tried with AI for this task so far?" helper="Choose the closest answer." onBack={goBack} onNext={attemptNext} nextDisabled={!valid} headingRef={headingRef} reduced={reduced} error={error}>
          <div role="group" aria-label="AI experience">
            {EXPERIENCE_OPTIONS.map((opt) => (
              <OptionCard key={opt.label} selected={answers.aiExperienceLabel === opt.label} onClick={() => selectExperience(opt)}>{opt.label}</OptionCard>
            ))}
          </div>
        </QuestionFrame>
      )}
    </form>
  );
}
