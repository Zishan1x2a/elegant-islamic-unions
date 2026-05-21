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

        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {visible.map((c, i) => (
            <motion.article
              key={c.id}
              initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <div className="glass-card-dark gold-border-glow relative rounded-3xl p-7 transition-transform duration-500 group-hover:-translate-y-1 sm:p-9">
                <span className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent" />
                <div aria-hidden className={`absolute inset-0 -z-10 bg-gradient-to-br ${accentBg[c.accent]} opacity-60`} />

                <div className="flex items-start justify-between">
                  <div>
                    <p dir="rtl" className="font-arabic text-2xl text-[#E8D5A3]">
                      {c.arabic}
                    </p>
                    <h3 className="font-serif-display mt-1 text-4xl font-light tracking-tight">
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
                    {c.date}
                  </li>
                  <li className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-[#C9A84C]" />
                    {c.time}
                  </li>
                  <li className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#C9A84C]" />
                    <span>
                      <span className="font-serif-display text-base italic text-[#FAF8F3]">{c.venue}</span>
                      <br />
                      <span className="text-[#E8D5A3]/70">{c.address}</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <Shirt className="h-4 w-4 text-[#C9A84C]" />
                    {c.dressCode}
                  </li>
                </ul>

                <a
                  href={c.mapsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-7 inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/50 px-5 py-2.5 font-sans-soft text-[11px] uppercase tracking-[0.32em] text-[#E8D5A3] transition hover:bg-[#C9A84C]/15"
                >
                  Open in Maps
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
