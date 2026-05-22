import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArabesqueDivider } from "@/components/ornaments/ArabesqueDivider";
import { FloatingParticles } from "@/components/ornaments/FloatingParticles";
import { GoldButton } from "@/components/ornaments/GoldButton";
import { IslamicPattern } from "@/components/ornaments/IslamicPattern";
import { Reveal } from "@/components/ornaments/Reveal";
import { wedding } from "@/lib/wedding-data";
import type { Guest } from "@/lib/guest";

export function Hero({ guest, onRsvp }: { guest: Guest; onRsvp: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative isolate flex min-h-[100svh] flex-col items-center justify-start overflow-hidden bg-gradient-to-b from-[#0A1A3F] via-[#0E2A5C] to-[#06112B] text-[#EAF2FF]"
    >
      <IslamicPattern className="absolute inset-0 -z-10 opacity-[0.07]" />
      <div
        aria-hidden
        className="anim-ambient-drift absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(147,197,253,0.22), transparent 55%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.35), transparent 60%)",
        }}
      />
      <div className="vignette absolute inset-0 -z-10" />
      <FloatingParticles count={28} />

      {/* Soft gold halo */}
      <div
        aria-hidden
        className="anim-pulse-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[65vmin] w-[65vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(147,197,253,0.30) 0%, rgba(59,130,246,0.10) 40%, transparent 70%)",
        }}
      />

      {/* Floating Islamic star ornaments */}
      <motion.div
        aria-hidden
        animate={{ y: [0, -14, 0], rotate: [0, 8, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute left-6 top-24 opacity-40 sm:left-16"
      >
        <svg width="64" height="64" viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="1">
          <polygon points="32,4 39,24 60,24 43,37 50,58 32,46 14,58 21,37 4,24 25,24" />
        </svg>
      </motion.div>
      <motion.div
        aria-hidden
        animate={{ y: [0, 14, 0], rotate: [0, -8, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
        className="pointer-events-none absolute right-6 bottom-32 opacity-40 sm:right-16"
      >
        <svg width="80" height="80" viewBox="0 0 64 64" fill="none" stroke="#C9A84C" strokeWidth="1">
          <polygon points="32,4 39,24 60,24 43,37 50,58 32,46 14,58 21,37 4,24 25,24" />
        </svg>
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pt-10 pb-24 text-center sm:pt-14"
      >
        {/* Bismillah — pinned at the very top */}
        <Reveal>
          <p dir="rtl" lang="ar" className="font-arabic gold-shimmer text-3xl sm:text-4xl md:text-5xl">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
          <p className="mt-3 font-sans-soft text-[10px] uppercase tracking-[0.5em] text-[#93C5FD]/80">
            Bismillah-ir-Rahman-ir-Raheem
          </p>
        </Reveal>

        {/* Dynamic guest name */}
        <Reveal delay={0.2}>
          <div className="mt-12 inline-flex flex-col items-center">
            <span className="font-sans-soft text-[10px] uppercase tracking-[0.5em] text-[#E8D5A3]/70">
              Dearest Guest
            </span>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="gold-border-glow mt-4 rounded-full border border-[#C9A84C]/40 bg-[#0A0907]/30 px-8 py-2.5 backdrop-blur-md"
            >
              <p className="font-script text-3xl text-[#FFF3D6] sm:text-4xl">
                {guest.name} {guest.honorific}
              </p>
            </motion.div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <p className="font-serif-display mx-auto mt-10 max-w-xl text-balance text-base italic leading-relaxed text-[#FAF8F3]/85 sm:text-lg">
            You are cordially invited to celebrate the wedding of
          </p>
        </Reveal>

        {/* Couple name — luxury typography */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(18px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="script-luxe mt-8 text-balance text-6xl leading-[1.05] sm:text-7xl md:text-8xl lg:text-[120px]"
        >
          {wedding.groom.name} &amp; {wedding.bride.name}
        </motion.h1>

        <Reveal delay={0.9}>
          <p dir="rtl" lang="ar" className="font-arabic mt-4 text-xl text-[#E8D5A3] sm:text-2xl">
            {wedding.groom.arabic} &amp; {wedding.bride.arabic}
          </p>
        </Reveal>

        <Reveal delay={1.0}>
          <ArabesqueDivider className="mt-8" />
        </Reveal>

        {/* Quranic ayah */}
        <Reveal delay={1.1}>
          <p className="font-serif-display mx-auto mt-8 max-w-2xl text-balance text-base italic leading-relaxed text-[#FAF8F3]/80 sm:text-lg">
            "And of His signs is that He created for you mates from among yourselves,
            that you may find tranquility in them."
          </p>
          <p className="mt-2 font-sans-soft text-[10px] uppercase tracking-[0.5em] text-[#E8D5A3]/70">
            — Qur'an 30:21
          </p>
        </Reveal>

        <Reveal delay={1.3}>
          <div className="mt-10 grid grid-cols-2 items-center gap-x-10 gap-y-3 font-sans-soft text-[11px] uppercase tracking-[0.35em] text-[#E8D5A3]">
            <div className="text-right">{wedding.dateLabel}</div>
            <div className="text-left">{wedding.venue}</div>
          </div>
        </Reveal>

        <Reveal delay={1.5}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <GoldButton onClick={onRsvp}>Accept Invitation</GoldButton>
            <a href="#ceremonies">
              <GoldButton variant="ghost-dark">View Events</GoldButton>
            </a>
          </div>
        </Reveal>
      </motion.div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <p className="font-sans-soft text-[10px] uppercase tracking-[0.5em] text-[#E8D5A3]/60">Scroll</p>
        <motion.div
          aria-hidden
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mx-auto mt-2 h-8 w-px bg-gradient-to-b from-[#C9A84C] to-transparent"
        />
      </div>
    </section>
  );
}