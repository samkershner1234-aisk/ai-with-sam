import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";

const testimonials = [
  {
    initials: "GK",
    color: "#7C3AED",
    name: "Gideon K.",
    role: "Senior Growth Marketing Manager · Tel Aviv",
    quote: "I'm a marketing manager and I was drowning in repetitive tasks. In one session Sam built me a prompt system that now writes my first draft for every brief. I save at least 4 hours a week.",
  },
  {
    initials: "MR",
    color: "#0D9488",
    name: "Michal R.",
    role: "Marketing Manager · Tel Aviv",
    quote: "I came in thinking I had no idea how to use AI. Within one hour, Sam built me a system that now handles all my client follow-ups automatically. I got back at least 5 hours in the first week alone.",
  },
  {
    initials: "ES",
    color: "#16A34A",
    name: "Eitan S.",
    role: "Operations Lead · Tel Aviv",
    quote: "I'd tried ChatGPT before and got nowhere. Sam came to the session already knowing my business and built something that actually works for how I operate. I use it every single day.",
  },
  {
    initials: "NK",
    color: "#DC2626",
    name: "Noa K.",
    role: "Freelance Operations Consultant · Tel Aviv",
    quote: "Genuinely the most practical 60 minutes I've invested in my career this year. No fluff, no theory. Just a real working solution I could use before I even closed my laptop.",
  },
];

function Avatar({ t }) {
  return (
    <div style={{ width: 48, height: 48, borderRadius: "50%", background: t.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>
      {t.initials}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cardHeight, setCardHeight] = useState(null);
  const intervalRef = useRef(null);
  const touchStartX = useRef(null);
  const swiped = useRef(false);
  const cardRefs = useRef([]);

  const next = useCallback(() => setCurrent(p => (p + 1) % testimonials.length), []);
  const prev = useCallback(() => setCurrent(p => (p - 1 + testimonials.length) % testimonials.length), []);

  const handleArrow = useCallback((dir) => {
    setPaused(true);
    clearInterval(intervalRef.current);
    if (dir === "next") next(); else prev();
  }, [next, prev]);

  const handleDot = useCallback((i) => {
    setPaused(true);
    clearInterval(intervalRef.current);
    setCurrent(i);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    swiped.current = false;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || swiped.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      swiped.current = true;
      setPaused(true);
      clearInterval(intervalRef.current);
      if (diff > 0) {
        setCurrent(p => (p + 1) % testimonials.length);
      } else {
        setCurrent(p => (p - 1 + testimonials.length) % testimonials.length);
      }
    }
    touchStartX.current = null;
  };

  useEffect(() => {
    if (!paused) {
      intervalRef.current = setInterval(next, 3000);
    }
    return () => clearInterval(intervalRef.current);
  }, [paused, next]);

  // Measure every slide's natural height and size the card container to the
  // tallest one, so the carousel never overlaps the section below it,
  // regardless of which testimonial (or how much quote text) is active.
  const measureCardHeight = useCallback(() => {
    const heights = cardRefs.current.map((el) => (el ? el.offsetHeight : 0));
    const max = Math.max(0, ...heights);
    if (max > 0) setCardHeight(max);
  }, []);

  useLayoutEffect(() => {
    measureCardHeight();
    window.addEventListener("resize", measureCardHeight);
    window.addEventListener("orientationchange", measureCardHeight);
    return () => {
      window.removeEventListener("resize", measureCardHeight);
      window.removeEventListener("orientationchange", measureCardHeight);
    };
  }, [measureCardHeight]);

  return (
    <section style={{ background: "#0F172A", padding: "40px 0 clamp(32px,7vw,72px)" }}>
      <style>{"@media (max-width: 767px) { .carousel-arrow-btn { display: none !important; } .carousel-nav-row { justify-content: center !important; } }"}</style>
      <div style={{ maxWidth: 700, margin: "0 auto", padding: "0 24px" }}>
        {/* Header */}
        <p style={{ color: "#F97316", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", fontSize: 13, textAlign: "center", marginBottom: 12 }}>
          REAL RESULTS FROM REAL SESSIONS
        </p>
        <h2 style={{ fontSize: "clamp(24px,4vw,38px)", fontWeight: 800, color: "#fff", textAlign: "center", lineHeight: 1.2, marginBottom: 8 }}>
          Working Professionals Who Got Their Time Back
        </h2>
        <p style={{ color: "#94A3B8", textAlign: "center", fontSize: 16, marginBottom: 52, fontStyle: "italic" }}>
          Every client leaves with a ready-to-use solution they can apply the same day. Here's what they said:
        </p>

        {/* Carousel, all screen sizes */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          style={{ userSelect: "none" }}
        >
          {/* Arrows + dots above the card */}
          <div className="carousel-nav-row" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14, padding: "0 2px" }}>
            <button
              className="carousel-arrow-btn"
              onClick={() => handleArrow("prev")}
              aria-label="Previous testimonial"
              style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #F97316", background: "rgba(249,115,22,0.12)", color: "#F97316", fontSize: 20, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            >&#8592;</button>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  aria-label={`Testimonial ${i + 1}`}
                  style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, border: "none", background: i === current ? "#F97316" : "#334155", cursor: "pointer", transition: "all 0.3s", padding: 0 }}
                />
              ))}
            </div>
            <button
              className="carousel-arrow-btn"
              onClick={() => handleArrow("next")}
              aria-label="Next testimonial"
              style={{ width: 44, height: 44, borderRadius: "50%", border: "2px solid #F97316", background: "rgba(249,115,22,0.12)", color: "#F97316", fontSize: 20, cursor: "pointer", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.2s" }}
            >&#8594;</button>
          </div>

          {/* Card */}
          <div style={{ position: "relative", minHeight: cardHeight || 280 }}>
            {testimonials.map((item, i) => (
              <div
                key={i}
                ref={(el) => { cardRefs.current[i] = el; }}
                style={{
                  position: "absolute", top: 0, left: 0, right: 0,
                  transition: "opacity 0.5s ease, transform 0.5s ease",
                  opacity: i === current ? 1 : 0,
                  transform: i === current ? "translateY(0)" : "translateY(12px)",
                  pointerEvents: i === current ? "auto" : "none",
                  background: "#1E293B", borderRadius: 16, padding: "32px 28px",
                  boxShadow: "0 2px 20px rgba(0,0,0,0.3)"
                }}
              >
                <div style={{ fontSize: 36, color: "#F97316", marginBottom: 12, lineHeight: 1 }}>&ldquo;&ldquo;</div>
                <p style={{ color: "#CBD5E1", fontSize: 16, lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>{item.quote}</p>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Avatar t={item} />
                  <div>
                    <div style={{ fontWeight: 700, color: "#fff", fontSize: 15 }}>{item.name}</div>
                    <div style={{ color: "#64748B", fontSize: 13 }}>{item.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
