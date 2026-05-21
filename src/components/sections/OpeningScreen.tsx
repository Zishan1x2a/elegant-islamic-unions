import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { IslamicStar } from "@/components/ornaments/IslamicStar";
import { FloatingParticles } from "@/components/ornaments/FloatingParticles";
import { GoldButton } from "@/components/ornaments/GoldButton";
import mosqueImg from "@/assets/mosque-silhouette.jpg";
import type { Guest } from "@/lib/guest";

export function OpeningScreen({ guest, onOpen }: { guest: Guest; onOpen: () => void }) {
  const reduced = useReducedMotion();
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (reduced) {
      setFrame(4);
      return;
    }
    const seq = [400, 1300, 2500, 3800];
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

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        <AnimatePresence>
          {frame >= 0 && frame < 4 && (
            <motion.div
              key="star"
              initial={{ opacity: 0, scale: 0.6, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute"
            >
              <div className="anim-rotate-slow">
                <IslamicStar size={120} />
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

        <AnimatePresence>
          {frame >= 3 && (
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
          {frame >= 4 && (
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
