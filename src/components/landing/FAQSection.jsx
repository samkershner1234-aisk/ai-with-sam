import { useState, useEffect } from "react";
import { CTA_URL } from "./constants";

const faqs=[
  {q:"What will we work on during the session?",a:"We focus on one recurring or time-consuming task from your job and build a useful set of prompts or a clearer process around it."},
  {q:"Is this general AI training?",a:"No. This is not a general AI course. We work on one real problem from your job and build a practical solution around it."},
  {q:"What if I've never used AI before?",a:"Even better. Clients who have never used AI before often get the most out of this because we build something from scratch that fits exactly how they already work. No prior knowledge needed."},
  {q:"What does Results Guaranteed mean?",a:"You'll leave with at least one usable AI solution or prompt for your real work, or I'll extend the session by up to 30 minutes at no charge."},
  {q:"Will I definitely save a specific number of hours?",a:"The workflow is designed to help reduce repetitive work and reclaim time, but the exact time saved depends on your task, how often you use it, and how you implement it."},
  {q:"Can we work on several tasks?",a:"The session is designed to focus on one high-value task or workflow so we can create something useful rather than rushing through several problems."},
  {q:"What does a typical session look like?",a:"We start on Google Meet with a quick 5-minute overview of what I've prepared based on your role. Then we spend 50 to 55 minutes building your solution live. You watch, ask questions, and by the end you have something working."},
  {q:"Do I need to prepare anything before the session?",a:"Just come ready to describe how you work and the one task you want to improve. The more specific you can be about your day-to-day tasks, the more useful the workflow I build will be. No software to install. No materials to read."},
  {q:"What happens after the session?",a:"You receive a full recording of the session, a written recap document with all your prompts and next steps, and 14 days of direct WhatsApp access to me. Got a prompt that's not working, or a new task to work on? Message me directly. Not a ticket system. Direct access."},
  {q:"What if I want more support after the 14 days?",a:"Just message me on WhatsApp. Most clients find that 14 days is more than enough, but if you need more time or a follow-up session, we can arrange that."},
  {q:"How do I book?",a:"Click any 'Book Your Free 20-Minute Call' button on this page. You'll land on a short booking form. Pick a time that works for you. I'll send a confirmation and a few questions about your role beforehand."},
  {q:"What is one-to-one AI coaching?",a:"It is a live, personalised session where we take one real, recurring task from your job and build a working AI-powered process around it, rather than teaching AI concepts in the abstract or running a generic course."},
  {q:"What's the difference between this and hiring an AI consultant?",a:"A consultant usually scopes and delivers a project for you over days or weeks. This is faster and more hands-on: you sit with me for one session and leave already knowing how to run the workflow yourself."},
  {q:"Do you work with teams as well as individuals?",a:"Yes. Alongside 1-to-1 sessions, we also run a small pilot program for teams who want to test AI adoption together before rolling it out further."},
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section id="faq" style={{ background: "#0F172A", padding: isMobile ? "36px 24px 0" : "48px 24px 0" }}>
      <div style={{ maxWidth: "700px", margin: "0 auto" }}>
        <h2 style={{ fontSize: "clamp(24px,3.5vw,36px)", fontWeight: 800, color: "#fff", textAlign: "center", marginBottom: 40, lineHeight: 1.2 }}>
          Still on the Fence? Here's What Others Asked First.
        </h2>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: "1px solid rgba(255,255,255,0.08)", padding: "18px 0" }}>
            <button
              onClick={() => setOpen(open === i ? null : i)}
              style={{ width: "100%", background: "none", border: "none", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, textAlign: "left" }}
            >
              <span style={{ fontWeight: 600, fontSize: isMobile ? 15 : 17, color: "#fff", lineHeight: 1.4 }}>{faq.q}</span>
              <span style={{ color: "#F97316", fontSize: 22, fontWeight: 700, flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
            </button>
            {open === i && (
              <p style={{ color: "#94A3B8", fontSize: isMobile ? 14 : 16, lineHeight: 1.7, marginTop: 12, paddingRight: 32 }}>{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
