import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Shirt, ArrowUpRight } from "lucide-react";
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

// Rich per-event backgrounds matched to the ceremony's mood
const cardBg: Record<string, string> = {
  mehndi:
    "radial-gradient(120% 120% at 0% 0%, rgba(255,210,190,0.55) 0%, rgba(250,225,205,0.5) 45%, rgba(252,244,232,0.95) 85%), linear-gradient(160deg,#fff5ec 0%,#fbeadd 100%)",
  sangeet:
    "radial-gradient(120% 120% at 100% 0%, rgba(220,200,250,0.5) 0%, rgba(240,225,200,0.45) 45%, rgba(252,247,238,0.95) 85%), linear-gradient(160deg,#f7f1ff 0%,#fbf3e6 100%)",
  nikah:
    "radial-gradient(120% 120% at 50% 0%, rgba(255,243,214,0.7) 0%, rgba(220,235,220,0.5) 45%, rgba(248,250,244,0.95) 85%), linear-gradient(160deg,#f4faf2 0%,#eef5ec 100%)",
  walima:
    "radial-gradient(120% 120% at 0% 100%, rgba(190,225,205,0.55) 0%, rgba(240,228,200,0.45) 45%, rgba(246,251,244,0.95) 85%), linear-gradient(160deg,#eff8f1 0%,#f7f1e3 100%)",
  reception:
    "radial-gradient(120% 120% at 100% 100%, rgba(230,210,180,0.6) 0%, rgba(245,232,210,0.5) 45%, rgba(252,246,236,0.95) 85%), linear-gradient(160deg,#fbf3e6 0%,#f5e8d0 100%)",
  rukhsati:
    "radial-gradient(120% 120% at 50% 100%, rgba(248,236,210,0.65) 0%, rgba(238,224,210,0.5) 45%, rgba(252,247,240,0.95) 85%), linear-gradient(160deg,#fdf6ea 0%,#f4e8da 100%)",
};

export function Ceremonies({ guest }: { guest: Guest }) {
  const visible = ceremonies.filter((c) => c.id !== "nikah" || guest.nikahAccess);
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

        {/* Wave timeline (mirrors Our Story) */}
        <div className="relative mt-20">
          {/* Curved gold path (desktop) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-full w-full md:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 1200"
          >
            <defs>
              <linearGradient id="ceremoniesPath" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#E8D5A3" stopOpacity="0" />
                <stop offset="20%" stopColor="#E8D5A3" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#E8D5A3" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#E8D5A3" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 500 0 C 200 200, 800 350, 500 520 C 200 690, 800 860, 500 1030 C 350 1110, 500 1180, 500 1200"
              fill="none"
              stroke="url(#ceremoniesPath)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
          </svg>
          {/* Mobile vertical line */}
          <span
            aria-hidden
            className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#E8D5A3]/50 to-transparent md:hidden"
          />

          <ol className="space-y-14 md:space-y-20">
            {visible.map((c, i) => {
              const isLeft = i % 2 === 0;
              const waveOffset = isLeft ? "md:-translate-y-2" : "md:translate-y-10";
              return (
                <li key={c.id} className="relative md:grid md:grid-cols-2 md:gap-16">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                    className="absolute left-6 top-2 -translate-x-1/2 md:left-1/2"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF3D6] to-[#C9A84C] ring-4 ring-[#163C32] shadow-[0_0_18px_rgba(232,213,163,0.55)]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#2B1B14]" />
                    </div>
                  </motion.div>

                  <Reveal
                    delay={i * 0.08}
                    className={`pl-14 md:pl-0 ${waveOffset} ${
                      isLeft ? "md:pr-16" : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <article className="event-card">
              <div className="story-card-luxe transition-transform duration-500 hover:-translate-y-1.5 hover:rotate-[-0.3deg]">
                <div className="relative flex items-start justify-between">
                  <div>
                    <p dir="rtl" className="font-arabic text-lg text-[#8a6a1f]">
                      {c.arabic}
                    </p>
                    <h3 className="font-script mt-1 text-4xl font-light leading-none tracking-tight text-[#163C32]">
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
                    </article>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
