import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IslamicStar } from "@/components/ornaments/IslamicStar";
import { FloatingParticles } from "@/components/ornaments/FloatingParticles";
import { GoldButton } from "@/components/ornaments/GoldButton";
import mosqueImg from "@/assets/mosque-silhouette.jpg";
import type { Guest } from "@/lib/guest";
import { wedding } from "@/lib/wedding-data";

export function OpeningScreen({ guest, onOpen }: { guest: Guest; onOpen: () => void }) {
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (reduced) {
      setFrame(5);
      return;
    }
    const seq = [400, 1300, 2400, 3500, 4600];
    const timers = seq.map((t, i) => window.setTimeout(() => setFrame(i + 1), t));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-hidden bg-[#0A0907]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.img
        src={mosqueImg}
        alt=""
        aria-hidden
        initial={{ y: "60%", opacity: 0 }}
        animate={{ y: frame >= 2 ? "20%" : "60%", opacity: frame >= 2 ? 0.55 : 0 }}
        transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 h-[70vh] w-full object-cover object-bottom"
      />
      <div className="vignette absolute inset-0" />
      <FloatingParticles count={frame >= 2 ? 30 : 0} />

      {/* Soft pulsing gold halo */}
      {frame >= 1 && (
        <div
          aria-hidden
          className="anim-pulse-glow pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.06) 45%, transparent 70%)",
          }}
        />
      )}

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <AnimatePresence>
          {frame >= 0 && frame < 5 && (
            <motion.div
              key="star"
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: frame >= 3 ? 0.35 : 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
            >
              <div className="relative">
                <div className="anim-rotate-slow">
                  <IslamicStar size={140} />
                </div>
                {/* Drawing gold rings */}
                <svg
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                  width="280"
                  height="280"
                  viewBox="0 0 280 280"
                  aria-hidden
                >
                  <defs>
                    <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FFF3D6" />
                      <stop offset="50%" stopColor="#C9A84C" />
                      <stop offset="100%" stopColor="#8B7355" />
                    </linearGradient>
                  </defs>
                  <circle
                    cx="140" cy="140" r="120"
                    fill="none" stroke="url(#ringGrad)" strokeWidth="1.2"
                    className="anim-draw-ring"
                  />
                  <circle
                    cx="140" cy="140" r="100"
                    fill="none" stroke="url(#ringGrad)" strokeWidth="0.8"
                    opacity="0.6"
                    className="anim-draw-ring"
                    style={{ animationDelay: "0.5s" }}
                  />
                </svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {frame >= 1 && (
            <motion.div
              key="bism"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.4 }}
              className="absolute top-[22%]"
            >
              <p dir="rtl" lang="ar" className="font-arabic gold-shimmer text-3xl sm:text-4xl md:text-5xl">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Script couple names — luxury reveal */}
        <AnimatePresence>
          {frame >= 3 && frame < 5 && (
            <motion.div
              key="names"
              initial={{ opacity: 0, scale: 0.92, filter: "blur(14px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
            >
              <p className="script-luxe text-balance text-5xl leading-[1.05] sm:text-6xl md:text-7xl">
                {wedding.groom.name} &amp; {wedding.bride.name}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {frame >= 4 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2 }}
              className="absolute bottom-[28%] flex flex-col items-center gap-3 px-6"
            >
              <p dir="rtl" lang="ar" className="font-arabic text-xl text-[#E8D5A3] sm:text-2xl">
                أَهْلًا وَسَهْلًا
              </p>
              <p className="font-serif-display text-balance text-2xl italic text-[#FAF8F3] sm:text-3xl">
                Ahlan wa Sahlan,{" "}
                <span className="gold-text not-italic">
                  {guest.name} {guest.honorific}
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {frame >= 5 && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="absolute bottom-[14%]"
            >
              <GoldButton onClick={onOpen}>Open Invitation</GoldButton>
              <p className="mt-4 font-sans-soft text-[10px] uppercase tracking-[0.45em] text-[#E8D5A3]/60">
                Tap to enter
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
