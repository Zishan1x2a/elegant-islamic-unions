import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { GoldButton } from "@/components/ornaments/GoldButton";
import { ArabesqueDivider } from "@/components/ornaments/ArabesqueDivider";
import mosqueImg from "@/assets/mosque-silhouette.jpg";
import type { Guest } from "@/lib/guest";
import { wedding } from "@/lib/wedding-data";

const EASE = [0.22, 1, 0.36, 1] as const;

/* Scene timeline (ms from mount):
   0      Dark reveal + ambient drift
   1100   Ring formation
   2600   Diagonal wave + streaks
   4400   Islamic elements (mosque + crescent + pattern)
   5600   Bismillah blur-to-focus
   7000   Couple names + CTA
*/

export function OpeningScreen({ guest, onOpen }: { guest: Guest; onOpen: () => void }) {
  const reduced = useReducedMotion();
  const [scene, setScene] = useState(reduced ? 5 : 0);

  useEffect(() => {
    if (reduced) return;
    const marks = [1100, 2600, 4400, 5600, 7000];
    const timers = marks.map((m, i) => setTimeout(() => setScene(i + 1), m));
    return () => timers.forEach(clearTimeout);
  }, [reduced]);

  // Pre-computed dust particles (client-side only)
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dust = useMemo(
    () =>
      Array.from({ length: 48 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 60 + Math.random() * 40,
        size: Math.random() * 3 + 0.8,
        delay: Math.random() * 6,
        duration: 9 + Math.random() * 8,
        blur: Math.random() * 2,
      })),
    [],
  );

  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-hidden bg-[#040A1C]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(24px)", scale: 1.04, pointerEvents: "none" }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      {/* === Scene 1: Ambient dark backdrop === */}
      <div className="absolute inset-0">
        {/* Drifting gradient blobs */}
        <div
          aria-hidden
          className="anim-ambient-drift absolute -inset-[20%] opacity-70"
          style={{
            background:
              "radial-gradient(40% 35% at 30% 40%, rgba(212,175,55,0.18), transparent 60%), radial-gradient(35% 30% at 70% 60%, rgba(22,60,50,0.35), transparent 65%), radial-gradient(50% 40% at 50% 80%, rgba(20,20,40,0.6), transparent 70%)",
          }}
        />
        {/* Midnight tint base */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#05050A] via-[#08081A]/90 to-[#05050A]" />
        {/* Vignette */}
        <div className="cine-vignette absolute inset-0" />
      </div>

      {/* === Dust particles (depth blur) === */}
      {mounted && (
        <div aria-hidden suppressHydrationWarning className="pointer-events-none absolute inset-0">
          {dust.map((p) => (
            <span
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                top: `${p.y}%`,
                width: p.size,
                height: p.size,
                filter: `blur(${p.blur}px)`,
                background:
                  "radial-gradient(circle, rgba(255,236,179,0.95), rgba(212,175,55,0) 70%)",
                animation: `dust-float ${p.duration}s ease-out ${p.delay}s infinite`,
              }}
            />
          ))}
        </div>
      )}

      {/* === Scene 4: Mosque silhouette (fades in later) === */}
      <motion.img
        src={mosqueImg}
        alt=""
        aria-hidden
        initial={{ opacity: 0, y: 60, scale: 1.1 }}
        animate={scene >= 3 ? { opacity: 0.35, y: 0, scale: 1 } : {}}
        transition={{ duration: 2.4, ease: EASE }}
        className="absolute inset-x-0 bottom-0 h-[60vh] w-full object-cover object-bottom mix-blend-screen"
        style={{ filter: "blur(0.5px) brightness(0.7)" }}
      />

      {/* === Scene 4: Crescent moon === */}
      <AnimatePresence>
        {scene >= 3 && scene < 5 && (
          <motion.div
            key="crescent"
            initial={{ opacity: 0, y: -20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.6, ease: EASE }}
            className="pointer-events-none absolute right-[12%] top-[14%] hidden sm:block"
          >
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
              <defs>
                <radialGradient id="cresGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE9A8" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </radialGradient>
              </defs>
              <circle cx="32" cy="32" r="30" fill="url(#cresGlow)" />
              <path
                d="M44 32a16 16 0 1 1-12-15.5A12 12 0 0 0 44 32z"
                fill="#FFEFC2"
                opacity="0.95"
              />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Scene 2: Luxury ring formation === */}
      <AnimatePresence>
        {scene >= 1 && scene < 5 && (
          <motion.div
            key="ring"
            className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.4, filter: "blur(20px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.5, filter: "blur(30px)" }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            {/* Bloom halo */}
            <div
              className="anim-pulse-glow absolute left-1/2 top-1/2 h-[70vmin] w-[70vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(212,175,55,0.35) 0%, rgba(212,175,55,0.08) 40%, transparent 70%)",
              }}
            />
            <div className="anim-ring-pulse relative">
              <svg width="360" height="360" viewBox="0 0 360 360" className="anim-ring-rotate">
                <defs>
                  <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#FFE9A8" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#8B7355" />
                  </linearGradient>
                  <filter id="ringBlur" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.2" />
                  </filter>
                </defs>
                <circle
                  cx="180" cy="180" r="150"
                  fill="none" stroke="url(#ringGrad)" strokeWidth="1.2"
                  strokeDasharray="2 8" opacity="0.85"
                />
                <circle
                  cx="180" cy="180" r="138"
                  fill="none" stroke="url(#ringGrad)" strokeWidth="0.8"
                  opacity="0.9" filter="url(#ringBlur)"
                />
              </svg>
              <svg
                width="360" height="360" viewBox="0 0 360 360"
                className="anim-ring-rotate-rev absolute inset-0"
              >
                <circle
                  cx="180" cy="180" r="120"
                  fill="none" stroke="#FFEFC2" strokeWidth="0.6"
                  strokeDasharray="1 14" opacity="0.7"
                />
                <circle
                  cx="180" cy="180" r="160"
                  fill="none" stroke="#D4AF37" strokeWidth="0.4"
                  strokeDasharray="0.5 22" opacity="0.5"
                />
              </svg>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* === Scene 3: Diagonal wave + light streaks === */}
      <AnimatePresence>
        {scene >= 2 && scene < 4 && (
          <div key="wave" className="pointer-events-none absolute inset-0 overflow-hidden">
            {/* Wave bloom */}
            <div
              className="anim-wave-diagonal absolute left-1/2 top-1/2 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,233,168,0.55) 0%, rgba(212,175,55,0.2) 35%, transparent 70%)",
              }}
            />
            {/* Gold streaks */}
            {[0, 0.15, 0.32].map((d, i) => (
              <div
                key={i}
                className="anim-streak-diagonal absolute left-1/2 top-1/2 h-[2px] w-[140vmax] origin-center"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, rgba(255,233,168,0) 30%, rgba(255,233,168,0.9) 50%, rgba(212,175,55,0) 70%, transparent 100%)",
                  filter: "blur(1.2px)",
                  animationDelay: `${d}s`,
                  opacity: 0.9 - i * 0.2,
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* === Scene 4: Subtle Islamic geometric pattern === */}
      <AnimatePresence>
        {scene >= 3 && (
          <motion.svg
            key="pattern"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 0.18, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: EASE }}
            className="anim-rotate-slow pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            width="520" height="520" viewBox="0 0 200 200" fill="none"
          >
            <g stroke="#D4AF37" strokeWidth="0.4" fill="none">
              {Array.from({ length: 12 }).map((_, i) => (
                <g key={i} transform={`rotate(${i * 30} 100 100)`}>
                  <polygon points="100,30 112,52 100,74 88,52" />
                  <circle cx="100" cy="52" r="14" />
                </g>
              ))}
              <circle cx="100" cy="100" r="90" />
              <circle cx="100" cy="100" r="60" />
            </g>
          </motion.svg>
        )}
      </AnimatePresence>

      {/* === Content layer === */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Scene 5: Bismillah */}
        <AnimatePresence>
          {scene >= 4 && (
            <motion.div
              key="bism"
              initial={{ opacity: 0, top: "50%", y: "-50%" }}
              animate={
                scene >= 5
                  ? { opacity: 1, top: "6%", y: "0%" }
                  : { opacity: 1, top: "50%", y: "-50%" }
              }
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 1.2, ease: EASE }}
              className="absolute inset-x-0"
            >
              <p
                dir="rtl"
                lang="ar"
                className={`font-arabic gold-shimmer anim-blur-focus transition-all duration-700 ${
                  scene >= 5
                    ? "text-xl sm:text-2xl md:text-3xl"
                    : "text-3xl sm:text-5xl md:text-6xl"
                }`}
              >
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
              </p>
              {scene < 5 && (
                <p className="font-sans-soft mt-6 text-[10px] uppercase tracking-[0.55em] text-[#E8D5A3]/70">
                  In the name of Allah, the Most Gracious, the Most Merciful
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scene 6: Welcome + CTA */}
        <AnimatePresence>
          {scene >= 5 && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE }}
              className="flex flex-col items-center"
            >
              <div
                className="anim-fade-up-luxe mb-8 inline-flex items-center gap-3 rounded-full border border-[#D4AF37]/40 bg-[#D4AF37]/5 px-5 py-2 backdrop-blur-md"
                style={{ animationDelay: "0.1s" }}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#D4AF37] anim-pulse-glow" />
                <p className="font-sans-soft text-[10px] uppercase tracking-[0.5em] text-[#E8D5A3]">
                  Preview Guest
                </p>
              </div>

              <p
                className="font-script anim-fade-up-luxe text-3xl text-[#FFF3D6] sm:text-4xl"
                style={{ animationDelay: "0.25s" }}
              >
                {guest.name} {guest.honorific}
              </p>

              <div className="anim-fade-up-luxe mt-10" style={{ animationDelay: "0.5s" }}>
                <p className="font-sans-soft text-[10px] uppercase tracking-[0.5em] text-[#E8D5A3]/70">
                  The wedding of
                </p>
                <h1 className="script-luxe mt-3 text-balance text-6xl leading-[1.05] sm:text-7xl md:text-8xl lg:text-[112px]">
                  {wedding.groom.name} &amp; {wedding.bride.name}
                </h1>
                <ArabesqueDivider className="mt-5" />
                <p className="font-serif-display mt-3 text-lg italic text-[#E8D5A3]/90 sm:text-xl">
                  {wedding.dateLabel}
                </p>
              </div>

              <div className="anim-fade-up-luxe mt-10" style={{ animationDelay: "0.85s" }}>
                <GoldButton onClick={onOpen}>Open Invitation</GoldButton>
                <p className="mt-4 font-sans-soft text-[10px] uppercase tracking-[0.45em] text-[#E8D5A3]/60">
                  Tap to enter
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
