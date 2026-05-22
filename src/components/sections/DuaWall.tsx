import { useState, type FormEvent } from "react";
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
    // eslint-disable-next-line no-console
    console.log("[mock] dua submitted:", { name, message });
    setDuas((d) => [{ name, message }, ...d]);
    setName("");
    setMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Duplicate for seamless infinite marquee
  const loop = [...duas, ...duas];

  return (
    <section id="duas" className="relative overflow-hidden bg-[#0A1F1A] px-6 py-24 text-[#FAF8F3] sm:py-32">
      <div
        aria-hidden
        className="anim-ambient-drift absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 30% 40%, rgba(201,168,76,0.10), transparent 60%), radial-gradient(circle at 70% 70%, rgba(40,88,71,0.4), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Blessings & Duas"
          arabic="جِدَار الدُّعَاء"
          title="Bless Their Union"
          subtitle="Your words will be carried into our nikah."
        />

        <Reveal>
          <form
            onSubmit={handleSubmit}
            className="glass-card-dark gold-border-glow mx-auto mt-14 max-w-2xl rounded-3xl p-7 sm:p-9"
          >
            <label className="block">
              <span className="font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#E8D5A3]/80">
                Your name
              </span>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
                className="mt-2 w-full rounded-xl border border-[#C9A84C]/30 bg-[#0A0907]/40 px-4 py-3 font-serif-display text-lg text-[#FAF8F3] outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/30"
              />
            </label>
            <label className="mt-5 block">
              <span className="font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#E8D5A3]/80">
                Your dua
              </span>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="May Allah bless them with…"
                rows={4}
                className="mt-2 w-full resize-none rounded-xl border border-[#C9A84C]/30 bg-[#0A0907]/40 px-4 py-3 font-serif-display text-base italic leading-relaxed text-[#FAF8F3] outline-none transition focus:border-[#C9A84C] focus:ring-2 focus:ring-[#C9A84C]/30"
              />
              <div className="mt-2 flex items-center justify-between">
                <span
                  className={`font-sans-soft text-[10px] uppercase tracking-[0.35em] ${
                    overLimit ? "text-[#B85042]" : "text-[#E8D5A3]/70"
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

        {/* Circular floating dua bubbles — infinite marquee */}
        <div className="relative mt-16 overflow-hidden py-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0A1F1A] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0A1F1A] to-transparent" />

          <motion.div
            className="flex w-max gap-8"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {loop.map((d, i) => {
              const offset = (i % 3) * 18; // vertical stagger
              return (
                <motion.figure
                  key={i}
                  whileHover={{ scale: 1.06, rotate: 0 }}
                  style={{ marginTop: offset }}
                  className="group relative flex h-60 w-60 shrink-0 flex-col items-center justify-center rounded-full p-7 text-center"
                >
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-gradient-to-br from-[#163C32]/80 to-[#0A1F1A]/80 backdrop-blur-md transition group-hover:from-[#285847]/90 group-hover:to-[#163C32]/90"
                  />
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full border border-[#C9A84C]/30 shadow-[inset_0_1px_0_rgba(255,243,214,0.18),0_18px_50px_-20px_rgba(201,168,76,0.4)] transition group-hover:border-[#C9A84C]/70 group-hover:shadow-[inset_0_1px_0_rgba(255,243,214,0.25),0_0_40px_-5px_rgba(201,168,76,0.55)]"
                  />
                  <blockquote className="relative font-serif-display text-[13px] italic leading-snug text-[#FAF8F3]/90 line-clamp-5">
                    “{d.message}”
                  </blockquote>
                  <figcaption className="relative mt-4 font-script text-lg text-[#E8D5A3]">
                    {d.name}
                  </figcaption>
                </motion.figure>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}