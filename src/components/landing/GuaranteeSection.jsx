import { useState } from "react";
import { CTA_URL } from "./constants";

const details = [
  {
    id: "how",
    label: "How it works",
    content: "You will leave with at least one practical AI workflow or prompt you can use in your real work—or I'll continue for up to 30 extra minutes at no charge. The guarantee covers the practical deliverable created during the session. It does not guarantee a specific number of hours saved, income earned, or business result.",
  },
  {
    id: "track",
    label: "Track record",
    content: "In every session so far, clients have left with something practical they can use. The guarantee is there if you ever need it. What matters is that you walk away with a workflow that works for your real job.",
  },
  {
    id: "whatsapp",
    label: "WhatsApp access",
    content: "Your session includes 14 days of direct WhatsApp access to me. Got a prompt that's not working? Message me. I'll fix it.",
  },
];

export default function GuaranteeSection() {
  const [activeTab, setActiveTab] = useState("how");
  const active = details.find(d => d.id === activeTab);

  return (
    <section id="guarantee" style={{ background: "#0F172A", padding: "40px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Section label */}
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 10 }}>
          RESULTS GUARANTEED
        </p>

        {/* Main card */}
        <div className="guarantee-card">
          <div className="guarantee-top">
            {/* Left: small shield icon */}
            <div className="guarantee-left">
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#F97316,#EA580C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, boxShadow: "0 0 28px rgba(249,115,22,0.35)", flexShrink: 0 }}>
                🛡
              </div>
            </div>

            {/* Right: headline */}
            <div className="guarantee-right">
              <h2 style={{ fontSize: "clamp(18px,2.8vw,26px)", fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 8 }}>
                Results Guaranteed: You will leave with at least one practical AI workflow or prompt you can use in your real work. Or I’ll continue for up to 30 extra minutes at no charge.
              </h2>
              <p style={{ color: "#94A3B8", fontSize: 15, margin: 0 }}>You are not paying for generic AI advice. We work on one real task from your job and build something practical around it together.</p>
            </div>
          </div>

          {/* Below: tabs, content, CTA - centered, full width */}
          <div className="guarantee-bottom">
            {/* Tab buttons */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap", justifyContent: "center" }}>
              {details.map(d => (
                <button
                  key={d.id}
                  onClick={() => setActiveTab(d.id)}
                  style={{ padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer", fontWeight: 600, fontSize: 14, transition: "all 0.2s", background: activeTab === d.id ? "#F97316" : "rgba(255,255,255,0.08)", color: activeTab === d.id ? "#fff" : "#94A3B8" }}
                >
                  {d.label}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "20px 20px", minHeight: 72, borderLeft: "3px solid #F97316", textAlign: "center" }}>
              <p className="guarantee-body-text" style={{ color: "#CBD5E1", lineHeight: 1.7, margin: 0 }}>{active.content}</p>
            </div>

            {/* CTA */}
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
          display: flex;
          flex-direction: column;
          gap: 24px;
          background: #1E293B;
          border-radius: 20px;
          padding: 40px 40px;
          box-shadow: 0 4px 40px rgba(0,0,0,0.3);
        }
        .guarantee-top {
          display: flex;
          gap: 32px;
          align-items: flex-start;
        }
        .guarantee-left {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex-shrink: 0;
          padding-top: 4px;
        }
        .guarantee-right {
          flex: 1;
        }
        .guarantee-bottom {
          text-align: center;
        }
        .guarantee-body-text {
          font-size: 15px;
        }
        @media (max-width: 480px) {
          .guarantee-body-text {
            font-size: 16px;
          }
        }
        @media (max-width: 767px) {
          .guarantee-card {
            padding: 28px 22px;
          }
          .guarantee-top {
            gap: 16px;
          }
          .guarantee-left {
            min-width: unset;
          }
        }
      `}</style>
    </section>
  );
}
