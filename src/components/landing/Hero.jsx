import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CTA_URL } from "./constants";

const badges = [
  { icon: "⏱", text: "Results in 1 session" },
  { icon: "💬", text: "14 days access" },
  { icon: "🛡", text: "5-Hour Guarantee" },
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

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(249,115,22,0.18)_0%,rgba(5,8,22,0)_50%),linear-gradient(180deg,#050816_0%,#0B1020_45%,#050816_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[900px] flex-col items-center justify-center px-6 py-16 text-center">

        {/* Headline */}
        <h1 className="max-w-2xl text-[clamp(44px,6.8vw,100px)] font-black leading-[0.92] tracking-[-0.07em]">
          <span className="block text-white">Get Hours</span>
          <span className="block"><span className="text-[#F97316]">Back.</span></span>
          <span className="block text-white">Every Day.</span>
        </h1>

        {/* Subtext */}
        <p className="mt-6 max-w-xl text-[16px] leading-7 text-white/75 md:mt-8 md:text-[19px] md:leading-8">
          One live session. A custom AI system built for your exact role.
        </p>

        {/* Badges */}
        <div className="mt-8 flex flex-col items-center space-y-4 md:mt-10">
          {badges.map((b) => (
            <div
              key={b.text}
              className="flex items-center gap-3 text-[15px] text-white/75 md:text-[16px]"
            >
              <span className="grid h-7 w-7 place-items-center rounded-full border border-white/10 bg-white/5 text-sm">
                {b.icon}
              </span>
              <span>{b.text}</span>
            </div>
          ))}
        </div>

        {/* Clock graphic — below badges */}
        <div className="mt-10 flex items-center justify-center md:mt-14"
          style={{ width: clockSize + 32, height: clockSize + 32 }}>
          <div className="relative flex items-center justify-center"
            style={{ width: clockSize, height: clockSize }}>

            {/* Outer rings */}
            <div className="absolute rounded-full border border-white/5"
              style={{ width: clockSize, height: clockSize }} />
            <div className="absolute rounded-full border border-[#F97316]/10"
              style={{ width: clockSize * 0.9, height: clockSize * 0.9 }} />

            {/* Spinning arc */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
              className="absolute rounded-full border-[6px] border-transparent border-r-[#FFCF9B] border-t-[#FFB466]/50"
              style={{
                width: clockSize * 0.82,
                height: clockSize * 0.82,
                filter: "drop-shadow(0 0 12px rgba(249,115,22,0.58))",
              }}
            />

            {/* Tick marks */}
            <div className="absolute" style={{ width: clockSize * 0.86, height: clockSize * 0.86 }}>
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

            {/* Center copy */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 rounded-[20px] bg-black/10 text-center backdrop-blur-[3px]"
              style={{ padding: isMobile ? "10px 14px" : "20px 32px" }}
            >
              <div style={{ fontSize: isMobile ? 13 : 22, color: "rgba(255,255,255,0.85)" }}>
                Reclaim
              </div>
              <div
                style={{
                  fontSize: isMobile ? 52 : 110,
                  fontWeight: 900,
                  lineHeight: 1,
                  letterSpacing: "-0.06em",
                  color: "#FBD7B3",
                  filter: "drop-shadow(0 0 18px rgba(249,115,22,0.18))",
                }}
              >
                5+
              </div>
              <div
                style={{
                  fontSize: isMobile ? 30 : 66,
                  fontWeight: 800,
                  lineHeight: 1,
                  letterSpacing: "-0.05em",
                  color: "#F97316",
                }}
              >
                hours
              </div>
              <div style={{ marginTop: 6, fontSize: isMobile ? 13 : 22, color: "rgba(255,255,255,0.84)" }}>
                every week
              </div>
            </motion.div>

            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_60px_rgba(249,115,22,0.10)_inset]" />
          </div>
        </div>

      </div>
    </section>
  );
}
