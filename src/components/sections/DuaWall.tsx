import { useState, type FormEvent } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/ornaments/SectionHeading";
import { Reveal } from "@/components/ornaments/Reveal";
import { GoldButton } from "@/components/ornaments/GoldButton";
import { initialDuas } from "@/lib/wedding-data";

type Dua = { name: string; message: string };
const MAX_WORDS = 100;

export function DuaWall() {
  const [duas, setDuas] = useState<Dua[]>(initialDuas);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const wordCount = message.trim() ? message.trim().split(/\s+/).length : 0;
  const overLimit = wordCount > MAX_WORDS;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || overLimit) return;
    // ============================================
    // TODO: Connect to existing backend
    // Backend endpoint: POST /api/duas
    // Expected payload: { name: string, message: string }
    // ============================================
    // eslint-disable-next-line no-console
    console.log("[mock] dua submitted:", { name, message });
    setDuas((d) => [{ name, message }, ...d]);
    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="duas" className="relative bg-[#FAF8F3] px-6 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="Leave a Dua"
          arabic="جِدَار الدُّعَاء"
          title="Bless Their Union"
          subtitle="Your words will be carried into our nikah."
        />

        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="glass-card gold-border-glow mx-auto mt-14 max-w-2xl rounded-3xl p-7 sm:p-9"
          >
            <label className="block">
              <span className="font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#8B7355]">
                Your name
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="mt-2 w-full rounded-xl border border-[#C9A84C]/30 bg-white/70 px-4 py-3 font-serif-display text-lg text-[#163C32] outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/30"
              />
            </label>
            <label className="mt-5 block">
              <span className="font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#8B7355]">
                Your dua
              </span>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="May Allah bless them with…"
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-[#C9A84C]/30 bg-white/70 px-4 py-3 font-serif-display text-base italic leading-relaxed text-[#163C32] outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/30"
              />
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`font-sans-soft text-[10px] uppercase tracking-[0.35em] ${
                    overLimit ? "text-[#B85042]" : "text-[#8B7355]"
                  }`}
                >
                  {wordCount} / {MAX_WORDS} words
                </span>
                {submitted ? (
                  <span className="font-script text-xl text-[#C9A84C]">Jazakallahu Khairan ✦</span>
                ) : null}
              </div>
            </label>
            <div className="mt-6 flex justify-center">
              <GoldButton type="submit" disabled={overLimit}>
                Send your dua
              </GoldButton>
            </div>
          </form>
        </Reveal>

        <div className="mt-16">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={20}
            slidesPerView={1.1}
            centeredSlides
            loop
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 2, centeredSlides: false },
              1024: { slidesPerView: 3, centeredSlides: false },
            }}
          >
            {duas.map((d, i) => (
              <SwiperSlide key={i} className="!h-auto">
                <motion.figure whileHover={{ y: -4 }} className="glass-card relative h-full rounded-2xl p-6">
                  <span className="font-serif-display text-5xl leading-none text-[#C9A84C]">“</span>
                  <blockquote className="-mt-3 font-serif-display text-base italic leading-relaxed text-[#3a2f25]">
                    {d.message}
                  </blockquote>
                  <figcaption className="mt-5 font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#8B7355]">
                    — {d.name}
                  </figcaption>
                </motion.figure>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
