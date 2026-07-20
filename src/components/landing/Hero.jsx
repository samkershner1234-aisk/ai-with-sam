import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CTA_URL, SAM_PHOTO } from "./constants";

const badges = [
  { icon: "💬", text: "14 Days of WhatsApp Support" },
  { icon: "🛡", text: "Results Guaranteed" },
];

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const clockSize = isMobile ? 200 : 440;
  const tickRadius = isMobile ? 88 : 196;

  const ClockGraphic = (
    <div className="relative flex items-center justify-center"
      style={{ width: clockSize, height: clockSize }}>

      {/* Outer rings, behind everything */}
      <div className="absolute rounded-full border border-white/5"
        style={{ width: clockSize, height: clockSize, zIndex: 0 }} />
      <div className="absolute rounded-full border border-[#F97316]/10"
        style={{ width: clockSize * 0.9, height: clockSize * 0.9, zIndex: 0 }} />

      {/* Center text, rendered BEFORE the arc so arc sits on top */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute z-10 rounded-[20px] bg-black/10 text-center backdrop-blur-[3px]"
        style={{ padding: isMobile ? "10px 14px" : "20px 32px" }}
      >
        <div style={{ fontSize: isMobile ? 13 : 22, color: "rgba(255,255,255,0.85)" }}>
          Reclaim
        </div>
        <div style={{
          fontSize: isMobile ? 52 : 110,
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: "-0.06em",
          color: "#FBD7B3",
          filter: "drop-shadow(0 0 18px rgba(249,115,22,0.18))",
        }}>
          5+
        </div>
        <div style={{
          fontSize: isMobile ? 30 : 66,
          fontWeight: 800,
          lineHeight: 1,
          letterSpacing: "-0.05em",
          color: "#F97316",
        }}>
          hours
        </div>
        <div style={{ marginTop: 6, fontSize: isMobile ? 13 : 22, color: "rgba(255,255,255,0.84)" }}>
          every week
        </div>
      </motion.div>

      {/* Tick marks, on top of center text */}
      <div className="absolute" style={{ width: clockSize * 0.86, height: clockSize * 0.86, zIndex: 20 }}>
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = -122 + i * 18;
          const strong = i % 4 === 0;
          return (
            <span
              key={i}
              className="absolute left-1/2 top-1/2 block rounded-full"
              style={{
                width: strong ? (isMobile ? 10 : 16) : (isMobile ? 6 : 10),
                height: strong ? 3 : 2,
                background: strong
                  ? "rgba(255,160,80,0.95)"
                  : "rgba(255,160,80,0.30)",
                transformOrigin: "left center",
                transform: `rotate(${angle}deg) translateX(${tickRadius}px)`,
                boxShadow: "0 0 8px rgba(249,115,22,0.22)",
                opacity: i < 10 ? 1 : 0.6,
              }}
            />
          );
        })}
      </div>

      {/* Spinning arc, topmost layer */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
        className="absolute rounded-full border-[6px] border-transparent border-r-[#FFCF9B] border-t-[#FFB466]/50"
        style={{
          width: clockSize * 0.82,
          height: clockSize * 0.82,
          filter: "drop-shadow(0 0 12px rgba(249,115,22,0.58))",
          zIndex: 30,
        }}
      />

      <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_60px_rgba(249,115,22,0.10)_inset]"
        style={{ zIndex: 0 }} />
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-[#0F172A] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.12)_0%,rgba(15,23,42,0)_50%)]" />

      {/* ── MOBILE layout ── */}
      <div className="relative flex flex-col items-center px-6 pt-5 pb-4 text-center md:hidden">

        <h1 className="text-[clamp(34px,9.5vw,50px)] font-black leading-[0.95] tracking-[-0.05em]">
          <span className="block text-white">Turn One Repetitive</span>
          <span className="block"><span className="text-[#F97316]">Work Task Into a</span></span>
          <span className="block text-white">Practical AI Workflow.</span>
        </h1>

        <p className="mt-3 max-w-xs text-[16px] leading-6 text-white/75">
          In one 60-minute session, we’ll turn one of your repetitive work tasks into a practical AI workflow you can start using immediately.
        </p>

        <div className="mt-4 flex flex-col items-center">
          <img src={SAM_PHOTO} alt="Sam Kershner" className="h-14 w-14 rounded-full object-cover border-2 border-[#F97316]/60" />
          <p className="mt-1 text-[16px] text-white/60">Built by Sam Kershner, AI Systems Builder.</p>
        </div>

        <div className="mt-3 flex flex-col items-center space-y-2">
          {badges.map((b) => (
            <div key={b.text} className="flex items-center gap-2 text-[13px] text-white/75">
              <span className="grid h-5 w-5 place-items-center rounded-full border border-white/10 bg-white/5 text-[10px]">
                {b.icon}
              </span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-center">
          {ClockGraphic}
        </div>
      </div>

      {/* ── DESKTOP layout ── */}
      <div className="relative mx-auto hidden w-full max-w-[1440px] items-center md:flex md:px-14 md:pt-16 md:pb-8">
        <div className="grid w-full grid-cols-[1.05fr_0.95fr] items-center gap-10">

          <div className="z-10 max-w-3xl">
            <h1 className="max-w-2xl text-[clamp(52px,7.6vw,116px)] font-black leading-[0.92] tracking-[-0.07em]">
              <span className="block text-white">Turn One Repetitive</span>
              <span className="block"><span className="text-[#F97316]">Work Task Into a</span></span>
              <span className="block text-white">Practical AI Workflow.</span>
            </h1>

            <p className="mt-8 max-w-xl text-[19px] leading-8 text-white/75">
              In one 60-minute session, we’ll turn one of your repetitive work tasks into a practical AI workflow you can start using immediately.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <img src={SAM_PHOTO} alt="Sam Kershner" className="h-14 w-14 rounded-full object-cover border-2 border-[#F97316]/60" />
              <p className="text-[16px] leading-tight text-white/60">Built by Sam Kershner,<br />AI Systems Builder.</p>
            </div>

            <div className="mt-10 flex flex-col items-start space-y-4">
              {badges.map((b) => (
                <div key={b.text} className="flex items-center gap-3 text-[16px] text-white/75">
                  <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/5 text-sm">
                    {b.icon}
                  </span>
                  <span>{b.text}</span>
                </div>
              ))}
            </div>
              </div>

          <div className="flex items-center justify-center">
            {ClockGraphic}
          </div>

        </div>
      </div>
    </section>
  );
}
