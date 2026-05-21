import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Shirt, ExternalLink } from "lucide-react";
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

const accentBg: Record<Ceremony["accent"], string> = {
  gold: "from-[#E8D5A3]/30 to-[#C9A84C]/10",
  emerald: "from-[#285847]/15 to-[#163C32]/5",
  rose: "from-[#B85042]/15 to-[#E8D5A3]/10",
  oud: "from-[#2B1B14]/15 to-[#8B7355]/10",
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
            <h2 className="font-serif-display mt-3 text-5xl font-light leading-[1] sm:text-6xl">
              Join us across <span className="gold-text italic">four nights</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2" style={{ perspective: "1200px" }}>
          {visible.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 1, y: 60, filter: "blur(24px)", scale: 0.92, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(1px)", scale: 1, rotateX: 0 }}
              whileHover={{ scale: 1.03, rotateY: i % 2 === 1 ? 4 : -4, rotateX: -2, filter: "blur(1px) brightness(1.08)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, delay: i * 0.18, ease: [1.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="glass-card-dark gold-border-glow relative rounded-3xl p-7 transition-shadow duration-500 group-hover:shadow-[0_0_60px_-10px_rgba(201,168,76,0.45)] sm:p-9">
                <span className="absolute inset-x-0 top-2 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent group-hover:scale-x-75 group-hover:transition-transform group-hover:duration-700" />
                <div aria-hidden className={`absolute inset-0 -z-10 bg-gradient-to-br ${accentBg[c.accent]} opacity-60 transition-opacity duration-500 group-hover:opacity-90`} />

                {/* hover shine sweep */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/6 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />

                <div className="flex items-start justify-between">
                  <div>
                    <p dir="rtl" className="font-arabic text-2xl text-[#E8D5A3]">
                      {c.arabic}
                    </p>
                    <h3 className="font-serif-display mt-1 text-4xl font-light tracking-tight transition-colors duration-500 group-hover:text-[#FFF3D6]">
                      {c.name}
                    </h3>
                  </div>
                  <div className="rounded-full border border-[#C9A84C]/40 bg-[#0A0907]/40 p-3 transition-all duration-500 group-hover:scale-110 group-hover:border-[#C9A84C]/80 group-hover:shadow-[0_0_20px_rgba(201,168,76,0.35)] group-hover:rotate-12">
                    <CeremonyIcon kind={c.icon} />
                  </div>
                </div>

                <ul className="mt-6 space-y-3 font-sans-soft text-sm text-[#FAF8F3]/85">
                  <li className="flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-1">
                    <Calendar className="h-4 w-4 text-[#C9A84C] transition-transform duration-500 group-hover:scale-110" />
                    <span className="transition-colors duration-500 group-hover:text-[#FAF8F3]">{c.date}</span>
                  </li>
                  <li className="flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-1" style={{ transitionDelay: "0.05s" }}>
                    <Clock className="h-4 w-4 text-[#C9A84C] transition-transform duration-500 group-hover:scale-110" />
                    <span className="transition-colors duration-500 group-hover:text-[#FAF8F3]">{c.time}</span>
                  </li>
                  <li className="flex items-start gap-3 transition-transform duration-500 group-hover:translate-x-1" style={{ transitionDelay: "0.1s" }}>
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C] transition-transform duration-500 group-hover:scale-110" />
                    <span>
                      <span className="font-serif-display text-base italic text-[#FAF8F3]">{c.venue}</span>
                      <br />
                      <span className="text-[#E8D5A3]/70">{c.address}</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3 transition-transform duration-500 group-hover:translate-x-1" style={{ transitionDelay: "0.15s" }}>
                    <Shirt className="h-4 w-4 text-[#C9A84C] transition-transform duration-500 group-hover:scale-110" />
                    <span className="transition-colors duration-500 group-hover:text-[#FAF8F3]">{c.dressCode}</span>
                  </li>
                </ul>

                <a
                  href={c.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/50 px-5 py-2.5 font-sans-soft text-[11px] uppercase tracking-[0.32em] text-[#E8D5A3] transition-all duration-500 hover:bg-[#C9A84C]/20 hover:shadow-[0_0_30px_-5px_rgba(201,168,76,0.4)] hover:border-[#C9A84C]/80"
                >
                  Open in Maps
                  <ExternalLink className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
