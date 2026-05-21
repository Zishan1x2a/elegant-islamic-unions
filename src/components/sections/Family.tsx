import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { Reveal } from "@/components/ornaments/Reveal";
import { SectionHeading } from "@/components/ornaments/SectionHeading";
import { families } from "@/lib/wedding-data";

type Member = { name: string; role: string; initials: string };

export function Family() {
  const [active, setActive] = useState<Member | null>(null);

  return (
    <section id="family" className="relative bg-[#FAF8F3] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Our Beloveds" arabic="عَائِلَتُنَا" title="The Hands That Raised Us" />

        <div className="mt-16 grid gap-12 md:grid-cols-2 md:gap-16">
          {families.map((fam) => (
            <Reveal key={fam.side}>
              <div className="rounded-3xl border border-[#C9A84C]/20 bg-white/60 p-8 backdrop-blur-sm">
                <div className="text-center">
                  <p dir="rtl" className="font-arabic text-2xl text-[#C9A84C]">
                    {fam.arabic}
                  </p>
                  <h3 className="font-serif-display mt-1 text-3xl font-light text-[#163C32]">
                    {fam.side}
                  </h3>
                </div>
                <ul className="mt-10 grid grid-cols-2 gap-6">
                  {fam.members.map((m) => (
                    <li key={m.name}>
                      <button
                        onClick={() => setActive(m)}
                        className="group flex w-full flex-col items-center text-center focus:outline-none"
                      >
                        <span className="relative inline-flex">
                          <span
                            aria-hidden
                            className="absolute inset-0 -m-1 rounded-full bg-gradient-to-tr from-[#8B7355] via-[#C9A84C] to-[#E8D5A3] opacity-90 blur-sm transition group-hover:opacity-100"
                          />
                          <span className="relative flex h-20 w-20 items-center justify-center rounded-full bg-[#163C32] font-serif-display text-2xl text-[#E8D5A3] ring-2 ring-[#FAF8F3] transition-transform group-hover:scale-105 sm:h-24 sm:w-24">
                            {m.initials}
                          </span>
                        </span>
                        <span className="mt-4 block font-serif-display text-lg text-[#163C32]">
                          {m.name}
                        </span>
                        <span className="mt-0.5 block font-sans-soft text-[10px] uppercase tracking-[0.3em] text-[#8B7355]">
                          {m.role}
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active ? (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <div className="absolute inset-0 bg-[#2B1B14]/70 backdrop-blur-md" />
            <motion.div
              role="dialog"
              aria-label={active.name}
              initial={{ opacity: 0, scale: 0.92, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card gold-border-glow relative mx-auto w-full max-w-md rounded-3xl p-8 text-center"
            >
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full border border-[#C9A84C]/50 p-1.5 text-[#C9A84C] transition hover:bg-[#C9A84C]/15"
              >
                <X className="h-4 w-4" />
              </button>
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#163C32] font-serif-display text-3xl text-[#E8D5A3] ring-2 ring-[#C9A84C]">
                {active.initials}
              </div>
              <h3 className="font-serif-display mt-5 text-3xl text-[#163C32]">{active.name}</h3>
              <p className="mt-1 font-sans-soft text-[10px] uppercase tracking-[0.35em] text-[#8B7355]">
                {active.role}
              </p>
              <p className="font-serif-display mt-5 text-base italic leading-relaxed text-[#3a2f25]">
                With deepest love and gratitude — may every dua you've raised for us be answered, ameen.
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
