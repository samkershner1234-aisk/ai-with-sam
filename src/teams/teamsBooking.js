import { TEAM_BOOKING_URL } from "../components/landing/constants";

// Single source of truth for the qualification form options and the Calendly
// prefill mapping. Team option indexes map directly to the a4 checkbox order
// configured on the dedicated Calendly Team Call event.
export const TEAM_OPTIONS = [
  { index: 1, label: "Marketing" },
  { index: 2, label: "Sales" },
  { index: 3, label: "Operations" },
  { index: 4, label: "HR and Recruiting" },
  { index: 5, label: "Customer Success" },
  { index: 6, label: "Leadership" },
  { index: 7, label: "Other or Multiple Teams" },
];

export const COMPANY_SIZE_OPTIONS = [
  "1 to 24",
  "25 to 49",
  "50 to 99",
  "100 to 249",
  "250 or more",
];

export const PARTICIPANT_OPTIONS = [
  "1 to 5",
  "6 to 10",
  "11 to 20",
  "21 to 50",
  "More than 50",
];

// Build the fully prefilled Calendly Team Call URL from validated form fields.
// fields: { name, email, company, companySize, participantCount, teamIndexes:number[], mainGoal }
// teamIndexes are the numeric a4 checkbox indexes; they are joined with a comma
// and URLSearchParams handles encoding (comma and spaces both accepted by Calendly).
export function buildTeamBookingUrl(fields) {
  const f = fields || {};
  const params = new URLSearchParams();
  if (f.name) params.set("name", String(f.name).trim());
  if (f.email) params.set("email", String(f.email).trim());
  if (f.company) params.set("a1", String(f.company).trim());
  if (f.companySize) params.set("a2", String(f.companySize).trim());
  if (f.participantCount) params.set("a3", String(f.participantCount).trim());
  const indexes = Array.isArray(f.teamIndexes)
    ? f.teamIndexes.filter((n) => Number.isFinite(n)).sort((a, b) => a - b)
    : [];
  if (indexes.length) params.set("a4", indexes.join(","));
  if (f.mainGoal) params.set("a5", String(f.mainGoal).trim());
  const qs = params.toString();
  return qs ? TEAM_BOOKING_URL + "?" + qs : TEAM_BOOKING_URL;
}
