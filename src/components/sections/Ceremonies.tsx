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
    "radial-gradient(120% 120% at 0% 0%, rgba(232,107,90,0.35) 0%, rgba(184,80,66,0.25) 35%, rgba(43,27,20,0.85) 75%), linear-gradient(160deg,#3a1410 0%,#1a0907 100%)",
  sangeet:
    "radial-gradient(120% 120% at 100% 0%, rgba(168,85,247,0.28) 0%, rgba(201,168,76,0.18) 40%, rgba(43,27,20,0.85) 80%), linear-gradient(160deg,#1f0f2a 0%,#0c0712 100%)",
  nikah:
    "radial-gradient(120% 120% at 50% 0%, rgba(255,243,214,0.35) 0%, rgba(201,168,76,0.22) 40%, rgba(22,60,50,0.85) 80%), linear-gradient(160deg,#1d2d20 0%,#0a1410 100%)",
  walima:
    "radial-gradient(120% 120% at 0% 100%, rgba(40,88,71,0.45) 0%, rgba(201,168,76,0.18) 45%, rgba(22,60,50,0.9) 85%), linear-gradient(160deg,#0f2a22 0%,#06120e 100%)",
  reception:
    "radial-gradient(120% 120% at 100% 100%, rgba(139,115,85,0.4) 0%, rgba(43,27,20,0.6) 40%, rgba(10,9,7,0.95) 85%), linear-gradient(160deg,#2a1d14 0%,#0a0907 100%)",
  rukhsati:
    "radial-gradient(120% 120% at 50% 100%, rgba(232,213,163,0.35) 0%, rgba(201,168,76,0.18) 40%, rgba(31,22,18,0.92) 85%), linear-gradient(160deg,#241814 0%,#0a0907 100%)",
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

        <div className="mt-16 grid gap-7 sm:grid-cols-2">
          {visible.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="event-card"
            >
              <div
                className="relative overflow-hidden rounded-[1.6rem] p-7 sm:p-9 backdrop-blur-xl"
                style={{
                  background: cardBg[c.id] ?? cardBg.nikah,
                  border: "1px solid rgba(201,168,76,0.30)",
                }}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -z-10"
                  style={{
                    background:
                      "repeating-linear-gradient(45deg, rgba(201,168,76,0.06) 0 2px, transparent 2px 14px)",
                    opacity: 0.5,
                  }}
                />
                <div className="flex items-start justify-between">
                  <div>
                    <p dir="rtl" className="font-arabic text-2xl text-[#E8D5A3]">
                      {c.arabic}
                    </p>
                    <h3 className="font-script mt-1 text-5xl font-light tracking-tight text-[#FFF3D6]">
                      {c.name}
                    </h3>
                  </div>
                  <div className="rounded-full border border-[#C9A84C]/40 bg-[#0A0907]/40 p-3">
                    <CeremonyIcon kind={c.icon} />
                  </div>
                </div>

                <ul className="mt-6 space-y-3 font-sans-soft text-sm text-[#FAF8F3]/85">
                  <li className="flex items-center gap-3">
                    <Calendar className="h-4 w-4 text-[#C9A84C]" />
                    <span>{c.date}</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-[#C9A84C]" />
                    <span>{c.time}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                    <span>
                      <span className="font-serif-display text-base italic text-[#FAF8F3]">{c.venue}</span>
                      <br />
                      <span className="text-[#E8D5A3]/70">{c.address}</span>
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Shirt className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                    <span>
                      <span className="font-sans-soft text-[10px] uppercase tracking-[0.32em] text-[#E8D5A3]/70">Dress Code</span>
                      <br />
                      <span className="font-serif-display text-base italic text-[#FAF8F3]">{c.dressCode}</span>
                    </span>
                  </li>
                </ul>

                <div className="mt-7">
                  <a
                    href={c.mapsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="group/link inline-flex items-center gap-2 font-sans-soft text-[11px] uppercase tracking-[0.32em] text-[#E8D5A3] border-b border-[#C9A84C]/50 pb-1 hover:text-[#FFF3D6] hover:border-[#FFF3D6] transition-colors"
                  >
                    Get Direction
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
