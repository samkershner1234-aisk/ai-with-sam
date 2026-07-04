import { useState } from "react";
import { CTA_URL } from "./constants";

const details = [
  {
    id: "how",
    label: "How it works",
    content: "Message me on WhatsApp within the first 7 days if you haven't saved 5 hours. I'll schedule a free follow-up session immediately. No forms. No questions. Simple as that.",
  },
  {
    id: "track",
    label: "Track record",
    content: "In every session delivered so far, no one has ever needed to claim it. But it's there if you do. Your results are the only thing that matters.",
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
    <section style={{ background: "#0F172A", padding: "40px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        {/* Section label */}
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 10 }}>
          MY GUARANTEE
        </p>

        {/* Main card */}
        <div className="guarantee-card">
          {/* Left: small shield icon */}
          <div className="guarantee-left">
            <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#F97316,#EA580C)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 32, boxShadow: "0 0 28px rgba(249,115,22,0.35)", flexShrink: 0 }}>
              🛡
            </div>
          </div>

          {/* Right: headline + tabs */}
          <div className="guarantee-right">
            <h2 style={{ fontSize: "clamp(18px,2.8vw,26px)", fontWeight: 800, color: "#fff", lineHeight: 1.3, marginBottom: 8 }}>
              If You Don't Save 5 Hours in Week One, I Book You a Free Follow-Up Session.
            </h2>
            <p style={{ color: "#94A3B8", fontSize: 15, marginBottom: 20 }}>No questions asked. No forms. No hoops.</p>

            {/* Tab buttons */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
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
            <div style={{ background: "rgba(255,255,255,0.05)", borderRadius: 10, padding: "20px 20px", minHeight: 72, borderLeft: "3px solid #F97316" }}>
              <p style={{ color: "#CBD5E1", fontSize: 15, lineHeight: 1.7, margin: 0 }}>{active.content}</p>
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
          gap: 32px;
          background: #1E293B;
          border-radius: 20px;
          padding: 40px 40px;
          align-items: flex-start;
          box-shadow: 0 4px 40px rgba(0,0,0,0.3);
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
        @media (max-width: 767px) {
          .guarantee-card {
            flex-direction: row;
            padding: 28px 22px;
            gap: 16px;
            align-items: flex-start;
          }
          .guarantee-left {
            min-width: unset;
          }
        }
      `}</style>
    </section>
  );
}
