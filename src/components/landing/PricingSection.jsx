import { useState } from "react";
import { CTA_URL, WHATSAPP_URL } from "./constants";

const COMBINED_ITEMS = [
  "60-minute live session on Google Meet",
  "A custom AI prompt, tool, or automation built for your exact role",
  "Full session recording so you can rewatch and repeat every step",
  "Written recap of everything we built — yours to keep",
  "Hands-on implementation so you leave with something that works",
  { title: "Your Personal Prompt Kit", desc: "The exact prompts Sam uses daily — ready to copy and use immediately." },
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

  const waLink = "https://wa.me/972526198680?text=" + encodeURIComponent("Hi! I would like to pay with bank transfer.");

  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}
    >
      <div style={{ background: "#1E293B", borderRadius: 16, padding: "32px 28px", maxWidth: 380, width: "100%", boxShadow: "0 8px 48px rgba(0,0,0,0.5)", position: "relative", border: "1px solid rgba(249,115,22,0.2)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94A3B8" }}>✕</button>
        <h3 style={{ fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 6 }}>Pay ₪400 ILS</h3>
        <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 22 }}>Choose your preferred payment method:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {["Bit", "Paybox", "Bank Transfer"].map((method) => (
            <button key={method} onClick={() => setSelected(method)}
              style={{ padding: "13px 16px", borderRadius: 10, border: selected === method ? "2px solid #F97316" : "2px solid rgba(255,255,255,0.1)", background: selected === method ? "rgba(249,115,22,0.12)" : "rgba(255,255,255,0.05)", fontWeight: 700, fontSize: 15, color: selected === method ? "#F97316" : "#CBD5E1", cursor: "pointer", textAlign: "left", transition: "all 0.15s" }}>
              {method === "Bit" && "💙 "}{method === "Paybox" && "🟣 "}{method === "Bank Transfer" && "🏦 "}{method}
            </button>
          ))}
        </div>
        {(selected === "Bit" || selected === "Paybox") && (
          <div style={{ background: "rgba(34,197,94,0.08)", border: "1.5px solid rgba(34,197,94,0.3)", borderRadius: 10, padding: "14px 16px" }}>
            <p style={{ color: "#4ADE80", fontSize: 14, fontWeight: 600, marginBottom: 10 }}>Send ₪400 to this number on {selected}:</p>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: "#fff", letterSpacing: "0.05em" }}>{ILS_PHONE}</span>
              <button onClick={handleCopy} style={{ background: copied ? "#22C55E" : "#F97316", color: "#fff", border: "none", borderRadius: 7, padding: "6px 14px", fontWeight: 700, fontSize: 13, cursor: "pointer", transition: "background 0.2s" }}>{copied ? "Copied ✓" : "Copy"}</button>
            </div>
            <p style={{ color: "#64748B", fontSize: 12, marginTop: 8 }}>After sending, message Sam on WhatsApp to confirm.</p>
          </div>
        )}
        {selected === "Bank Transfer" && (
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            style={{ display: "block", background: "#22C55E", color: "#fff", fontWeight: 700, fontSize: 15, padding: "13px 16px", borderRadius: 10, textDecoration: "none", textAlign: "center" }}>
            💬 Message Sam on WhatsApp
          </a>
        )}
      </div>
    </div>
  );
}

