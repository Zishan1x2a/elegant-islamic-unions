import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ornaments/SectionHeading";
import { families } from "@/lib/wedding-data";

export function Family() {
  const allMembers = families.flatMap((f) =>
    f.members.map((m) => ({ ...m, side: f.side })),
  );

  return (
    <section
      id="family"
      className="relative overflow-hidden bg-gradient-to-b from-[#0A1F1A] to-[#0F2A24] px-6 py-24 text-[#FAF8F3] sm:py-32"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Our Beloveds"
          arabic="عَائِلَتُنَا"
          title="The Hands That Raised Us"
        />
      </div>

      <div className="glass-card-dark gold-border-glow mx-auto mt-16 max-w-7xl rounded-[2rem] p-6 sm:p-10">
        <div className="-mx-2 overflow-x-auto pb-4 [scrollbar-color:#C9A84C_transparent]">
          <ul className="flex w-max gap-6 px-2 snap-x snap-mandatory">
            {allMembers.map((m, i) => (
              <motion.li
                key={`${m.name}-${i}`}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                whileHover={{ y: -8, scale: 1.04 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="group relative w-60 shrink-0 snap-center rounded-3xl border border-[#C9A84C]/25 bg-gradient-to-b from-[#163C32]/70 to-[#0A1F1A]/70 p-6 text-center backdrop-blur-md transition-shadow hover:shadow-[0_0_40px_-5px_rgba(201,168,76,0.5)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
                />
                <div className="relative mx-auto">
                  <span
                    aria-hidden
                    className="absolute inset-0 -m-2 rounded-full bg-gradient-to-tr from-[#8B7355] via-[#C9A84C] to-[#FFF3D6] opacity-70 blur-md transition group-hover:opacity-100"
                  />
                  <div className="relative flex h-24 w-24 mx-auto items-center justify-center rounded-full bg-[#0A1F1A] ring-2 ring-[#C9A84C]/60 font-serif-display text-3xl text-[#E8D5A3]">
                    {m.initials}
                  </div>
                </div>
                <h3 className="font-serif-display mt-5 text-xl text-[#FFF3D6]">{m.name}</h3>
                <p className="mt-1 font-sans-soft text-[10px] uppercase tracking-[0.3em] text-[#E8D5A3]/70">
                  {m.role}
                </p>
                <p className="mt-3 font-script text-base text-[#C9A84C]/90">{m.side}</p>
              </motion.li>
            ))}
          </ul>
        </div>
        <p className="mt-4 text-center font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#E8D5A3]/50">
          Swipe to meet the family →
        </p>
      </div>
    </section>
  );
}