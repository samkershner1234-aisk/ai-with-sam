import { useState, useEffect, useRef } from "react";

const cards = [
  {
    icon: "⏰",
    title: "You're Wasting Hours Every Day",
    body: "You spend more time trying to figure out AI tools than actually using them. YouTube tutorials are generic and don't apply to your specific job or the way you actually work.",
  },
  {
    icon: "✖️",
    title: "Nothing You Try Actually Sticks",
    body: "You've tried ChatGPT, Copilot, Gemini, Perplexity, Claude. You played around. You got nowhere. Nothing produced anything useful for your real day-to-day work.",
  },
  {
    icon: "📉",
    title: "You're Falling Behind at Work",
    body: "Everyone around you is talking about AI. You're nodding along in meetings, but secretly you have no idea how to make it actually work for your specific role.",
  },
];

export default function PainSection() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const timerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrent(p => (p + 1) % cards.length);
    }, 3000);
  };

  useEffect(() => {
    if (isMobile) startTimer();
    return () => clearInterval(timerRef.current);
  }, [isMobile]);

  const goTo = (idx) => {
    clearInterval(timerRef.current);
    setCurrent(idx);
    startTimer();
  };
  const prev = () => goTo((current - 1 + cards.length) % cards.length);
  const next = () => goTo((current + 1) % cards.length);

  return (
    <section style={{ background: "#0F172A", padding: "80px 0 72px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 12 }}>
          SOUND FAMILIAR?
        </p>
        <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.2, marginBottom: 14 }}>
          You Know AI Could Help You.<br />But Nothing Actually Works.
        </h2>
        <p style={{ color: "#94A3B8", textAlign: "center", fontSize: 17, marginBottom: 48 }}>
          It's not your fault. Here's what most working professionals are dealing with:
        </p>

        {/* Desktop: 3 columns */}
        {!isMobile && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {cards.map((c, i) => (
              <div key={i} style={{ background: "#1E293B", borderRadius: 16, padding: "36px 28px", boxShadow: "0 2px 16px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
                <h3 style={{ fontWeight: 700, fontSize: 19, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{c.title}</h3>
                <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.65 }}>{c.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mobile: carousel */}
        {isMobile && (
          <div>
            {/* Arrows + dots above card */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 18 }}>
              <button onClick={prev} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(249,115,22,0.15)", border: "2px solid #F97316", color: "#F97316", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              {cards.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? 20 : 8, height: 8, borderRadius: 4, background: i === current ? "#F97316" : "rgba(249,115,22,0.3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
              ))}
              <button onClick={next} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(249,115,22,0.15)", border: "2px solid #F97316", color: "#F97316", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ display: "flex", transition: "transform 0.4s cubic-bezier(.4,0,.2,1)", transform: `translateX(-${current * 100}%)` }}>
                {cards.map((c, i) => (
                  <div key={i} style={{ minWidth: "100%", background: "#1E293B", borderRadius: 16, padding: "36px 28px", boxShadow: "0 2px 16px rgba(0,0,0,0.3)", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontSize: 32, marginBottom: 16 }}>{c.icon}</div>
                    <h3 style={{ fontWeight: 700, fontSize: 19, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{c.title}</h3>
                    <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.65 }}>{c.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ textAlign: "center", color: "#64748B", fontSize: 13, marginTop: 14 }}>{current + 1} / {cards.length}</p>
          </div>
        )}
      </div>
    </section>
  );
}
