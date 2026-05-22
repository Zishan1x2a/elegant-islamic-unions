import { motion } from "framer-motion";
import { IslamicPattern } from "@/components/ornaments/IslamicPattern";
import { Reveal } from "@/components/ornaments/Reveal";
import { timeline } from "@/lib/wedding-data";

export function LoveStory() {
  return (
    <section id="story" className="relative overflow-hidden px-6 py-24 sm:py-32">
      {/* Luxury layered background */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-b from-[#FAF6EC] via-[#F5EBD3] to-[#EFE2C0]" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 opacity-50"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 10%, rgba(232,213,163,0.55), transparent 45%), radial-gradient(circle at 80% 80%, rgba(201,168,76,0.35), transparent 50%)",
        }}
      />
      <IslamicPattern className="absolute inset-0 -z-0" opacity={0.08} />
      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <p className="font-sans-soft text-[11px] uppercase tracking-[0.5em] text-[#8B7355]">
              Our Journey
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p dir="rtl" className="font-arabic mt-3 text-3xl text-[#C9A84C]">قِصَّتُنَا</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h2 className="wedding-heading mt-3 text-6xl sm:text-7xl md:text-8xl">
              A Love Written by Allah
            </h2>
          </Reveal>
          <Reveal delay={0.3}>
            <p className="font-serif-display mt-5 text-lg italic text-[#6b5a45]">
              Five chapters of a story we never wrote alone.
            </p>
          </Reveal>
        </div>

        {/* Wave timeline */}
        <div className="relative mt-24">
          {/* Curved gold path (desktop) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 hidden h-full w-full md:block"
            preserveAspectRatio="none"
            viewBox="0 0 1000 1200"
          >
            <defs>
              <linearGradient id="storyPath" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#C9A84C" stopOpacity="0" />
                <stop offset="20%" stopColor="#C9A84C" stopOpacity="0.7" />
                <stop offset="80%" stopColor="#C9A84C" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#C9A84C" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M 500 0 C 200 200, 800 350, 500 520 C 200 690, 800 860, 500 1030 C 350 1110, 500 1180, 500 1200"
              fill="none"
              stroke="url(#storyPath)"
              strokeWidth="1.5"
              strokeDasharray="6 8"
            />
          </svg>
          {/* Mobile vertical line */}
          <span
            aria-hidden
            className="absolute left-6 top-0 h-full w-px bg-gradient-to-b from-transparent via-[#C9A84C]/60 to-transparent md:hidden"
          />

          <ol className="space-y-14 md:space-y-20">
            {timeline.map((item, i) => {
              const isLeft = i % 2 === 0;
              // Wave offsets — odd items dip lower / shift outward
              const waveOffset = isLeft ? "md:-translate-y-2" : "md:translate-y-10";
              return (
                <li key={item.id} className="relative md:grid md:grid-cols-2 md:gap-16">
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    aria-hidden
                    className="absolute left-6 top-1 -translate-x-1/2 md:left-1/2"
                  >
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-[#FFF3D6] to-[#C9A84C] ring-4 ring-[#FAF6EC] shadow-[0_0_18px_rgba(201,168,76,0.55)]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#2B1B14]" />
                    </div>
                  </motion.div>

                  <Reveal
                    className={`pl-14 md:pl-0 ${waveOffset} ${
                      isLeft ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"
                    }`}
                  >
                    <div className="story-card-luxe transition-transform duration-500 hover:-translate-y-1.5 hover:rotate-[-0.3deg]">
                      <p className="font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#8B7355] relative">
                        Chapter {String(item.id).padStart(2, "0")} · {item.date}
                      </p>
                      <p dir="rtl" className="font-arabic mt-3 text-2xl text-[#C9A84C] relative">
                        {item.arabic}
                      </p>
                      <h3 className="font-script mt-2 text-5xl font-light leading-none text-[#163C32] relative">
                        {item.title}
                      </h3>
                      <span aria-hidden className="mt-4 block h-px w-16 bg-gradient-to-r from-[#C9A84C] to-transparent relative" />
                      <p className="font-serif-display mt-4 text-base italic leading-relaxed text-[#3a2f25] relative">
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
