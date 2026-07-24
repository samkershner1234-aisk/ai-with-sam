// Shared audit data + deterministic logic.
// Used by the frontend (src/audit) and the server route (api/ai-time-waste-audit.js).

export const SCHEMA_VERSION = 2;
export const AUDIT_PATH = "/ai-time-waste-audit";

export const CATEGORY_VALUES = [
  "writing",
  "research",
  "organisation",
  "meetings",
  "content",
  "analysis",
  "administration",
  "other",
];

export const WORK_TYPES = [
  "Employed professional",
  "Manager or team leader",
  "Business owner",
  "Freelancer or consultant",
  "Educator or trainer",
  "Student or job seeker",
  "Other",
];

export const TASK_CATEGORIES = [
  { value: "writing", label: "Writing emails, reports or documents" },
  { value: "research", label: "Researching or summarising information" },
  { value: "organisation", label: "Organising information or updating records" },
  { value: "meetings", label: "Preparing meetings or following up afterward" },
  { value: "content", label: "Creating presentations or content" },
  { value: "analysis", label: "Analysing information or preparing decisions" },
  { value: "administration", label: "Repeating administrative tasks" },
  { value: "other", label: "Something else" },
];

export const FREQUENCY_OPTIONS = [
  { label: "Several times a day", weeklyOccurrences: 21, monthlyOccurrences: 84 },
  { label: "About once a day", weeklyOccurrences: 7, monthlyOccurrences: 28 },
  { label: "Several times a week", weeklyOccurrences: 3, monthlyOccurrences: 12 },
  { label: "About once a week", weeklyOccurrences: 1, monthlyOccurrences: 4 },
  { label: "A few times a month", weeklyOccurrences: 1.25, monthlyOccurrences: 5 },
  { label: "Less than once a month", weeklyOccurrences: 0.125, monthlyOccurrences: 0.5 },
];

export const TIME_OPTIONS = [
  { label: "Less than 15 minutes", minutes: 5 },
  { label: "15-30 minutes", minutes: 20 },
  { label: "30-60 minutes", minutes: 45 },
  { label: "1-2 hours", minutes: 90 },
  { label: "2-4 hours", minutes: 180 },
  { label: "More than 4 hours", minutes: 300 },
];

export const FRUSTRATION_OPTIONS = [
  "It takes too long",
  "I repeat the same steps",
  "I never know where to start",
  "The quality is inconsistent",
  "It involves too much copying and pasting",
  "It creates delays for other people",
  "It drains my energy",
  "Something else",
];

export const EXPERIENCE_OPTIONS = [
  { label: "I have not tried AI for this task", value: "beginner" },
  { label: "I tried, but the results were not useful", value: "experimenting" },
  { label: "I use AI occasionally but without a clear process", value: "developing" },
  { label: "I already use AI but want a better system", value: "developing" },
  { label: "I am confident and mainly want optimisation", value: "confident" },
];

export const OUTCOME_OPTIONS = [
  "Saving time every week",
  "Producing better-quality work",
  "Feeling more confident with AI",
  "Reducing repetitive effort",
  "Responding or delivering faster",
  "Creating a process my team can use",
  "Reducing stress and mental load",
];

export const READINESS_LABELS = {
  beginner: "Ready to start",
  experimenting: "Ready for a clearer approach",
  developing: "Ready for a repeatable process",
  confident: "Ready to optimise",
};

export const READINESS_COPY = {
  beginner:
    "You do not need to learn every AI tool. Begin with one task you already understand and test a focused use case.",
  experimenting:
    "You have already tested AI. The next improvement is giving it better context, clearer instructions and a defined output.",
  developing:
    "You are already using AI occasionally. Your biggest opportunity is turning random use into a reliable method you can reuse.",
  confident:
    "You understand the basics. Your next opportunity is improving consistency, quality and efficiency around this specific task.",
};

