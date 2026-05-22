import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Calendar, Clock, MapPin, Shirt, ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Reveal } from "@/components/ornaments/Reveal";
import { ceremonies, type Ceremony } from "@/lib/wedding-data";
import type { Guest } from "@/lib/guest";

function CeremonyIcon({ kind }: { kind: Ceremony["icon"] }) {
  const props = {
    width: 32,
    height: 32,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "#C9A84C",
    strokeWidth: 1.3,
    "aria-hidden": true,
  } as const;
  if (kind === "rings")
    return (
      <svg {...props}>
        <circle cx="12" cy="20" r="6" />
        <circle cx="20" cy="20" r="6" />
        <path d="M10 10 L12 6 L14 10 Z" fill="#C9A84C" />
      </svg>
    );
  if (kind === "henna")
    return (
      <svg {...props}>
        <path d="M16 4 C20 10 22 14 22 20 a6 6 0 1 1 -12 0 c0 -6 2 -10 6 -16 Z" />
        <path d="M16 12 v8 M13 16 h6" />
      </svg>
    );
  if (kind === "feast")
    return (
      <svg {...props}>
        <path d="M4 18 a12 6 0 0 1 24 0 Z" />
        <path d="M16 12 V4 M12 6 L20 6" />
        <path d="M6 22 H26" />
      </svg>
    );
  return (
    <svg {...props}>
      <path d="M22 20 a10 10 0 1 1 -10 -14 a8 8 0 0 0 10 14 Z" />
      <circle cx="24" cy="8" r="1.5" fill="#C9A84C" />
    </svg>
  );
}

