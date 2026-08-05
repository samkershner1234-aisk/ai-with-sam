import { useState, useEffect, useRef } from "react";

const cards = [
  {
    icon: "⏰",
    title: "The Same Tasks Eat Your Time Every Week",
    body: "The same repetitive, time-consuming tasks come back again and again. You know AI could help, but generic tutorials never fit your specific job or the way you actually work.",
  },
  {
    icon: "✖️",
    title: "Nothing You Try Actually Sticks",
    body: "You've tried ChatGPT, Copilot, Gemini, Perplexity, Claude. You played around. You got nowhere. Nothing turned into a workflow you actually use for your real, recurring tasks.",
  },
  {
    icon: "📉",
    title: "You're Falling Behind at Work",
    body: "Everyone around you is talking about AI. You're nodding along in meetings, but secretly you have no idea how to turn it into something that saves you time on your specific tasks.",
  },
];

export default function PainSection() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const timerRef = useRef(null);
  const touchStartX = useRef(null);
  const swiped = useRef(false);

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

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    if (isMobile) startTimer();
    return () => clearInterval(timerRef.current);
  }, [isMobile]);

  const goTo = (idx, resumeAuto = true) => {
    clearInterval(timerRef.current);
    setCurrent(idx);
    if (resumeAuto) startTimer();
  };
  const prev = () => goTo((current - 1 + cards.length) % cards.length);
  const next = () => goTo((current + 1) % cards.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    swiped.current = false;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || swiped.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      swiped.current = true;
      stopTimer();
      if (diff > 0) {
        setCurrent(p => (p + 1) % cards.length);
      } else {
        setCurrent(p => (p - 1 + cards.length) % cards.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section style={{ background: "#0F172A", padding: "40px 0 72px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 12 }}>
          SOUND FAMILIAR?
        </p>
        <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.2, marginBottom: 14 }}>
          You Know AI Could Help You.<br />But Nothing Actually Works.
        </h2>
        <p style={{ color: "#94A3B8", fontSize: 17, textAlign: "center", maxWidth: 600, margin: "0 auto 48px" }}>
          Here's what most working professionals go through before finding something that actually works for them.
        </p>

        {/* Desktop: 3 columns */}
        {!isMobile && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }}>
            {cards.map((c, i) => (
              <div key={i} style={{ background: "#1E293B", borderRadius: 18, padding: "32px 28px", border: "1px solid rgba(255,255,255,0.06)" }}>
                <h3 style={{ fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{c.title}</h3>
                <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7 }}>{c.body}</p>
              </div>
            ))}
          </div>
        )}

        {/* Mobile: carousel */}
        {isMobile && (
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ userSelect: "none" }}
          >
            <div style={{ background: "#1E293B", borderRadius: 18, padding: "32px 24px", border: "1px solid rgba(255,255,255,0.06)", minHeight: 220 }}>
              <h3 style={{ fontWeight: 800, fontSize: 21, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{cards[current].title}</h3>
              <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.7 }}>{cards[current].body}</p>
            </div>

            {/* Arrows */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 24 }}>
              <button onClick={prev} style={{ background: "rgba(249,115,22,0.12)", border: "1.5px solid rgba(249,115,22,0.35)", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "#F97316", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <div style={{ display: "flex", gap: 8 }}>
                {cards.map((_, i) => (
                  <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? 22 : 8, height: 8, borderRadius: 4, background: i === current ? "#F97316" : "rgba(249,115,22,0.25)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
                ))}
              </div>
              <button onClick={next} style={{ background: "rgba(249,115,22,0.12)", border: "1.5px solid rgba(249,115,22,0.35)", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "#F97316", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
