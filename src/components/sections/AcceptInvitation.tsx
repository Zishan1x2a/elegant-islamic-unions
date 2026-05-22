import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Reveal } from "@/components/ornaments/Reveal";
import { Sparkles, X } from "lucide-react";
import type { Guest } from "@/lib/guest";

function Petals() {
  const petals = Array.from({ length: 36 });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {petals.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 4;
        const duration = 6 + Math.random() * 6;
        const drift = (Math.random() - 0.5) * 220;
        const size = 10 + Math.random() * 16;
        const kind = i % 3 === 0 ? "gold" : i % 3 === 1 ? "white" : "";
        return (
          <span
            key={i}
            className={`petal ${kind}`}
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              ["--petal-x" as never]: `${drift}px`,
            }}
          />
        );
      })}
    </div>
  );
}

function Fireworks() {
  // 6 burst origins distributed across the screen, each emitting sparks
  const bursts = Array.from({ length: 7 }).map((_, b) => {
    const top = 18 + Math.random() * 50;
    const left = 8 + Math.random() * 84;
    const delay = b * 0.55 + Math.random() * 0.4;
    const color = b % 3 === 0 ? "rose" : b % 3 === 1 ? "emerald" : "";
    const sparks = Array.from({ length: 18 }).map((_, s) => {
      const angle = (s / 18) * Math.PI * 2;
      const dist = 110 + Math.random() * 70;
      return {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
      };
    });
    return { top, left, delay, color, sparks };
  });
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {bursts.map((b, bi) => (
        <div
          key={bi}
          className="absolute"
          style={{
            top: `${b.top}%`,
            left: `${b.left}%`,
            animation: `firework-core 1.6s ease-out ${b.delay}s infinite`,
          }}
        >
          <span className="firework firework-core" style={{ animationDelay: `${b.delay}s`, animationIterationCount: "infinite" as never, animationDuration: "2.6s" }} />
          {b.sparks.map((s, si) => (
            <span
              key={si}
              className={`firework firework-spark ${b.color}`}
              style={{
                animationDelay: `${b.delay}s`,
                animationIterationCount: "infinite" as never,
                animationDuration: "2.6s",
                ["--fx-x" as never]: `${s.x}px`,
                ["--fx-y" as never]: `${s.y}px`,
              }}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function AcceptInvitation({ guest }: { guest: Guest }) {
  const [done, setDone] = useState(false);

  return (
    <section
      id="rsvp"
      className="relative min-h-full overflow-hidden bg-gradient-to-b from-[#0A1F1A] via-[#11281F] to-[#2B1B14] px-6 py-24 text-[#FAF8F3] sm:py-32"
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(201,168,76,0.18), transparent 55%), radial-gradient(circle at 80% 70%, rgba(40,88,71,0.45), transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <Reveal>
          <p className="font-sans-soft text-[11px] uppercase tracking-[0.5em] text-[#E8D5A3]/85">
            RSVP
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p dir="rtl" className="font-arabic mt-4 text-2xl text-[#C9A84C] sm:text-3xl">
            هَلْ تَقْبَل دَعْوَتَنَا؟
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <h2 className="wedding-heading mt-5 text-6xl sm:text-7xl md:text-8xl">
            Accept the Invitation
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-serif-display mx-auto mt-6 max-w-xl text-lg italic leading-relaxed text-[#E8D5A3]/90">
            Your presence is our greatest dua,{" "}
            <span className="not-italic text-[#FFF3D6]">
              {guest.name}
              {guest.honorific ? ` ${guest.honorific}` : ""}
            </span>
            .
          </p>
        </Reveal>

        <Reveal delay={0.45}>
          <div className="relative mt-12">
            <span aria-hidden className="luxe-cta-pulse-2" />
            <button
              type="button"
              onClick={() => setDone(true)}
              className="luxe-cta"
              aria-label="Accept Invitation"
            >
              <span className="luxe-cta-inner">
                <Sparkles className="h-4 w-4" />
                Accept Invitation
              </span>
            </button>
          </div>
        </Reveal>

        <Reveal delay={0.6}>
          <p className="font-sans-soft mt-10 text-[10px] uppercase tracking-[0.5em] text-[#E8D5A3]/60">
            14 . 11 . 2026 — In sha Allah
          </p>
        </Reveal>
      </div>

      <AnimatePresence>
        {done ? (
          <motion.div
            className="fixed inset-0 z-[120] flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#06112B]/85 backdrop-blur-xl" />
            <Petals />
            <Fireworks />
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl p-[1.5px]"
              style={{
                background:
                  "conic-gradient(from 0deg,#FFF3D6,#C9A84C,#8B7355,#C9A84C,#FFF3D6)",
              }}
            >
              <div className="relative rounded-3xl bg-gradient-to-b from-[#0A1F1A] via-[#11281F] to-[#0A0907] p-10 text-center">
                <button
                  type="button"
                  onClick={() => setDone(false)}
                  aria-label="Close"
                  className="absolute right-4 top-4 rounded-full border border-[#C9A84C]/50 p-1.5 text-[#C9A84C] transition hover:bg-[#C9A84C]/15"
                >
                  <X className="h-4 w-4" />
                </button>

                <motion.div
                  initial={{ scale: 0, rotate: -90 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 160, damping: 14 }}
                  className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/15"
                >
                  <Sparkles className="h-7 w-7 text-[#FFF3D6]" />
                </motion.div>

                <p dir="rtl" className="font-arabic mt-6 text-2xl text-[#C9A84C]">
                  جَزَاكَ اللهُ خَيْرًا
                </p>
                <h3 className="wedding-heading mt-3 text-5xl sm:text-6xl">
                  Thank You
                </h3>
                <p className="font-serif-display mt-4 text-lg italic leading-relaxed text-[#E8D5A3]/90">
                  Your blessing has been received,
                  <br />
                  <span className="not-italic text-[#FFF3D6]">
                    {guest.name}
                    {guest.honorific ? ` ${guest.honorific}` : ""}
                  </span>
                  .
                </p>
                <p className="font-sans-soft mt-6 text-[10px] uppercase tracking-[0.45em] text-[#E8D5A3]/70">
                  We await your presence ✦ In sha Allah
                </p>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}