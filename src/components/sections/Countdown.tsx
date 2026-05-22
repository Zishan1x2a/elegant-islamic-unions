import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lantern } from "@/components/ornaments/Lantern";
import { SectionHeading } from "@/components/ornaments/SectionHeading";
import { FloatingParticles } from "@/components/ornaments/FloatingParticles";
import { wedding } from "@/lib/wedding-data";

function diff(target: Date) {
  const ms = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor((ms / 3600000) % 24),
    minutes: Math.floor((ms / 60000) % 60),
    seconds: Math.floor((ms / 1000) % 60),
  };
}

const MAX = { days: 365, hours: 24, minutes: 60, seconds: 60 } as const;

function RingTimer({
  value,
  max,
  label,
  arabic,
}: {
  value: number;
  max: number;
  label: string;
  arabic: string;
}) {
  const R = 70;
  const C = 2 * Math.PI * R;
  const pct = Math.min(1, value / max);
  const dash = C * pct;

  return (
    <div className="relative flex flex-col items-center">
      <div className="relative">
        {/* outer glow */}
        <div className="anim-pulse-glow pointer-events-none absolute inset-0 -m-3 rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.35),transparent_70%)]" />
        <svg width="180" height="180" viewBox="0 0 180 180" className="drop-shadow-[0_0_18px_rgba(201,168,76,0.35)]">
          <defs>
            <linearGradient id={`grad-${label}`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#FFF3D6" />
              <stop offset="50%" stopColor="#C9A84C" />
              <stop offset="100%" stopColor="#8B7355" />
            </linearGradient>
          </defs>
          {/* track */}
          <circle cx="90" cy="90" r={R} fill="none" stroke="rgba(201,168,76,0.15)" strokeWidth="3" />
          {/* progress */}
          <motion.circle
            cx="90"
            cy="90"
            r={R}
            fill="none"
            stroke={`url(#grad-${label})`}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${C}`}
            transform="rotate(-90 90 90)"
            initial={{ strokeDasharray: `0 ${C}` }}
            animate={{ strokeDasharray: `${dash} ${C}` }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          />
          {/* decorative dots */}
          {[0, 90, 180, 270].map((deg) => (
            <circle
              key={deg}
              cx={90 + R * Math.cos((deg * Math.PI) / 180)}
              cy={90 + R * Math.sin((deg * Math.PI) / 180)}
              r="2.5"
              fill="#C9A84C"
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p dir="rtl" className="font-arabic text-xs text-[#C9A84C]/80">
            {arabic}
          </p>
          <div className="h-12">
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ opacity: 0, y: 12, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                transition={{ duration: 0.4 }}
                className="block font-serif-display text-4xl font-light leading-none gold-text"
              >
                {String(value).padStart(2, "0")}
              </motion.span>
            </AnimatePresence>
          </div>
        </div>
      </div>
      <p className="mt-4 font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#E8D5A3]/80">
        {label}
      </p>
    </div>
  );
}

export function Countdown() {
  const target = new Date(wedding.dateISO);
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setT(diff(target));
    const id = window.setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const items: Array<[keyof typeof MAX, string, string]> = [
    ["days", "Days", "أَيَّام"],
    ["hours", "Hours", "سَاعَات"],
    ["minutes", "Minutes", "دَقَائِق"],
    ["seconds", "Seconds", "ثَوَانٍ"],
  ];

  return (
    <section
      id="countdown"
      className="relative overflow-hidden bg-transparent px-6 py-24 text-[#FAF8F3] sm:py-32"
    >
      <FloatingParticles count={32} />
      <Lantern className="absolute left-6 top-10 opacity-80 sm:left-12" />
      <Lantern className="absolute right-6 top-16 opacity-80 sm:right-12" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading eyebrow="The Countdown" arabic="العَدُّ التَّنَازُلِيّ" title="Until We Say Qabool" />

        <div className="mt-16 grid grid-cols-2 gap-8 sm:gap-10 md:grid-cols-4">
          {items.map(([key, label, arabic]) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <RingTimer value={t[key]} max={MAX[key]} label={label} arabic={arabic} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}