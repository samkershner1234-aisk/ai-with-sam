import { useState, useEffect, useRef } from "react";

const steps = [
  {
    num: "01",
    title: "We Identify Exactly What AI Can Do For Your Job",
    body: "On a free 20-minute call, you describe how you work and I map out exactly what I'd build for you. Free. In 20 minutes.",
    tag: "20 minutes · Free",
  },
  {
    num: "02",
    title: "Your AI System Gets Built Live, On the Call",
    body: "60 minutes on Google Meet. You get a working AI solution built in real time, tailored to your exact workflow. Not a template. Not generic advice. A real custom prompt, tool, or automation. Built for your job.",
    tag: "60 minutes · Live on Google Meet",
  },
  {
    num: "03",
    title: "You Use It Before You Close Your Laptop",
    body: "You leave with a working system, a full session recording, a written recap of every step, and 14 days of direct WhatsApp access to Sam. Start saving time immediately. The same day.",
    tag: "Same day · No tech skills needed",
  },
];

export default function HowItWorks() {
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
    timerRef.current = setInterval(() => setCurrent(p => (p + 1) % steps.length), 3000);
  };

  useEffect(() => {
    if (isMobile) startTimer();
    return () => clearInterval(timerRef.current);
  }, [isMobile]);

  const goTo = (idx) => { clearInterval(timerRef.current); setCurrent(idx); startTimer(); };
  const prev = () => goTo((current - 1 + steps.length) % steps.length);
  const next = () => goTo((current + 1) % steps.length);

  return (
    <section style={{ background: "#0F172A", padding: "80px 0" }}>
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
              <div key={i} style={{ background: "#1E293B", borderRadius: 16, padding: "36px 28px", border: "1px solid rgba(255,255,255,0.06)", position: "relative" }}>
                <div style={{ fontWeight: 900, fontSize: 36, color: "rgba(249,115,22,0.2)", marginBottom: 16, lineHeight: 1 }}>{s.num}</div>
                <h3 style={{ fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>{s.body}</p>
                <span style={{ background: "rgba(249,115,22,0.12)", color: "#F97316", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600 }}>{s.tag}</span>
              </div>
            ))}
          </div>
        )}

        {/* Mobile carousel */}
        {isMobile && (
          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, marginBottom: 18 }}>
              <button onClick={prev} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(249,115,22,0.15)", border: "2px solid #F97316", color: "#F97316", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
              {steps.map((_, i) => (
                <button key={i} onClick={() => goTo(i)} style={{ width: i === current ? 20 : 8, height: 8, borderRadius: 4, background: i === current ? "#F97316" : "rgba(249,115,22,0.3)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
              ))}
              <button onClick={next} style={{ width: 40, height: 40, borderRadius: "50%", background: "rgba(249,115,22,0.15)", border: "2px solid #F97316", color: "#F97316", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
            </div>
            <div style={{ overflow: "hidden" }}>
              <div style={{ display: "flex", transition: "transform 0.4s cubic-bezier(.4,0,.2,1)", transform: `translateX(-${current * 100}%)` }}>
                {steps.map((s, i) => (
                  <div key={i} style={{ minWidth: "100%", background: "#1E293B", borderRadius: 16, padding: "36px 28px", border: "1px solid rgba(255,255,255,0.06)" }}>
                    <div style={{ fontWeight: 900, fontSize: 36, color: "rgba(249,115,22,0.2)", marginBottom: 16 }}>{s.num}</div>
                    <h3 style={{ fontWeight: 700, fontSize: 18, color: "#fff", marginBottom: 12, lineHeight: 1.3 }}>{s.title}</h3>
                    <p style={{ color: "#94A3B8", fontSize: 15, lineHeight: 1.65, marginBottom: 20 }}>{s.body}</p>
                    <span style={{ background: "rgba(249,115,22,0.12)", color: "#F97316", borderRadius: 20, padding: "5px 12px", fontSize: 12, fontWeight: 600 }}>{s.tag}</span>
                  </div>
                ))}
              </div>
            </div>
            <p style={{ textAlign: "center", color: "#64748B", fontSize: 13, marginTop: 14 }}>Step {current + 1} of {steps.length}</p>
          </div>
        )}
      </div>
    </section>
  );
}
