import { motion } from "framer-motion";
import { Phone, MessageCircle } from "lucide-react";
import { SectionHeading } from "@/components/ornaments/SectionHeading";

const familyContacts = [
  {
    side: "Groom's Side",
    arabic: "جَانِب العَرِيس",
    name: "Imran Hussain",
    role: "Father of the Groom",
    phone: "+971 50 111 2233",
    whatsapp: "https://wa.me/971501112233",
  },
  {
    side: "Groom's Side",
    arabic: "جَانِب العَرِيس",
    name: "Yusuf Hussain",
    role: "Brother of the Groom",
    phone: "+971 50 222 3344",
    whatsapp: "https://wa.me/971502223344",
  },
  {
    side: "Bride's Side",
    arabic: "جَانِب العَرُوس",
    name: "Khalid Rahman",
    role: "Father of the Bride",
    phone: "+971 50 333 4455",
    whatsapp: "https://wa.me/971503334455",
  },
  {
    side: "Bride's Side",
    arabic: "جَانِب العَرُوس",
    name: "Hassan Rahman",
    role: "Brother of the Bride",
    phone: "+971 50 444 5566",
    whatsapp: "https://wa.me/971504445566",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-[#0F2A24] to-[#0A1F1A] px-6 py-24 text-[#FAF8F3] sm:py-32"
    >
      <div
        aria-hidden
        className="anim-ambient-drift absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 30%, rgba(201,168,76,0.12), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Get in Touch"
          arabic="تَوَاصَل مَعَنَا"
          title="With Love & Honour"
          subtitle="Reach our wedding desk for anything — directions, dietary needs, or just to share your blessings."
        />

        {/* Family contact cards — bride & groom side */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {familyContacts.map((p, i) => {
            const isGroom = p.side === "Groom's Side";
            return (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 36, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="event-card"
              >
                <div
                  className="relative overflow-hidden rounded-[1.6rem] p-7 backdrop-blur-xl"
                  style={{
                    background: isGroom
                      ? "radial-gradient(120% 120% at 0% 0%, rgba(40,88,71,0.45) 0%, rgba(201,168,76,0.18) 45%, rgba(10,9,7,0.92) 85%), linear-gradient(160deg,#0f2a22 0%,#06120e 100%)"
                      : "radial-gradient(120% 120% at 100% 0%, rgba(232,107,138,0.32) 0%, rgba(201,168,76,0.18) 45%, rgba(20,9,12,0.92) 85%), linear-gradient(160deg,#2a121a 0%,#0c0608 100%)",
                    border: "1px solid rgba(201,168,76,0.35)",
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#E8D5A3]/75">
                        {p.side}
                      </p>
                      <p dir="rtl" className="font-arabic mt-2 text-xl text-[#C9A84C]">
                        {p.arabic}
                      </p>
                    </div>
                    <div className="rounded-full border border-[#C9A84C]/45 bg-[#0A0907]/50 p-3">
                      <Phone className="h-5 w-5 text-[#E8D5A3]" />
                    </div>
                  </div>
                  <h3 className="font-script mt-5 text-4xl font-light text-[#FFF3D6]">
                    {p.name}
                  </h3>
                  <p className="font-serif-display mt-1 text-base italic text-[#E8D5A3]/80">
                    {p.role}
                  </p>

                  <div className="mt-5 flex flex-wrap items-center gap-3">
                    <a
                      href={`tel:${p.phone.replace(/\s/g, "")}`}
                      className="group inline-flex items-center gap-2 rounded-full border border-[#C9A84C]/45 bg-[#0A0907]/45 px-4 py-2 font-sans-soft text-[11px] tracking-[0.18em] text-[#FFF3D6] transition hover:border-[#FFF3D6] hover:bg-[#C9A84C]/15"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#C9A84C] transition group-hover:rotate-12" />
                      {p.phone}
                    </a>
                    <a
                      href={p.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="group inline-flex items-center gap-2 rounded-full border border-[#285847]/60 bg-[#0F2A24]/60 px-4 py-2 font-sans-soft text-[11px] uppercase tracking-[0.3em] text-[#E8D5A3] transition hover:border-[#FFF3D6] hover:text-[#FFF3D6]"
                    >
                      <MessageCircle className="h-3.5 w-3.5 text-[#C9A84C]" />
                      WhatsApp
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}