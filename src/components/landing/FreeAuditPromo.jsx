import { Link } from "react-router-dom";

export default function FreeAuditPromo() {
  return (
    <section style={{ background: "#0F172A", padding: "40px 24px 60px" }}>
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <div
          style={{
            background: "linear-gradient(135deg, rgba(249,115,22,0.12), rgba(249,115,22,0.04))",
            border: "1.5px solid rgba(249,115,22,0.35)",
            borderRadius: 18,
            padding: "40px 36px",
            textAlign: "center",
            boxShadow: "0 0 40px rgba(249,115,22,0.08)",
          }}
        >
          <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, margin: "0 0 14px" }}>
            Free 60-Second AI Audit
          </p>
          <h2 style={{ fontSize: "clamp(24px,3.5vw,34px)", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.3, margin: "0 auto 16px", maxWidth: 560 }}>
            Not Ready to Book? Find Your Biggest Time-Waster First.
          </h2>
          <p style={{ color: "#CBD5E1", fontSize: 17, lineHeight: 1.7, margin: "0 auto 28px", maxWidth: 520 }}>
            Answer 4 quick questions. Get a personalised breakdown of where AI can save you the most hours every week, plus 3 ready-to-use prompts for your exact task. No call. No card. 60 seconds.
          </p>
          <Link
            to="/ai-time-waste-audit"
            style={{ display: "inline-block", whiteSpace: "nowrap", background: "#F97316", color: "#fff", fontWeight: 700, fontSize: 16, padding: "16px 32px", borderRadius: 10, textDecoration: "none", transition: "opacity 0.2s" }}
          >
            Get My Free AI Audit →
          </Link>
        </div>
      </div>
    </section>
  );
}
