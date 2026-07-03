import { useState } from "react";
import { CTA_URL } from "./constants";

const ITEMS = [
  "60-minute live session on Google Meet",
  "A custom AI prompt, tool, or automation built for your exact role",
  "Full session recording so you can rewatch and repeat every step",
  "Written recap of everything we built — yours to keep",
  "Hands-on implementation so you leave with something that works",
];

const BONUSES = [
  { title: "Sam's Personal Prompt Kit", desc: "The exact prompts Sam uses daily — ready to copy and use immediately." },
  { title: "14-Day WhatsApp Access to Sam", desc: "Direct access after the session. Got a question? Message Sam. Usually replies within a few hours." },
];

export default function PricingSection() {
  const [itemsOpen, setItemsOpen] = useState(false);
  const [bonusesOpen, setBonusesOpen] = useState(false);

  return (
    <section style={{ background: "#f8f9fb", padding: "56px 0" }}>
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 20px" }}>
        {/* Section header */}
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 10 }}>
          THE OFFER
        </p>
        <h2 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 800, color: "#0F172A", textAlign: "center", lineHeight: 1.25, marginBottom: 32 }}>
          One Session. One Working AI System.<br />Results Before You Close Your Laptop.
        </h2>

        {/* Main card */}
        <div style={{ background: "#fff", borderRadius: 18, boxShadow: "0 4px 32px rgba(15,23,42,0.10)", overflow: "hidden" }}>
          {/* Badge */}
          <div style={{ background: "#F97316", padding: "10px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              FOR WORKING PROFESSIONALS
            </span>
          </div>

          <div style={{ padding: "28px 28px 24px" }}>
            {/* Product name + price */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 800, color: "#0F172A", marginBottom: 6 }}>
                Your AI System, Built Live
              </div>
              <div style={{ color: "#64748B", fontSize: 14, marginBottom: 14, lineHeight: 1.5 }}>
                One session. Working AI built for your job. Results before you close your laptop.
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 6 }}>
                <span style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 900, color: "#0F172A" }}>₪400</span>
                <span style={{ color: "#64748B", fontSize: 14 }}>one-time · $135 USD · £100 GBP</span>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.2)", borderRadius: 20, padding: "5px 12px" }}>
                <span style={{ fontSize: 14 }}>🛡</span>
                <span style={{ color: "#F97316", fontSize: 13, fontWeight: 600 }}>5-Hour Guarantee: free follow-up session if you don't save 5 hours in week one</span>
              </div>
            </div>

            {/* Collapsible: What's Included */}
            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 16, marginBottom: 8 }}>
              <button
                onClick={() => setItemsOpen(!itemsOpen)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: "0 0 8px" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>✅</span>
                  <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>What's Included in Your Session</span>
                  <span style={{ background: "#F97316", color: "#fff", borderRadius: 10, padding: "1px 8px", fontSize: 12, fontWeight: 700 }}>{ITEMS.length} items</span>
                </span>
                <span style={{ color: "#F97316", fontSize: 18, fontWeight: 700, transform: itemsOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
              </button>
              {itemsOpen && (
                <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 16px", marginTop: 4 }}>
                  {ITEMS.map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "6px 0", borderBottom: i < ITEMS.length - 1 ? "1px solid #E2E8F0" : "none" }}>
                      <span style={{ color: "#22C55E", fontWeight: 700, marginTop: 1 }}>✓</span>
                      <span style={{ color: "#334155", fontSize: 14, lineHeight: 1.4 }}>{item}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Collapsible: Bonuses */}
            <div style={{ borderTop: "1px solid #F1F5F9", paddingTop: 12, marginBottom: 24 }}>
              <button
                onClick={() => setBonusesOpen(!bonusesOpen)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: "0 0 8px" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>🎁</span>
                  <span style={{ fontWeight: 700, color: "#0F172A", fontSize: 15 }}>Included With Your Session</span>
                  <span style={{ background: "#8B5CF6", color: "#fff", borderRadius: 10, padding: "1px 8px", fontSize: 12, fontWeight: 700 }}>{BONUSES.length} bonuses</span>
                </span>
                <span style={{ color: "#F97316", fontSize: 18, fontWeight: 700, transform: bonusesOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
              </button>
              {bonusesOpen && (
                <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 16px", marginTop: 4 }}>
                  {BONUSES.map((b, i) => (
                    <div key={i} style={{ padding: "8px 0", borderBottom: i < BONUSES.length - 1 ? "1px solid #E2E8F0" : "none" }}>
                      <div style={{ fontWeight: 700, color: "#0F172A", fontSize: 14, marginBottom: 3 }}>🎁 {b.title}</div>
                      <div style={{ color: "#64748B", fontSize: 13, lineHeight: 1.4 }}>{b.desc}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <a
              href={CTA_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", background: "#F97316", color: "#fff", fontWeight: 700, fontSize: 16, padding: "15px 24px", borderRadius: 10, textDecoration: "none", textAlign: "center", marginBottom: 16 }}
            >
              Book Your Free 20-Minute Call
            </a>
            <p style={{ color: "#64748B", fontSize: 13, textAlign: "center", marginBottom: 20 }}>Already had your free call? Reserve your session below.</p>

            {/* Payment links */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { label: "Pay ₪400 ILS", href: CTA_URL },
                { label: "Pay $135 USD", href: CTA_URL },
                { label: "Pay £100 GBP", href: CTA_URL },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                  style={{ flex: "1 1 120px", minWidth: 110, textAlign: "center", border: "1.5px solid #E2E8F0", borderRadius: 8, padding: "10px 8px", color: "#334155", fontWeight: 600, fontSize: 13, textDecoration: "none", background: "#fff" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
