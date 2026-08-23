// Compact role-specific examples section for the homepage. Illustrative
// only \u2014 no integrations or automation capabilities are claimed here.
const ROLES = [
  { title: "Marketing", body: "Turn briefs, research and campaign notes into useful first drafts built around your actual brand and workflow." },
  { title: "Partnerships", body: "Research potential partners, prepare personalised outreach and keep follow-ups moving without rebuilding context every time." },
  { title: "Sales", body: "Prepare prospect research, follow-ups and next steps using information already available to you." },
  { title: "Managers", body: "Turn meetings, emails and updates into concise summaries, priorities and actions." },
  { title: "Recruitment", body: "Research candidates, prepare interviews and turn notes into structured follow-up." },
  { title: "Operations", body: "Reduce repetitive admin, reporting and recurring information handoffs." },
];

export default function RoleExamples() {
  return (
    <section style={{ background: "#0F172A", padding: "40px 24px 56px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 12 }}>
          BUILT AROUND YOUR ROLE
        </p>
        <h2 style={{ fontSize: "clamp(26px,4vw,38px)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.2, marginBottom: 12 }}>
          What Could AI Look Like in Your Work?
        </h2>
        <p style={{ color: "#94A3B8", fontSize: 16, textAlign: "center", maxWidth: 560, margin: "0 auto 40px" }}>
          Your job is different from everyone else's. Your AI setup should be too.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
          {ROLES.map((r) => (
            <div key={r.title} style={{ background: "#1E293B", borderRadius: 16, padding: "26px 24px", border: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ color: "#F97316", fontWeight: 800, fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 10 }}>{r.title}</div>
              <p style={{ color: "#CBD5E1", fontSize: 15, lineHeight: 1.6, margin: 0 }}>{r.body}</p>
            </div>
          ))}
        </div>
        <p style={{ color: "#64748B", fontSize: 15, textAlign: "center", marginTop: 32, fontStyle: "italic" }}>
          Your role isn't here? That's the point. We build around your actual work.
        </p>
      </div>
    </section>
  );
}
