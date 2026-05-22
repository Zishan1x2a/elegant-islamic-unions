import { motion } from "framer-motion";
import { Phone, Mail, MessageCircle, MapPin, Instagram } from "lucide-react";
import { SectionHeading } from "@/components/ornaments/SectionHeading";
import { wedding } from "@/lib/wedding-data";

const contacts = [
  {
    icon: Phone,
    label: "Wedding Desk",
    value: "+971 50 000 0000",
    href: "tel:+971500000000",
    arabic: "اِتَّصِل بِنَا",
  },
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Chat with us",
    href: "https://wa.me/971500000000",
    arabic: "وَاتْسَاب",
  },
  {
    icon: Mail,
    label: "Email",
    value: "rsvp@ahmadaisha.love",
    href: "mailto:rsvp@ahmadaisha.love",
    arabic: "بَرِيد",
  },
  {
    icon: MapPin,
    label: "Venue",
    value: wedding.venue,
    href: "https://maps.google.com/?q=Downtown+Dubai",
    arabic: "العُنْوَان",
  },
  {
    icon: Instagram,
    label: "Follow Our Story",
    value: wedding.hashtag,
    href: `https://instagram.com/explore/tags/${wedding.hashtag.replace("#", "")}`,
    arabic: "إِنْسْتَغْرَام",
  },
];

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-transparent px-6 py-24 text-[#FAF8F3] sm:py-32"
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

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {contacts.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.a
                key={c.label}
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                whileHover={{ y: -6, scale: 1.02 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="group glass-card-dark gold-border-glow relative flex items-center gap-5 rounded-2xl p-6 transition-shadow hover:shadow-[0_0_50px_-10px_rgba(201,168,76,0.5)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C] to-transparent"
                />
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#0A0907]/40 transition-all duration-500 group-hover:border-[#C9A84C] group-hover:shadow-[0_0_25px_rgba(201,168,76,0.45)] group-hover:rotate-6">
                  <Icon className="h-5 w-5 text-[#E8D5A3]" />
                </div>
                <div className="min-w-0">
                  <p dir="rtl" className="font-arabic text-sm text-[#C9A84C]">
                    {c.arabic}
                  </p>
                  <p className="font-sans-soft text-[10px] uppercase tracking-[0.35em] text-[#E8D5A3]/70">
                    {c.label}
                  </p>
                  <p className="font-serif-display mt-1 truncate text-lg text-[#FFF3D6]">
                    {c.value}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}