import { useState } from "react";
import { CTA_URL, WHATSAPP_URL } from "./constants";

const COMBINED_ITEMS = [
  "60-minute live session on Google Meet",
  "A custom AI prompt, tool, or automation built for your exact role",
  "Full session recording so you can rewatch and repeat every step",
  "Written recap of everything we built — yours to keep",
  "Hands-on implementation so you leave with something that works",
  { title: "Your Personal Prompt Kit", desc: "Custom prompts made for your workflow, ready to copy and use immediately." },
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
              {method}
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
            <span>₪400 ILS</span><span style={{ fontSize: 13, color: "#94A3B8", fontWeight: 400 }}>Bit · Paybox · Bank Transfer</span>
          </button>
          <a href="https://www.paypal.com/ncp/payment/FJRZD966GUUWW" target="_blank" rel="noopener noreferrer"
            style={{ padding: "14px 20px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", fontWeight: 700, fontSize: 16, color: "#CBD5E1", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none" }}>
            <span>$135 USD</span><span style={{ fontSize: 13, color: "#64748B", fontWeight: 400 }}>PayPal</span>
          </a>
          <a href="https://www.paypal.com/ncp/payment/YTA8589KBMZVS" target="_blank" rel="noopener noreferrer"
            style={{ padding: "14px 20px", borderRadius: 10, border: "2px solid rgba(255,255,255,0.08)", background: "rgba(255,255,255,0.04)", fontWeight: 700, fontSize: 16, color: "#CBD5E1", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", textDecoration: "none" }}>
            <span>£100 GBP</span><span style={{ fontSize: 13, color: "#64748B", fontWeight: 400 }}>PayPal</span>
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
    <section id="offer" style={{ background: "#0F172A", padding: "56px 0 40px" }}>
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
        <div style={{ background: "#1E293B", borderRadius: 20, padding: "32px 28px", boxShadow: "0 4px 32px rgba(0,0,0,0.3)", border: "1px solid rgba(249,115,22,0.15)" }}>

          {/* Title */}
          <h3 style={{ fontWeight: 800, fontSize: "clamp(18px,3.5vw,26px)", color: "#fff", marginBottom: 6, lineHeight: 1.25 }}>
            Save 5+ Hours This Week. Guaranteed.
          </h3>
          <p style={{ color: "#94A3B8", fontSize: 15, marginBottom: 24, lineHeight: 1.6 }}>
            A private, 1-on-1 session where we build AI into your actual job — live, on your screen, for your workflow.
          </p>

          {/* Guarantee pill */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(249,115,22,0.12)", border: "1.5px solid rgba(249,115,22,0.35)", borderRadius: 999, padding: "7px 16px", marginBottom: 24 }}>
            <span style={{ fontSize: 16 }}>🛡️</span>
            <span style={{ color: "#F97316", fontWeight: 700, fontSize: 14 }}>5-Hour Guarantee — No one has ever claimed it.</span>
          </div>

          <p style={{ color: "#F97316", fontWeight: 700, fontSize: 15, marginBottom: 16 }}>
            400₪ / $135 USD / £100 GBP for your 60-minute session.
          </p>

          {/* What's included toggle */}
          <button
            onClick={() => setItemsOpen(!itemsOpen)}
            style={{ width: "100%", background: "rgba(249,115,22,0.08)", border: "1.5px solid rgba(249,115,22,0.25)", borderRadius: 12, padding: "14px 18px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer", marginBottom: itemsOpen ? 0 : 24, transition: "all 0.2s" }}
          >
            <span style={{ fontWeight: 700, color: "#F97316", fontSize: 15 }}>What's Included</span>
            <span style={{ color: "#F97316", fontSize: 20, lineHeight: 1, transform: itemsOpen ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>+</span>
          </button>

          {itemsOpen && (
            <div style={{ background: "rgba(15,23,42,0.6)", border: "1.5px solid rgba(249,115,22,0.15)", borderTop: "none", borderRadius: "0 0 12px 12px", padding: "16px 18px", marginBottom: 24 }}>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                {COMBINED_ITEMS.map((item, i) =>
                  typeof item === "string" ? (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: "#F97316", fontWeight: 700, fontSize: 16, lineHeight: "1.5", flexShrink: 0 }}>✓</span>
                      <span style={{ color: "#CBD5E1", fontSize: 14, lineHeight: 1.5 }}>{item}</span>
                    </li>
                  ) : (
                    <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: "#F97316", fontWeight: 700, fontSize: 16, lineHeight: "1.5", flexShrink: 0 }}>✓</span>
                      <div>
                        <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>{item.title}: </span>
                        <span style={{ color: "#94A3B8", fontSize: 14, lineHeight: 1.5 }}>{item.desc}</span>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Already had call / Pay section */}
          <p style={{ color: "#94A3B8", fontSize: 14, marginBottom: 14, textAlign: "center" }}>
            Already had your free call? You're ready to book.
          </p>

          {/* Single orange pay button */}
          <button
            onClick={() => setShowCurrencyPicker(true)}
            style={{ width: "100%", background: "#F97316", color: "#fff", fontWeight: 800, fontSize: 17, padding: "16px 20px", borderRadius: 12, border: "none", cursor: "pointer", letterSpacing: "0.01em", boxShadow: "0 4px 18px rgba(249,115,22,0.35)", transition: "background 0.2s" }}
            onMouseEnter={(e) => e.currentTarget.style.background = "#EA6C0A"}
            onMouseLeave={(e) => e.currentTarget.style.background = "#F97316"}
          >
            Pay &amp; Book My Session
          </button>

        </div>
      </div>
    </section>
  );
}
