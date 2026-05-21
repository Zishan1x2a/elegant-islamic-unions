import { motion } from "framer-motion";
import { IslamicPattern } from "@/components/ornaments/IslamicPattern";
import { Reveal } from "@/components/ornaments/Reveal";
import { SectionHeading } from "@/components/ornaments/SectionHeading";
import { timeline } from "@/lib/wedding-data";

export function LoveStory() {
  return (
    <section id="story" className="relative overflow-hidden bg-[#FAF8F3] px-6 py-24 sm:py-32">
      <IslamicPattern className="absolute inset-0 -z-0" opacity={0.06} />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Our Journey"
          arabic="قِصَّتُنَا"
          title="A Love Written by Allah"
          subtitle="Five chapters of a story we never wrote alone."
        />

        <div className="relative mt-20">
          <span
            aria-hidden
            className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#C9A84C]/60 to-transparent md:left-1/2"
          />

          <ol className="space-y-16 md:space-y-24">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <li key={item.id} className="relative md:grid md:grid-cols-2 md:gap-12">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                    className="absolute left-6 top-1 -translate-x-1/2 md:left-1/2"
                  >
                    <div className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A84C] ring-4 ring-[#FAF8F3] shadow-[0_0_0_1px_rgba(201,168,76,0.4)]" />
                  </motion.div>

                  <Reveal
                    className={`pl-14 md:pl-0 ${
                      isLeft ? "md:pr-14 md:text-right" : "md:col-start-2 md:pl-14"
                    }`}
                  >
                    <div className="glass-card rounded-2xl p-7 sm:p-8 transition-transform hover:-translate-y-1">
                      <p className="font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#8B7355]">
                        Chapter {String(item.id).padStart(2, "0")} · {item.date}
                      </p>
                      <p dir="rtl" className="font-arabic mt-3 text-xl text-[#C9A84C]">
                        {item.arabic}
                      </p>
                      <h3 className="font-serif-display mt-1 text-3xl font-light text-[#163C32]">
                        {item.title}
                      </h3>
                      <p className="font-serif-display mt-4 text-base italic leading-relaxed text-[#3a2f25]">
                        {item.blurb}
                      </p>
                    </div>
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
