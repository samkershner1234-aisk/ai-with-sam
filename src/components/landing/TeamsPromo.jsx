// Homepage section that introduces the employer and Enterprise offer.
// Links to the dedicated /teams page. The individual offer remains primary.
import { Link } from "react-router-dom";

export default function TeamsPromo() {
  return (
    <section style={{ background: "#0F172A", padding: "56px 24px" }}>
      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <div style={{ background: "#0B1526", border: "1px solid #1E293B", borderRadius: 18, padding: "40px" }}>
          <div style={{ color: "#F97316", fontWeight: 700, fontSize: "13px", letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: "14px" }}>For Employers</div>
          <h2 style={{ color: "#FFFFFF", fontSize: "clamp(24px,3vw,32px)", fontWeight: 800, lineHeight: 1.25, margin: "0 0 16px" }}>Want to Make AI Useful Across Your Team?</h2>
          <p style={{ color: "#CBD5E1", fontSize: "16px", lineHeight: 1.7, margin: "0 0 24px" }}>Give employees personalised AI sessions built around the work they actually do. Start small, measure what changes and expand only if it works.</p>
          <Link to="/teams" style={{ display: "inline-block", background: "#F97316", color: "#FFFFFF", fontWeight: 700, fontSize: "16px", padding: "14px 28px", borderRadius: "50px", textDecoration: "none" }}>Explore Enterprise</Link>
          <p style={{ color: "#94A3B8", fontSize: "14px", margin: "16px 0 0" }}>Start with a 5 person pilot. No long term commitment.</p>
        </div>
      </div>
    </section>
  );
}