function CeremonyCard({ c }: { c: Ceremony }) {
  return (
    <div className="story-card-luxe h-full w-full">
      <div className="relative flex items-start justify-between">
        <div>
          <p dir="rtl" className="font-arabic text-lg text-[#8a6a1f]">
            {c.arabic}
          </p>
          <h3 className="font-script mt-1 text-4xl font-light leading-none tracking-tight text-[#163C32] sm:text-5xl">
            {c.name}
          </h3>
        </div>
        <div className="rounded-full border border-[#C9A84C]/40 bg-white/80 p-2 shadow-[0_4px_14px_-6px_rgba(139,115,85,0.45)]">
          <CeremonyIcon kind={c.icon} />
        </div>
      </div>

      <span aria-hidden className="relative mt-4 block h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent" />

      <ul className="relative mt-4 space-y-2 font-sans-soft text-[13px] text-[#3a2f25]">
        <li className="flex items-center gap-2.5">
          <Calendar className="h-3.5 w-3.5 text-[#C9A84C]" />
          <span>{c.date}</span>
        </li>
        <li className="flex items-center gap-2.5">
          <Clock className="h-3.5 w-3.5 text-[#C9A84C]" />
          <span>{c.time}</span>
        </li>
        <li className="flex items-start gap-2.5">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A84C]" />
          <span>
            <span className="font-serif-display text-sm italic text-[#163C32]">{c.venue}</span>
            <br />
            <span className="text-xs text-[#8B7355]">{c.address}</span>
          </span>
        </li>
        <li className="flex items-start gap-2.5">
          <Shirt className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#C9A84C]" />
          <span>
            <span className="font-sans-soft text-[9px] uppercase tracking-[0.3em] text-[#8B7355]">Dress Code</span>
            <br />
            <span className="font-serif-display text-sm italic text-[#163C32]">{c.dressCode}</span>
          </span>
        </li>
      </ul>

      <div className="relative mt-5">
        <a
          href={c.mapsUrl}
          target="_blank"
          rel="noreferrer"
          className="group/link inline-flex items-center gap-2 font-sans-soft text-[10px] uppercase tracking-[0.3em] text-[#8B7355] border-b border-[#C9A84C]/60 pb-0.5 hover:text-[#163C32] hover:border-[#163C32] transition-colors"
        >
          Get Direction
          <ArrowUpRight className="h-3 w-3 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}

export function Ceremonies({ guest }: { guest: Guest }) {
  const visible = ceremonies.filter((c) => c.id !== "nikah" || guest.nikahAccess);
  const [active, setActive] = useState(0);
  const n = visible.length;
  const go = (dir: 1 | -1) => setActive((p) => (p + dir + n) % n);

  return (
    <section id="ceremonies" className="relative bg-gradient-to-b from-[#163C32] to-[#0F2A24] px-6 py-24 text-[#FAF8F3] sm:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="text-center">
          <Reveal>
            <p className="font-sans-soft text-[11px] uppercase tracking-[0.5em] text-[#E8D5A3]/80">
              The Celebrations
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p dir="rtl" className="font-arabic mt-3 text-3xl text-[#E8D5A3]">
              المُنَاسَبَات
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="wedding-heading mt-4 text-6xl sm:text-7xl md:text-8xl">
              Our Celebrations
            </h2>
          </Reveal>
        </div>

        {/* 3D coverflow carousel */}
        <div
          className="relative mt-16 flex items-center justify-center"
          style={{ perspective: "1600px" }}
        >
          {/* Soft gold glow behind centered card */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{
              background:
                "radial-gradient(closest-side, rgba(232,213,163,0.35), rgba(201,168,76,0.15) 50%, transparent 75%)",
            }}
          />

          <div
            className="relative h-[520px] w-full sm:h-[500px]"
            style={{ transformStyle: "preserve-3d" }}
            onTouchStart={(e) => ((e.currentTarget as any)._x = e.touches[0].clientX)}
            onTouchEnd={(e) => {
              const start = (e.currentTarget as any)._x as number | undefined;
              if (start == null) return;
              const dx = e.changedTouches[0].clientX - start;
              if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
            }}
          >
            {visible.map((c, i) => {
              // signed offset (-n/2..n/2) so we wrap correctly
              let off = i - active;
              if (off > n / 2) off -= n;
              if (off < -n / 2) off += n;
              const abs = Math.abs(off);
              const isActive = off === 0;
              return (
                <motion.button
                  key={c.id}
                  type="button"
                  onClick={() => setActive(i)}
                  aria-label={`Show ${c.name}`}
                  aria-current={isActive}
                  animate={{
                    x: `calc(-50% + ${off * 56}%)`,
                    rotateY: off * -28,
                    scale: isActive ? 1 : 0.78 - Math.min(abs - 1, 1) * 0.08,
                    opacity: abs > 2 ? 0 : isActive ? 1 : 0.55,
                    zIndex: 50 - abs,
                    filter: isActive ? "blur(0px)" : `blur(${Math.min(abs, 2)}px)`,
                  }}
                  transition={{ type: "spring", stiffness: 110, damping: 18, mass: 0.9 }}
                  className="absolute left-1/2 top-1/2 w-[min(360px,86vw)] -translate-y-1/2 cursor-pointer text-left"
                  style={{
                    transformStyle: "preserve-3d",
                    pointerEvents: abs > 1 ? "none" : "auto",
                  }}
                >
                  <CeremonyCard c={c} />
                  {!isActive && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[1.5rem]"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(15,42,36,0.15), rgba(15,42,36,0.5))",
                      }}
                    />
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Prev / Next */}
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous ceremony"
            className="luxe-nav-btn absolute left-2 top-1/2 z-[60] -translate-y-1/2 sm:left-6"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next ceremony"
            className="luxe-nav-btn absolute right-2 top-1/2 z-[60] -translate-y-1/2 sm:right-6"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dots + label */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <AnimatePresence mode="wait">
            <motion.p
              key={visible[active]?.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="font-sans-soft text-[11px] uppercase tracking-[0.4em] text-[#E8D5A3]/90"
            >
              {active + 1} / {n} · {visible[active]?.name}
            </motion.p>
          </AnimatePresence>
          <div className="flex items-center gap-2">
            {visible.map((c, i) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Go to ${c.name}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  i === active
                    ? "w-8 bg-gradient-to-r from-[#FFF3D6] to-[#C9A84C] shadow-[0_0_10px_rgba(232,213,163,0.6)]"
                    : "w-2 bg-[#E8D5A3]/30 hover:bg-[#E8D5A3]/60"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
