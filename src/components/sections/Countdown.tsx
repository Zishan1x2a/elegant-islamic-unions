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

export function Countdown() {
  const target = new Date(wedding.dateISO);
  const [t, setT] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  useEffect(() => {
    setT(diff(target));
    const id = window.setInterval(() => setT(diff(target)), 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const cards: Array<[string, string, number]> = [
    ["Days", "أَيَّام", t.days],
    ["Hours", "سَاعَات", t.hours],
    ["Minutes", "دَقَائِق", t.minutes],
    ["Seconds", "ثَوَانٍ", t.seconds],
  ];

  return (
    <section id="countdown" className="relative overflow-hidden bg-gradient-to-b from-[#0F2A24] to-[#2B1B14] px-6 py-24 text-[#FAF8F3] sm:py-32">
      <FloatingParticles count={28} />
      <Lantern className="absolute left-6 top-10 opacity-80 sm:left-12" />
      <Lantern className="absolute right-6 top-16 opacity-80 sm:right-12" />

      <div className="relative mx-auto max-w-5xl">
        <SectionHeading eyebrow="The Countdown" arabic="العَدُّ التَّنَازُلِيّ" title="Until We Say Qabool" />

        <div className="mt-16 grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4">
          {cards.map(([label, ar, value]) => (
            <div key={label} className="glass-card-dark gold-border-glow relative overflow-hidden rounded-2xl p-5 text-center sm:p-7">
              <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
              <p dir="rtl" className="font-arabic text-sm text-[#C9A84C] sm:text-base">
                {ar}
              </p>
              <div className="mt-2 h-14 sm:h-20">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={value}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.5 }}
                    className="block font-serif-display text-5xl font-light leading-none gold-text sm:text-6xl md:text-7xl"
                  >
                    {String(value).padStart(2, "0")}
                  </motion.span>
                </AnimatePresence>
              </div>
              <p className="mt-3 font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#E8D5A3]/80">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
