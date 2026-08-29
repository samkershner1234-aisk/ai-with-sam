// Post-build step: creates lightweight static HTML snapshots for the public
// marketing routes (/teams, /ai-time-waste-audit and /privacy) so crawlers and
// other tools that do not execute JavaScript see correct, unique titles, meta
// descriptions, canonical tags and real page content for each route.
//
// This does not change how the app works for real visitors. React still
// mounts into #root with createRoot(...).render() (not hydrateRoot), so the
// static content below is simply replaced the moment the app loads.
//
// Every step here is defensive: if anything unexpected happens, this script
// logs a warning and exits without a failing status code, so it can never
// break the Vercel build (see the "|| true" safety net in package.json).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";

const DIST_DIR = path.resolve(process.cwd(), "dist");
const ORIGIN = "https://www.aiforeveryrole.com";

const ROUTES = [
  {
    urlPath: "/teams",
    dir: "teams",
    title: "AI Training & Implementation for Teams | AI With Sam",
    description: "A practical AI implementation pilot for employees. Build role-specific workflows around real work, support adoption and measure what actually gets used.",
    content: [
      "<h1>Make AI Useful Across Your Team</h1>",
      "<p>Start with a 30-day implementation pilot for 5 employees. We identify useful workflows, build them around each person's actual work, support adoption and measure what gets used.</p>",
      "<h2>What Each Employee Gets</h2>",
      "<p>Five personalised one-to-one sessions built around real recurring work, a personalised prompt kit, session resources and 30 days of WhatsApp implementation support.</p>",
      "<h2>How the Pilot Works</h2>",
      "<p>We start by understanding where the team loses time, build personalised workflows with each participant, support employees as they apply what was built, then review what worked and what is worth expanding.</p>",
      "<h2>Pricing</h2>",
      "<p>5,000 ILS / 1,500 USD / 1,250 GBP for the 30 day, 5 employee pilot, with no long term commitment.</p>"
    ].join("")
  },
  {
    urlPath: "/ai-time-waste-audit",
    dir: "ai-time-waste-audit",
    title: "Free AI Time-Waste Audit | AI With Sam",
    description: "Find the repetitive work costing you the most time and get personalised ideas for where AI could help. Free and takes about 60 seconds.",
    content: [
      "<h1>Which Part of Your Job Should You Use AI For First?</h1>",
      "<p>Answer four quick questions and discover where AI may help you reduce unnecessary repetitive work. Free, and takes about 60 seconds.</p>"
    ].join("")
  },
  {
    urlPath: "/privacy",
    dir: "privacy",
    title: "Privacy Policy | AI With Sam",
    description: "Privacy notice explaining how AI With Sam collects and uses limited professional contact information for business-to-business communications.",
    content: [
      "<h1>Privacy Notice</h1>",
      "<p>AI For Every Role uses limited professional contact information, such as your name, job title, company and business email address, to contact relevant professionals about our services.</p>",
      "<p>We only use this information for relevant business-to-business communications and do not sell your personal information.</p>",
      "<p>You have the right to object to your information being used for direct marketing at any time. To opt out, reply to any email asking not to be contacted.</p>"
    ].join("")
  }
];

function escapeAttr(value) {
  return String(value).replace(/"/g, "&quot;");
}

function buildRouteHtml(baseHtml, route) {
  let html = baseHtml;
  const canonicalUrl = ORIGIN + route.urlPath;
  const title = escapeAttr(route.title);
  const description = escapeAttr(route.description);

  html = html.replace(/<title>[\s\S]*?<\/title>/, "<title>" + route.title + "</title>");
  html = html.replace(/<meta name="description" content="[^"]*"\s*\/>/, "<meta name=\"description\" content=\"" + description + "\" />");
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/>/, "<link rel=\"canonical\" href=\"" + canonicalUrl + "\" />");
  html = html.replace(/<meta property="og:title" content="[^"]*"\s*\/>/, "<meta property=\"og:title\" content=\"" + title + "\" />");
  html = html.replace(/<meta property="og:description" content="[^"]*"\s*\/>/, "<meta property=\"og:description\" content=\"" + description + "\" />");
  html = html.replace(/<meta property="og:url" content="[^"]*"\s*\/>/, "<meta property=\"og:url\" content=\"" + canonicalUrl + "\" />");
  html = html.replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, "<meta name=\"twitter:title\" content=\"" + title + "\" />");
  html = html.replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, "<meta name=\"twitter:description\" content=\"" + description + "\" />");

  const placeholderStyle = "font-family:'Inter',sans-serif;background:#0F172A;color:#E2E8F0;max-width:720px;margin:0 auto;padding:48px 24px;line-height:1.6;";
  const wrappedContent = "<div id=\"prerender-fallback\" style=\"" + placeholderStyle + "\">" + route.content + "</div>";
  html = html.replace("<div id=\"root\"></div>", "<div id=\"root\">" + wrappedContent + "</div>");

  return html;
}

try {
  const indexPath = path.join(DIST_DIR, "index.html");
  if (!existsSync(indexPath)) {
    console.warn("[prerender] dist/index.html was not found; skipping.");
    process.exit(0);
  }

  const baseHtml = readFileSync(indexPath, "utf8");

  for (const route of ROUTES) {
    try {
      const outDir = path.join(DIST_DIR, route.dir);
      if (!existsSync(outDir)) {
        mkdirSync(outDir, { recursive: true });
      }
      const html = buildRouteHtml(baseHtml, route);
      writeFileSync(path.join(outDir, "index.html"), html, "utf8");
      console.log("[prerender] wrote " + route.dir + "/index.html");
    } catch (routeError) {
      console.warn("[prerender] failed to prerender " + route.urlPath + ":", routeError && routeError.message);
    }
  }
} catch (error) {
  console.warn("[prerender] step skipped due to an unexpected error:", error && error.message);
}
