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

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_42%,rgba(249,115,22,0.18)_0%,rgba(5,8,22,0)_34%),linear-gradient(180deg,#050816_0%,#0B1020_45%,#050816_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.03)_0%,transparent_50%)]" />

      <div className="relative mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-6 py-10 md:px-14 md:py-16">
        <div className="grid w-full grid-cols-1 items-center gap-10 md:grid-cols-[1.05fr_0.95fr] md:gap-6">

          <div className="z-10 max-w-3xl">
            <div className="mb-5 text-[13px] font-semibold uppercase tracking-[0.24em] text-white/85 md:mb-7">
              AI With Sam
            </div>

            <h1 className="max-w-2xl text-[clamp(44px,6.8vw,100px)] font-black leading-[0.92] tracking-[-0.07em]">
              <span className="block text-white">Stop busywork.</span>
              <span className="mt-2 block text-[#F97316]">Start impact.</span>
            </h1>

            <p className="mt-6 max-w-xl text-[16px] leading-7 text-white/75 md:mt-8 md:text-[19px] md:leading-8">
              One live session. A custom AI system built for your exact role.
              You use it the same day.
            </p>

            <div className="mt-8 space-y-4 md:mt-10">
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

            <div className="mt-9 md:mt-10">
              <a
                href={CTA_URL}
                className="inline-flex h-14 items-center rounded-full bg-[#F97316] px-8 text-[16px] font-bold text-white shadow-[0_18px_40px_rgba(249,115,22,0.24)] transition hover:bg-[#EA5A0C]"
              >
                Save My Spot →
              </a>
            </div>
          </div>

          <div className="relative flex min-h-[430px] items-center justify-center md:min-h-[760px]">
            <div className="absolute h-[330px] w-[330px] rounded-full border border-white/5 md:h-[720px] md:w-[720px]" />
            <div className="absolute h-[300px] w-[300px] rounded-full border border-[#F97316]/10 md:h-[650px] md:w-[650px]" />

            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
              className="absolute h-[278px] w-[278px] rounded-full border-[10px] border-transparent border-r-[#FFCF9B] border-t-[#FFB466]/50 md:h-[570px] md:w-[570px]"
              style={{
                transform: "rotate(18deg)",
                filter: "drop-shadow(0 0 20px rgba(249,115,22,0.58))",
              }}
            />

            <div className="absolute h-[290px] w-[290px] rounded-full md:h-[610px] md:w-[610px]">
              {Array.from({ length: 16 }).map((_, i) => {
                const angle = -122 + i * 18;
                const strong = i % 4 === 0;
                return (
                  <span
                    key={i}
                    className="absolute left-1/2 top-1/2 block rounded-full"
                    style={{
                      width: strong ? 18 : 10,
                      height: strong ? 4 : 3,
                      background: strong
                        ? "rgba(255,160,80,0.95)"
                        : "rgba(255,160,80,0.30)",
                      transformOrigin: "left center",
                      transform: `rotate(${angle}deg) translateX(${isMobile ? 132 : 258}px)`,
                      boxShadow: "0 0 12px rgba(249,115,22,0.22)",
                      opacity: i < 10 ? 1 : 0.6,
                    }}
                  />
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative z-10 rounded-[28px] bg-black/10 px-5 py-4 text-center backdrop-blur-[3px] md:px-8 md:py-6"
            >
              <div className="mb-2 text-[18px] text-white/85 md:text-[26px]">
                Reclaim
              </div>
              <div className="text-[clamp(72px,12vw,170px)] font-black leading-none tracking-[-0.08em] text-[#FBD7B3] drop-shadow-[0_0_26px_rgba(249,115,22,0.18)]">
                5+
              </div>
              <div className="mt-1 text-[clamp(40px,6vw,92px)] font-extrabold leading-none tracking-[-0.07em] text-[#F97316]">
                hours
              </div>
              <div className="mt-3 text-[18px] text-white/84 md:text-[24px]">
                every week
              </div>
            </motion.div>

            <div className="pointer-events-none absolute inset-0 rounded-full shadow-[0_0_110px_rgba(249,115,22,0.12)_inset]" />
          </div>

        </div>
      </div>
    </section>
  );
}