export const RESULT_CONTENT = {
  writing: {
    title: "Recurring Written Work",
    diagnosis:
      "You appear to spend meaningful time producing similar written outputs. AI may help you create structured first drafts, reuse reliable formats and reduce the need to begin from a blank page each time.",
    aiHelp: [
      "Creating first drafts",
      "Reusing consistent structures",
      "Summarising notes",
      "Rewriting for clarity",
      "Adjusting tone",
    ],
    responsible: ["Accuracy", "Final wording", "Sensitive context", "Professional judgement"],
  },
  research: {
    title: "Research and Information Review",
    diagnosis:
      "You regularly gather, compare or summarise information. AI may help organise material, identify themes and create a useful starting summary while you verify the sources and make the final judgement.",
    aiHelp: [
      "Structuring research",
      "Comparing information",
      "Extracting themes",
      "Producing draft summaries",
      "Generating useful questions",
    ],
    responsible: ["Source verification", "Context", "Bias awareness", "Final conclusions"],
  },
  organisation: {
    title: "Information Organisation",
    diagnosis:
      "This task appears to involve moving, cleaning or restructuring information. AI may help standardise the format and reduce repeated manual organisation.",
    aiHelp: [
      "Categorising information",
      "Reformatting text",
      "Creating structured tables",
      "Extracting key details",
      "Standardising repeated outputs",
    ],
    responsible: ["Data privacy", "Final verification", "Access permissions", "Record accuracy"],
  },
  meetings: {
    title: "Meeting Preparation and Follow-Up",
    diagnosis:
      "You may be spending unnecessary time preparing for meetings or turning notes into actions afterward. AI can often help structure agendas, summaries and follow-up drafts.",
    aiHelp: [
      "Drafting agendas",
      "Summarising notes",
      "Extracting action items",
      "Drafting follow-up emails",
      "Organising decisions",
    ],
    responsible: ["Confirming commitments", "Sensitive discussions", "Relationship context", "Final communication"],
  },
  content: {
    title: "Content and Presentation Creation",
    diagnosis:
      "You repeatedly turn ideas or information into content. AI may help organise the message, create an outline and produce a stronger first draft.",
    aiHelp: [
      "Building outlines",
      "Structuring presentations",
      "Drafting content",
      "Generating alternatives",
      "Repurposing existing material",
    ],
    responsible: ["Original insight", "Brand voice", "Final design choices", "Factual accuracy"],
  },
  analysis: {
    title: "Analysis and Decision Support",
    diagnosis:
      "You are spending time interpreting information or preparing decisions. AI may help organise the evidence and expose patterns, but the final decision should remain yours.",
    aiHelp: [
      "Structuring comparisons",
      "Identifying patterns",
      "Generating questions",
      "Summarising options",
      "Testing assumptions",
    ],
    responsible: ["Final decisions", "Risk assessment", "Ethics", "Business context", "Data accuracy"],
  },
  administration: {
    title: "Repetitive Administrative Work",
    diagnosis:
      "This task appears to contain repeated steps and predictable outputs. That makes it a strong candidate for a reusable AI-assisted process.",
    aiHelp: [
      "Repeated drafting",
      "Extracting details",
      "Formatting information",
      "Creating checklists",
      "Standardising responses",
    ],
    responsible: ["Confidential information", "Approval", "Exception handling", "Final review"],
  },
  other: {
    title: "A Repetitive Work Opportunity",
    diagnosis:
      "The task you described appears to happen repeatedly and consume meaningful time. The next step is to map its inputs, repeated decisions and desired output before deciding where AI belongs.",
    aiHelp: [
      "Organising the starting information",
      "Identifying repeatable steps",
      "Producing a structured first draft",
      "Creating a reusable process",
    ],
    responsible: ["Accuracy", "Context", "Final judgement", "Sensitive information"],
  },
};

// ---------------------------------------------------------------------------
// Shared time calculation (single source of truth).
// Durations are stored in MINUTES. Weekly and monthly totals are calculated
// independently from their own occurrence counts, then each is rounded UP to a
// whole hour. No decimal hours are ever displayed. Never multiply a rounded
// weekly figure by four (that compounds rounding error).
// ---------------------------------------------------------------------------

export const ALLOWED_WEEKLY_OCCURRENCES = [21, 7, 3, 1, 1.25, 0.125];
export const ALLOWED_MONTHLY_OCCURRENCES = [84, 28, 12, 4, 5, 0.5];
export const ALLOWED_TIME_MINUTES = [5, 20, 45, 90, 180, 300];

// Round a minutes total up to whole hours.
export function ceilHours(minutes) {
  const m = Number(minutes);
  if (!isFinite(m) || m <= 0) return 0;
  return Math.ceil(m / 60);
}

// Build the human-readable display string for a whole-hour figure.
export function timeDisplay(minutes, unit) {
  const m = Number(minutes);
  const period = unit === "week" ? "per week" : "per month";
  if (!isFinite(m) || m < 60) return "Less than 1 hour " + period;
  return Math.ceil(m / 60) + "+ hours " + period;
}

// Core calculation. Accepts occurrence counts + minutes-per-occurrence.
export function computeTimeEstimate(weeklyOccurrences, monthlyOccurrences, timePerOccurrenceMinutes) {
  const wOcc = Number(weeklyOccurrences);
  const mOcc = Number(monthlyOccurrences);
  const mins = Number(timePerOccurrenceMinutes);
  const safe = (n) => (isFinite(n) && n >= 0 ? n : 0);

  const estimatedWeeklyMinutes = safe(wOcc) * safe(mins);
  const estimatedMonthlyMinutes = safe(mOcc) * safe(mins);
  const estimatedWeeklyHours = ceilHours(estimatedWeeklyMinutes);
  const estimatedMonthlyHours = ceilHours(estimatedMonthlyMinutes);

  return {
    weeklyOccurrences: safe(wOcc),
    monthlyOccurrences: safe(mOcc),
    timePerOccurrenceMinutes: safe(mins),
    estimatedWeeklyMinutes,
    estimatedMonthlyMinutes,
    estimatedWeeklyHours,
    estimatedMonthlyHours,
    estimatedWeeklyDisplay: timeDisplay(estimatedWeeklyMinutes, "week"),
    estimatedMonthlyDisplay: timeDisplay(estimatedMonthlyMinutes, "month"),
  };
}
