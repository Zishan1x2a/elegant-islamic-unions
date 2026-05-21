import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Moon, MessageCircle, Navigation, CalendarPlus } from "lucide-react";
import { Reveal } from "@/components/ornaments/Reveal";
import { GoldButton } from "@/components/ornaments/GoldButton";
import { wedding } from "@/lib/wedding-data";
import type { Guest } from "@/lib/guest";

export function Rsvp({ open, setOpen, guest }: { open: boolean; setOpen: (v: boolean) => void; guest: Guest }) {
  const [meal, setMeal] = useState("Halal Chicken");
  const [requirements, setRequirements] = useState("");
  const [done, setDone] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    // ============================================
    // TODO: Connect to existing backend
    // Backend endpoint: POST /api/rsvp
    // Expected payload: { guestName, meal, requirements, attending: true }
    // ============================================
    // eslint-disable-next-line no-console
    console.log("[mock] RSVP submitted:", { guest, meal, requirements });
    setDone(true);
  };

  const cal = encodeURIComponent(
    `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nSUMMARY:${wedding.groom.name} & ${wedding.bride.name} — Walima\nDTSTART:20261114T140000Z\nDTEND:20261114T220000Z\nLOCATION:${wedding.venue}\nEND:VEVENT\nEND:VCALENDAR`,
  );

  return (
    <section id="rsvp" className="relative bg-gradient-to-b from-[#2B1B14] to-[#163C32] px-6 py-24 text-[#FAF8F3] sm:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <Reveal>
          <p className="font-sans-soft text-[11px] uppercase tracking-[0.5em] text-[#E8D5A3]/80">
            Will you join us?
          </p>
        </Reveal>
        <Reveal delay={0.15}>
          <h2 className="font-serif-display mt-4 text-5xl font-light leading-[1] sm:text-7xl">
            Say <span className="gold-text italic">Qabool</span>
          </h2>
        </Reveal>
        <Reveal delay={0.3}>
          <p dir="rtl" className="font-arabic mt-5 text-2xl text-[#E8D5A3]">
            هَلْ تَقْبَل دَعْوَتَنَا؟
          </p>
        </Reveal>
        <Reveal delay={0.45}>
          <p className="font-serif-display mx-auto mt-6 max-w-xl text-lg italic leading-relaxed text-[#E8D5A3]/90">
            Your presence is our greatest dua,{" "}
            <span className="not-italic text-[#C9A84C]">
              {guest.name} {guest.honorific}
            </span>
            .
          </p>
        </Reveal>
        <Reveal delay={0.6}>
          <div className="mt-10">
            <GoldButton onClick={() => setOpen(true)}>Qabool Karna — Accept</GoldButton>
          </div>
        </Reveal>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-[95] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            <div className="absolute inset-0 bg-[#0A0907]/75 backdrop-blur-md" />
            <motion.div
              role="dialog"
              aria-label="RSVP"
              initial={{ opacity: 0, scale: 0.92, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card-dark gold-border-glow relative mx-auto w-full max-w-lg overflow-hidden rounded-3xl p-7 text-[#FAF8F3] sm:p-9"
            >
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                className="absolute right-4 top-4 rounded-full border border-[#C9A84C]/50 p-1.5 text-[#C9A84C] transition hover:bg-[#C9A84C]/15"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="text-center">
                <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/10">
                  <Moon className="h-6 w-6 text-[#E8D5A3]" />
                </div>
                <h3 className="font-serif-display mt-4 text-3xl font-light text-[#FAF8F3]">
                  {done ? "Jazakallah Khairan" : "Your seat at our table"}
                </h3>
                <p className="font-serif-display mt-2 text-sm italic text-[#E8D5A3]/80">
                  {done ? "Your RSVP has been received." : `Confirming for ${guest.name} ${guest.honorific}`}
                </p>
              </div>

              {!done ? (
                <form onSubmit={submit} className="mt-7 space-y-5">
                  <label className="block">
                    <span className="font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#E8D5A3]/80">
                      Meal preference
                    </span>
                    <select
                      value={meal}
                      onChange={(e) => setMeal(e.target.value)}
                      className="mt-2 w-full rounded-xl border border-[#C9A84C]/30 bg-[#0A0907]/40 px-4 py-3 font-serif-display text-base text-[#FAF8F3] outline-none focus:border-[#C9A84C]"
                    >
                      <option>Halal Chicken</option>
                      <option>Halal Lamb</option>
                      <option>Vegetarian</option>
                      <option>Vegan</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#E8D5A3]/80">
                      Special requirements
                    </span>
                    <textarea
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      rows={3}
                      placeholder="Allergies, accessibility, anything we should know…"
                      className="mt-2 w-full resize-none rounded-xl border border-[#C9A84C]/30 bg-[#0A0907]/40 px-4 py-3 font-serif-display text-base italic text-[#FAF8F3] outline-none focus:border-[#C9A84C]"
                    />
                  </label>
                  <div className="pt-2 text-center">
                    <GoldButton type="submit">Confirm Attendance</GoldButton>
                  </div>
                </form>
              ) : (
                <div className="mt-8 space-y-3">
                  <a
                    href={`data:text/calendar;charset=utf-8,${cal}`}
                    download="ahmad-aisha-wedding.ics"
                    className="flex items-center justify-between rounded-xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-5 py-4 text-left font-sans-soft text-sm transition hover:bg-[#C9A84C]/15"
                  >
                    <span className="flex items-center gap-3">
                      <CalendarPlus className="h-4 w-4 text-[#C9A84C]" />
                      Add to calendar
                    </span>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-[#E8D5A3]/70">.ics</span>
                  </a>
                  <a
                    href="https://wa.me/971500000000"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-5 py-4 text-left font-sans-soft text-sm transition hover:bg-[#C9A84C]/15"
                  >
                    <span className="flex items-center gap-3">
                      <MessageCircle className="h-4 w-4 text-[#C9A84C]" />
                      WhatsApp our wedding desk
                    </span>
                  </a>
                  <a
                    href="https://maps.google.com/?q=Downtown+Dubai"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center justify-between rounded-xl border border-[#C9A84C]/40 bg-[#C9A84C]/10 px-5 py-4 text-left font-sans-soft text-sm transition hover:bg-[#C9A84C]/15"
                  >
                    <span className="flex items-center gap-3">
                      <Navigation className="h-4 w-4 text-[#C9A84C]" />
                      Directions to venue
                    </span>
                  </a>
                </div>
              )}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
