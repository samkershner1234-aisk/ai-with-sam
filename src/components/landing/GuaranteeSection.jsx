import { CTA_URL } from "./constants";

export default function GuaranteeSection() {
  return (
    <section id="guarantee" style={{ background: "#0F172A", padding: "40px 0" }}>
      <div style={{ maxWidth: 640, margin: "0 auto", padding: "0 24px" }}>
        {/* Main card */}
        <div className="guarantee-card">
          {/* 1. Eyebrow */}
          <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, margin: "0 0 16px" }}>
            RESULTS GUARANTEED
          </p>

          {/* 2. Shield icon (centered) */}
          <div className="guarantee-shield" style={{ width: 64, height: 64, borderRadius: "50%", background: "linear-gradient(135deg,#F97316,#EA580C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 30, boxShadow: "0 0 28px rgba(249,115,22,0.35)", margin: "0 auto 18px" }}>
            🛡
          </div>

          {/* 3. Headline */}
          <h2 className="guarantee-headline" style={{ fontSize: "clamp(20px,3vw,26px)", fontWeight: 800, color: "#fff", lineHeight: 1.3, margin: "0 0 12px" }}>
            Leave With a Practical AI Workflow
          </h2>

          {/* 4. Guarantee explanation */}
          <p className="guarantee-body-text" style={{ color: "#94A3B8", lineHeight: 1.6, margin: "0 auto", maxWidth: 480 }}>
            You’ll leave with at least one complete AI workflow you can use in your real work, or I’ll continue for up to 30 extra minutes at no charge.
          </p>

          {/* 5. CTA button */}
          <a
            href={CTA_URL}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "inline-block", marginTop: 24, background: "#F97316", color: "#fff", fontWeight: 700, fontSize: 15, padding: "14px 28px", borderRadius: 10, textDecoration: "none", transition: "opacity 0.2s" }}
          >
            Book Your Free 20-Minute Call
          </a>

          {/* 6. Supporting line */}
          <p style={{ color: "#475569", fontSize: 13, marginTop: 10, marginBottom: 0 }}>Free call. No credit card. No commitment.</p>
        </div>
      </div>

      <style>{`
        .guarantee-card {
          background: #1E293B;
          border-radius: 20px;
          padding: 40px 40px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.3);
          text-align: center;
        }
        .guarantee-body-text {
          font-size: 15px;
        }
        @media (max-width: 767px) {
          .guarantee-card {
            padding: 32px 22px;
          }
          .guarantee-shield {
            width: 56px;
            height: 56px;
            font-size: 26px;
          }
          .guarantee-body-text {
            font-size: 15px;
          }
        }
      `}</style>
    </section>
  );
}