function CurrencyPickerPopup({ onClose, onILS }) {
  return (
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 9998, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}
    >
      <div style={{ background: "#1E293B", borderRadius: 16, padding: "32px 28px", maxWidth: 360, width: "100%", boxShadow: "0 8px 48px rgba(0,0,0,0.5)", position: "relative", border: "1px solid rgba(249,115,22,0.2)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 16, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#94A3B8" }}>✕</button>
        <h3 style={{ fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 6 }}>Pay & Book My Session</h3>
        <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 22 }}>Choose your currency:</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={onILS}
            style={{ padding: "14px 20px", borderRadius: 10, border: "2px solid rgba(249,115,22,0.3)", background: "rgba(249,115,22,0.08)", fontWeight: 700, fontSize: 16, color: "#F97316", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span>🇮🇱 ₪400 ILS</span><span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 400 }}>Bit · Paybox · Bank Transfer</span>
          </button>
          <a href="https://www.paypal.com/ncp/payment/FJRZD966GUUWW" target="_blank" rel="noopener noreferrer"
            style={{ padding: "14px 20px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", fontWeight: 700, fontSize: 16, color: "#CBD5E1", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none" }}>
            <span>🇺🇸 $135 USD</span><span style={{ fontSize: 13, color: "#64748B", fontWeight: 400 }}>PayPal</span>
          </a>
          <a href="https://www.paypal.com/ncp/payment/YTA8589KBMZVS" target="_blank" rel="noopener noreferrer"
            style={{ padding: "14px 20px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", fontWeight: 700, fontSize: 16, color: "#CBD5E1", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none" }}>
            <span>🇬🇧 £100 GBP</span><span style={{ fontSize: 13, color: "#64748B", fontWeight: 400 }}>PayPal</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function PricingSection() {
  const [itemsOpen, setItemsOpen] = useState(false);
  const [showCurrencyPicker, setShowCurrencyPicker] = useState(false);
  const [showILSPopup, setShowILSPopup] = useState(false);

  const handleILS = () => {
    setShowCurrencyPicker(false);
    setShowILSPopup(true);
  };

  return (
    <section id="offer" style={{ background: "#0F172A", padding: "56px 0" }}>
      {showCurrencyPicker && <CurrencyPickerPopup onClose={() => setShowCurrencyPicker(false)} onILS={handleILS} />}
      {showILSPopup && <ILSPaymentPopup onClose={() => setShowILSPopup(false)} />}

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 20px" }}>
        {/* Section header */}
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 10 }}>
          THE OFFER
        </p>
        <h2 style={{ fontSize: "clamp(22px,4vw,32px)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.25, marginBottom: 32 }}>
          One Session. One Working AI System.<br />Results Before You Close Your Laptop.
        </h2>

        {/* Main card */}
        <div style={{ background: "#1E293B", borderRadius: 18, boxShadow: "0 4px 32px rgba(0,0,0,0.3)", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ padding: "28px 28px 24px" }}>
            {/* Product name + price */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: "clamp(18px,3vw,22px)", fontWeight: 800, color: "#fff", marginBottom: 14 }}>
                Save 5+ Hours This Week. Guaranteed.
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: "clamp(28px,5vw,40px)", fontWeight: 900, color: "#fff" }}>₪400</span>
                <span style={{ color: "#64748B", fontSize: 14 }}>one-time · $135 USD · £100 GBP</span>
              </div>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 20, padding: "7px 14px" }}>
                <span style={{ fontSize: 14 }}>🛡</span>
                <span style={{ color: "#F97316", fontSize: 13, fontWeight: 600 }}>5-Hour Guarantee — No one has ever claimed it.</span>
              </div>
            </div>

            {/* Combined collapsible */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: 16, marginBottom: 24 }}>
              <button
                onClick={() => setItemsOpen(!itemsOpen)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: "none", border: "none", cursor: "pointer", padding: "0 0 8px" }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ fontSize: 16 }}>✅</span>
                  <span style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>What's Included</span>
                  <span style={{ background: "#F97316", color: "#fff", borderRadius: 10, padding: "1px 8px", fontSize: 12, fontWeight: 700 }}>7 items</span>
                </span>
                <span style={{ color: "#F97316", fontSize: 18, fontWeight: 700, transform: itemsOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>▼</span>
              </button>
              {itemsOpen && (
                <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: "12px 16px", marginTop: 4 }}>
                  {COMBINED_ITEMS.map((item, i) => (
                    <div key={i} style={{ padding: "7px 0", borderBottom: i < COMBINED_ITEMS.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
                      {typeof item === "string" ? (
                        <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <span style={{ color: "#22C55E", fontWeight: 700, marginTop: 1 }}>✓</span>
                          <span style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.4 }}>{item}</span>
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontWeight: 700, color: "#F97316", fontSize: 14, marginBottom: 2 }}>🎁 {item.title}</div>
                          <div style={{ color: "#94A3B8", fontSize: 13, lineHeight: 1.4 }}>{item.desc}</div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment CTA */}
            <p style={{ color: "#94A3B8", fontSize: 13, textAlign: "center", marginBottom: 14 }}>Already had your free call? Reserve your session below.</p>

            <button
              onClick={() => setShowCurrencyPicker(true)}
              style={{ display: "block", width: "100%", background: "#F97316", color: "#fff", fontWeight: 800, fontSize: 17, padding: "16px 24px", borderRadius: 10, border: "none", cursor: "pointer", textAlign: "center", letterSpacing: "0.01em" }}
            >
              Pay & Book My Session
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
