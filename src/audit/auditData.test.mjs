// Dependency-free tests for the shared audit time calculation.
// Run with:  node src/audit/auditData.test.mjs
// Verifies the whole-hour, minute-based, independent weekly/monthly logic.

import assert from "node:assert";
import {
  FREQUENCY_OPTIONS,
  TIME_OPTIONS,
  computeTimeEstimate,
  timeDisplay,
  ceilHours,
  ALLOWED_WEEKLY_OCCURRENCES,
  ALLOWED_MONTHLY_OCCURRENCES,
  ALLOWED_TIME_MINUTES,
} from "./auditData.js";

let passed = 0;
function ok(name, cond) { assert.ok(cond, "FAILED: " + name); passed++; }
function eq(name, a, b) { assert.strictEqual(a, b, "FAILED: " + name + " (got " + a + ", expected " + b + ")"); passed++; }

const freq = (label) => FREQUENCY_OPTIONS.find((o) => o.label === label);
eq("Several times a day -> 21/week", freq("Several times a day").weeklyOccurrences, 21);
eq("Several times a day -> 84/month", freq("Several times a day").monthlyOccurrences, 84);
eq("About once a day -> 7/week", freq("About once a day").weeklyOccurrences, 7);
eq("About once a day -> 28/month", freq("About once a day").monthlyOccurrences, 28);
eq("Several times a week -> 3/week", freq("Several times a week").weeklyOccurrences, 3);
eq("Several times a week -> 12/month", freq("Several times a week").monthlyOccurrences, 12);
eq("About once a week -> 1/week", freq("About once a week").weeklyOccurrences, 1);
eq("About once a week -> 4/month", freq("About once a week").monthlyOccurrences, 4);
eq("A few times a month -> 1.25/week", freq("A few times a month").weeklyOccurrences, 1.25);
eq("A few times a month -> 5/month", freq("A few times a month").monthlyOccurrences, 5);
eq("Less than once a month -> 0.125/week", freq("Less than once a month").weeklyOccurrences, 0.125);
eq("Less than once a month -> 0.5/month", freq("Less than once a month").monthlyOccurrences, 0.5);

const dur = (label) => TIME_OPTIONS.find((o) => o.label === label);
eq("Less than 15 minutes -> 5", dur("Less than 15 minutes").minutes, 5);
eq("15-30 minutes -> 20", dur("15-30 minutes").minutes, 20);
eq("30-60 minutes -> 45", dur("30-60 minutes").minutes, 45);
eq("1-2 hours -> 90", dur("1-2 hours").minutes, 90);
eq("2-4 hours -> 180", dur("2-4 hours").minutes, 180);
eq("More than 4 hours -> 300", dur("More than 4 hours").minutes, 300);

eq("100 min -> 2h", ceilHours(100), 2);
eq("450 min -> 8h", ceilHours(450), 8);
eq("552 min -> 10h", ceilHours(552), 10);
eq("2400 min -> 40h", ceilHours(2400), 40);
eq("0 min -> 0h", ceilHours(0), 0);

eq(">=1h weekly shows plus", timeDisplay(10, "week"), "10+ hours per week");
eq(">=1h monthly shows plus", timeDisplay(40, "month"), "40+ hours per month");
eq("<1h weekly less-than", timeDisplay(0, "week"), "Less than 1 hour per week");
eq("<1h monthly less-than", timeDisplay(0, "month"), "Less than 1 hour per month");
ok("no 0+ output", !timeDisplay(0, "week").includes("0+"));

const e1 = computeTimeEstimate(21, 84, 90);
eq("e1 weekly hours", e1.estimatedWeeklyHours, 32);
eq("e1 monthly hours", e1.estimatedMonthlyHours, 126);
eq("e1 weekly display", e1.estimatedWeeklyDisplay, "32+ hours per week");
eq("e1 monthly display", e1.estimatedMonthlyDisplay, "126+ hours per month");
ok("e1 weekly != monthly/4", e1.estimatedWeeklyHours !== Math.round(e1.estimatedMonthlyHours / 4));

const e2 = computeTimeEstimate(0.125, 0.5, 5);
eq("e2 weekly <1h", e2.estimatedWeeklyDisplay, "Less than 1 hour per week");
eq("e2 monthly <1h", e2.estimatedMonthlyDisplay, "Less than 1 hour per month");

const e3 = computeTimeEstimate(7, 28, 45);
eq("e3 weekly whole", e3.estimatedWeeklyHours, 6);
eq("e3 monthly whole", e3.estimatedMonthlyHours, 21);
ok("e3 no decimals", !/[0-9]\.[0-9]/.test(e3.estimatedWeeklyDisplay + e3.estimatedMonthlyDisplay));

FREQUENCY_OPTIONS.forEach((o) => {
  ok("weekly allow-list " + o.label, ALLOWED_WEEKLY_OCCURRENCES.includes(o.weeklyOccurrences));
  ok("monthly allow-list " + o.label, ALLOWED_MONTHLY_OCCURRENCES.includes(o.monthlyOccurrences));
});
TIME_OPTIONS.forEach((o) => {
  ok("minute allow-list " + o.label, ALLOWED_TIME_MINUTES.includes(o.minutes));
});

console.log("All " + passed + " audit calculation tests passed.");
