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
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

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

      {/* Soft gold halo behind the title */}
      <div
        aria-hidden
        className="anim-pulse-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[60vmin] w-[60vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.28) 0%, rgba(201,168,76,0.08) 40%, transparent 70%)",
        }}
      />

      <motion.div style={{ opacity }} className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center text-[#FAF8F3]">
        <Reveal>
          <p className="font-sans-soft text-[11px] uppercase tracking-[0.5em] text-[#E8D5A3]/80">
            Together with their beloved families
          </p>
        </Reveal>

        {/* Quranic ayah */}
        <Reveal delay={0.15}>
          <p dir="rtl" lang="ar" className="font-arabic gold-shimmer mt-8 text-2xl sm:text-3xl md:text-4xl">
            وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <p className="font-serif-display mx-auto mt-5 max-w-2xl text-balance text-base italic text-[#FAF8F3]/85 sm:text-lg">
            "And of His signs is that He created for you mates from among yourselves,
            that you may find tranquility in them."
          </p>
          <p className="mt-2 font-sans-soft text-[10px] uppercase tracking-[0.5em] text-[#E8D5A3]/80">
            — Qur'an 30:21
          </p>
        </Reveal>

        {/* Script title — couple name like reference */}
        <motion.h1
          initial={{ opacity: 0, y: 40, filter: "blur(18px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="script-luxe mt-10 text-balance text-6xl leading-[1.05] sm:text-7xl md:text-8xl lg:text-[120px]"
        >
          {wedding.groom.name} &amp; {wedding.bride.name}
        </motion.h1>

        <Reveal delay={0.8}>
          <p dir="rtl" lang="ar" className="font-arabic mt-3 text-xl text-[#E8D5A3] sm:text-2xl">
            {wedding.groom.arabic} &amp; {wedding.bride.arabic}
          </p>
        </Reveal>

        <Reveal delay={0.9}>
          <ArabesqueDivider className="mt-8" />
        </Reveal>

        {/* Couple definition — two columns about groom & bride */}
        <div className="mt-14 grid w-full grid-cols-1 items-start gap-10 md:grid-cols-[1fr_auto_1fr] md:gap-6">
          <Reveal delay={1.0}>
            <div className="text-center md:text-right">
              <p className="font-sans-soft text-[10px] uppercase tracking-[0.45em] text-[#E8D5A3]/70">
                The Groom
              </p>
              <p className="font-script mt-3 text-5xl text-[#FFF3D6] sm:text-6xl">
                {wedding.groom.name}
              </p>
              <p className="font-serif-display mt-2 text-base italic text-[#E8D5A3]">
                Son of the {wedding.groom.family} Family
              </p>
              <p className="font-serif-display mx-auto mt-4 max-w-xs text-balance text-sm leading-relaxed text-[#FAF8F3]/75 md:mx-0 md:ml-auto">
                A man of quiet faith and gentle conviction — a hafidh of memories,
                a seeker of sakeenah, and now, by Allah's grace, a husband-to-be.
              </p>
            </div>
          </Reveal>

          <Reveal delay={1.1}>
            <div className="flex h-full flex-col items-center justify-center">
              <span className="h-24 w-px bg-gradient-to-b from-transparent via-[#C9A84C] to-transparent" />
              <p className="font-script my-3 text-5xl text-[#C9A84C]">&amp;</p>
              <span className="h-24 w-px bg-gradient-to-b from-[#C9A84C] via-[#C9A84C] to-transparent" />
            </div>
          </Reveal>

          <Reveal delay={1.2}>
            <div className="text-center md:text-left">
              <p className="font-sans-soft text-[10px] uppercase tracking-[0.45em] text-[#E8D5A3]/70">
                The Bride
              </p>
              <p className="font-script mt-3 text-5xl text-[#FFF3D6] sm:text-6xl">
                {wedding.bride.name}
              </p>
              <p className="font-serif-display mt-2 text-base italic text-[#E8D5A3]">
                Daughter of the {wedding.bride.family} Family
              </p>
              <p className="font-serif-display mx-auto mt-4 max-w-xs text-balance text-sm leading-relaxed text-[#FAF8F3]/75 md:mx-0 md:mr-auto">
                A soul wrapped in modesty and noor — keeper of barakah, lover of
                Qur'an, and the answered du'a of two families.
              </p>
            </div>
          </Reveal>
        </div>

        <Reveal delay={1.4}>
          <p className="font-script mt-14 text-3xl text-[#E8D5A3] sm:text-4xl">
            invite you to celebrate their union
          </p>
        </Reveal>

        <Reveal delay={1.5}>
          <div className="mt-6 grid grid-cols-2 items-center gap-x-10 gap-y-3 font-sans-soft text-[11px] uppercase tracking-[0.35em] text-[#E8D5A3]">
            <div className="text-right">{wedding.dateLabel}</div>
            <div className="text-left">{wedding.venue}</div>
          </div>
        </Reveal>

        <Reveal delay={1.6}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <GoldButton onClick={onRsvp}>RSVP — Qabool Karna</GoldButton>
            <a href="#ceremonies">
              <GoldButton variant="ghost-dark">View Events</GoldButton>
            </a>
          </div>
        </Reveal>

        <Reveal delay={1.75}>
          <p className="mt-10 font-script text-3xl text-[#E8D5A3]/85 sm:text-4xl">
            For {guest.name} {guest.honorific}
          </p>
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
