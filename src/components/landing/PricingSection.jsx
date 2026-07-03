import { useState } from "react";
import { CTA_URL, WHATSAPP_URL } from "./constants";

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

const ILS_PHONE = "0526198680";

function ILSPaymentPopup({ onClose }) {
  const [selected, setSelected] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(ILS_PHONE).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const waLink = WHATSAPP_URL.replace(/\?.*$/, "") + "?text=" + encodeURIComponent("Hi! I would like to pay with bank transfer.");

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}
    >
      <div style={{ background: "#fff", borderRadius: 16, padding: "32px 28px", maxWidth: 380, width: "100%", boxShadow: "0 8px 48px rgba(0,0,0,0.25)", position: "relative" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#64748B" }}>✕</button>
        <h3 style={{ fontWeight: 800, fontSize: 20, color: "#0F172A", marginBottom: 6 }}>Pay ₪400 ILS</h3>
        <p style={{ color: "#64748B", fontSize: 14, marginBottom: 22 }}>Choose your preferred payment method:</p>

        {/* Options */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {["Bit", "Paybox", "Bank Transfer"].map((method) => (
            <button
              key={method}
              onClick={() => setSelected(method)}
              style={{
                padding: "13px 16px",
                borderRadius: 10,
                border: selected === method ? "2px solid #F97316" : "2px solid #E2E8F0",
                background: selected === method ? "rgba(249,115,22,0.06)" : "#F8FAFC",
                fontWeight: 700,
                fontSize: 15,
                color: selected === method ? "#F97316" : "#0F172A",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.15s",
              }}
            >
              {method === "Bit" && "💙 "}{method === "Paybox" && "🟣 "}{method === "Bank Transfer" && "🏦 "}{method}
            </button>
          ))}
        </div>

        {/* Result */}
        {(selected === "Bit" || selected === "Paybox") && (
          <div style={{ background: "#F0FDF4", border: "1.5px solid #22C55E", borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ color: "#15803D", fontSize: 14, fontWeight: 600, marginBottom: 10 }}>
              Send ₪400 to this number on {selected}:
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#0F172A", letterSpacing: "0.05em" }}>{ILS_PHONE}</span>
              <button
                onClick={handleCopy}
                style={{ background: copied ? "#22C55E" : "#0F172A", color: "#fff", border: "none", borderRadius: 7, padding: "6px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "background 0.2s" }}
              >
                {copied ? "Copied ✓" : "Copy"}
              </button>
            </div>
            <p style={{ color: "#64748B", fontSize: 12, marginTop: 8 }}>After sending, message Sam on WhatsApp to confirm.</p>
          </div>
        )}

        {selected === "Bank Transfer" && (
          <a
            href={waLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: "block", background: "#22C55E", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 16px", borderRadius: 10, textDecoration: "none", textAlign: "center" }}
          >
            💬 Message Sam on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [itemsOpen, setItemsOpen] = useState(false);
  const [bonusesOpen, setBonusesOpen] = useState(false);
  const [showILSPopup, setShowILSPopup] = useState(false);

  return (
    <section style={{ background: "#f8f9fb", padding: "56px 0" }}>
      {showILSPopup && <ILSPaymentPopup onClose={() => setShowILSPopup(false)} />}

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
          <div style={{ background: "#F97316", padding: "10px 24px" }}>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
              FOR WORKING PROFESSIONALS
            </span>
          </div>

          <div style={{ padding: "28px 28px 24px" }}>
            {/* Product name + price */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 800, color: "#0F172A", marginBottom: 14 }}>
                Your AI System, Built Live
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
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

            {/* Payment buttons */}
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
              <button
                onClick={() => setShowILSPopup(true)}
                style={{ flex: "1 1 120px", minWidth: 110, textAlign: "center", border: "1.5px solid #E2E8F0", borderRadius: 8, padding: "10px 8px", color: "#334155", fontWeight: 600, fontSize: 13, background: "#fff", cursor: "pointer" }}
              >
                Pay ₪400 ILS
              </button>
              <a
                href="https://www.paypal.com/ncp/payment/FJRZD966GUUWW"
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: "1 1 120px", minWidth: 110, textAlign: "center", border: "1.5px solid #E2E8F0", borderRadius: 8, padding: "10px 8px", color: "#334155", fontWeight: 600, fontSize: 13, textDecoration: "none", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                Pay $135 USD
              </a>
              <a
                href="https://www.paypal.com/ncp/payment/YTA8589KBMZVS"
                target="_blank"
                rel="noopener noreferrer"
                style={{ flex: "1 1 120px", minWidth: 110, textAlign: "center", border: "1.5px solid #E2E8F0", borderRadius: 8, padding: "10px 8px", color: "#334155", fontWeight: 600, fontSize: 13, textDecoration: "none", background: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                Pay £100 GBP
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
