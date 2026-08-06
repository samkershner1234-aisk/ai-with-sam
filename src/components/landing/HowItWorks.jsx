import { useState, useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "Bring One Real Work Task",
    body: "Choose one repetitive, frustrating, or time-consuming task you want to improve. On a free 20-minute call, you describe how you work and we see if it’s a good fit.",
    tag: "20 minutes · Free",
  },
  {
    num: "02",
    title: "Build the Workflow Together",
    body: "During the live session on Google Meet, we turn that one task into a working AI solution or prompt you can put to work straight away. Not a template. Not generic advice. Something built around your real work.",
    tag: "60 minutes · Live on Google Meet\n400₪ / $129 / £99",
  },
  {
    num: "03",
    title: "Put It Into Practice",
    body: "Use your recording, personalised Prompt Kit, and 14 days of WhatsApp support to apply and refine what we built, designed to help you reclaim hours every week.",
    tag: "Same day · No tech skills needed",
  },
];

export default function HowItWorks() {
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
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % steps.length), 3000);
  };

  const stopTimer = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  useEffect(() => {
    if (isMobile) startTimer();
    return () => clearInterval(timerRef.current);
  }, [isMobile]);

  const goTo = (idx) => { clearInterval(timerRef.current); setCurrent(idx); startTimer(); };
  const prev = () => goTo((current - 1 + steps.length) % steps.length);
  const next = () => goTo((current + 1) % steps.length);

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
        setCurrent(p => (p + 1) % steps.length);
      } else {
        setCurrent(p => (p - 1 + steps.length) % steps.length);
      }
    }
    touchStartX.current = null;
  };

  return (
    <section id="how-it-works" style={{ background: "#0F172A", padding: "40px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 12 }}>
          THE PROCESS
        </p>
        <h2 style={{ fontSize: "clamp(28px,4vw,40px)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.2, marginBottom: 48 }}>
          Here's Exactly What Happens
        </h2>

        {/* Desktop */}
        {!isMobile && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 28 }}>
            {steps.map((s, i) => (
              <div key={i} style={{ background: "#1E293B", borderRadius: 18, padding: "32px 28px", border: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: "#F97316", marginBottom: 16, lineHeight: 1 }}>{s.num}</div>
                <h3 style={{ fontWeight: 800, fontSize: 20, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.7, marginBottom: 16 }}>{s.body}</p>
                <span style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "#F97316", whiteSpace: "pre-line", textAlign: "center" }}>{s.tag}</span>
              </div>
            ))}
          </div>
        )}

        {/* Mobile: carousel with swipe */}
        {isMobile && (
          <div
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            style={{ userSelect: "none" }}
          >
            <div style={{ background: "#1E293B", borderRadius: 18, padding: "32px 24px", border: "1px solid rgba(255,255,255,0.06)", minHeight: 280 }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: "#F97316", marginBottom: 16, lineHeight: 1 }}>{steps[current].num}</div>
              <h3 style={{ fontWeight: 800, fontSize: 21, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{steps[current].title}</h3>
              <p style={{ color: "#94A3B8", fontSize: 16, lineHeight: 1.7, marginBottom: 16 }}>{steps[current].body}</p>
              <span style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.3)", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "#F97316", whiteSpace: "pre-line", textAlign: "center" }}>{steps[current].tag}</span>
            </div>

            {/* Arrows + dots */}
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginTop: 24 }}>
              <button onClick={prev} style={{ background: "rgba(249,115,22,0.12)", border: "1.5px solid rgba(249,115,22,0.35)", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", color: "#F97316", fontSize: 18, display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              <div style={{ display: "flex", gap: 8 }}>
                {steps.map((_, i) => (
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
