import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import heroBg from "@/assets/hero-bg.jpg";
import { ArabesqueDivider } from "@/components/ornaments/ArabesqueDivider";
import { FloatingParticles } from "@/components/ornaments/FloatingParticles";
import { GoldButton } from "@/components/ornaments/GoldButton";
import { Reveal } from "@/components/ornaments/Reveal";
import { wedding } from "@/lib/wedding-data";
import type { Guest } from "@/lib/guest";

export function Hero({ guest, onRsvp }: { guest: Guest; onRsvp: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2]);

  return (
    <section ref={ref} id="hero" className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#0A0907]">
      <motion.img
        src={heroBg}
        alt=""
        aria-hidden
        style={{ y, scale }}
        className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0A0907]/60 via-[#0A0907]/30 to-[#0A0907]/90" />
      <div className="vignette absolute inset-0 -z-10" />
      <FloatingParticles count={20} />

      <div className="relative mx-auto flex max-w-5xl flex-col items-center px-6 py-24 text-center text-[#FAF8F3]">
        <Reveal>
          <p className="font-sans-soft text-[11px] uppercase tracking-[0.5em] text-[#E8D5A3]/80">
            Together with their families
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <p dir="rtl" lang="ar" className="font-arabic gold-shimmer mt-8 text-3xl sm:text-4xl md:text-5xl">
            {wedding.groom.arabic} &amp; {wedding.bride.arabic}
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <h1 className="font-serif-display mt-6 text-5xl font-light leading-[0.95] tracking-tight sm:text-7xl md:text-[112px]">
            <span className="block">{wedding.groom.name}</span>
            <span className="font-script my-2 block text-4xl text-[#C9A84C] sm:text-5xl md:text-6xl">&amp;</span>
            <span className="block">{wedding.bride.name}</span>
          </h1>
        </Reveal>

        <Reveal delay={0.5}>
          <ArabesqueDivider className="mt-8" />
        </Reveal>

        <Reveal delay={0.6}>
          <p className="font-serif-display mt-6 text-xl italic text-[#E8D5A3]/90 sm:text-2xl">
            invite you to celebrate their wedding
          </p>
        </Reveal>

        <Reveal delay={0.75}>
          <div className="mt-8 grid grid-cols-2 items-center gap-x-10 gap-y-3 font-sans-soft text-[11px] uppercase tracking-[0.35em] text-[#E8D5A3]">
            <div className="text-right">{wedding.dateLabel}</div>
            <div className="text-left">{wedding.venue}</div>
          </div>
        </Reveal>

        <Reveal delay={0.95}>
          <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
            <GoldButton onClick={onRsvp}>RSVP — Qabool Karna</GoldButton>
            <a href="#ceremonies">
              <GoldButton variant="ghost-dark">View Events</GoldButton>
            </a>
          </div>
        </Reveal>

        <Reveal delay={1.1}>
          <p className="mt-10 font-script text-2xl text-[#E8D5A3]/80">
            For {guest.name} {guest.honorific}
          </p>
        </Reveal>
      </div>

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
