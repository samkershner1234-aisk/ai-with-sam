import { CTA_URL } from "./constants";

export default function GuaranteeSection() {
  return (
    <section id="guarantee" style={{ background: "#0F172A", padding: "40px 0" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px" }}>
        {/* Section label */}
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 10 }}>
          RESULTS GUARANTEED
        </p>

        {/* Main card */}
        <div className="guarantee-card">
          {/* Centered shield icon */}
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#F97316,#EA580C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, boxShadow: "0 0 28px rgba(249,115,22,0.35)", margin: "0 auto 20px" }}>
            🛡
          </div>

          {/* Left-aligned text */}
          <div style={{ textAlign: "left" }}>
            <h2 style={{ fontSize: "clamp(18px,2.8vw,24px)", fontWeight: 800, color: "#fff", lineHeight: 1.35, margin: 0 }}>
              You leave with something you can use, or I keep going at no charge.
            </h2>
          </div>

          {/* CTA */}
          <div style={{ textAlign: "center" }}>
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "inline-block", marginTop: 24, background: "#F97316", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 10, textDecoration: "none", transition: "opacity 0.2s" }}
            >
              Book Your Free 20-Minute Call
            </a>
            <p style={{ color: "#475569", fontSize: 13, marginTop: 10 }}>Free call. No credit card. No commitment.</p>
          </div>
        </div>
      </div>

      <style>{`
        .guarantee-card {
          background: #1E293B;
          border-radius: 20px;
          padding: 40px 40px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }
        @media (max-width: 767px) {
          .guarantee-card {
            padding: 28px 22px;
          }
        }
      `}</style>
    </section>
  );
}
