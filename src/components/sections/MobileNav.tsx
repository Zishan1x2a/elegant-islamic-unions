import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { wedding } from "@/lib/wedding-data";

const links = [
  { href: "#hero", label: "Welcome" },
  { href: "#story", label: "Our Story" },
  { href: "#ceremonies", label: "Events" },
  { href: "#gallery", label: "Memories" },
  { href: "#family", label: "Family" },
  { href: "#countdown", label: "Countdown" },
  { href: "#duas", label: "Duas" },
  { href: "#rsvp", label: "RSVP" },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("hero");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    links.forEach((l) => {
      const el = document.querySelector(l.href);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-all duration-500 ${
          scrolled ? "border-b border-[#C9A84C]/15 bg-[#FAF8F3]/85 backdrop-blur-md" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3 sm:py-4">
          <a
            href="#hero"
            className={`font-script text-xl transition-colors sm:text-2xl ${
              scrolled ? "text-[#163C32]" : "text-[#E8D5A3]"
            }`}
          >
            {wedding.groom.name} &amp; {wedding.bride.name}
          </a>
          <nav className="hidden md:block">
            <ul className="flex items-center gap-1">
              {links.slice(1).map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative rounded-full px-3 py-1.5 font-sans-soft text-[10px] uppercase tracking-[0.32em] transition ${
                      scrolled ? "text-[#163C32] hover:text-[#C9A84C]" : "text-[#E8D5A3] hover:text-[#FFF3D6]"
                    } ${
                      active === l.href.slice(1)
                        ? "after:absolute after:inset-x-3 after:bottom-0.5 after:h-px after:bg-[#C9A84C]"
                        : ""
                    }`}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={`rounded-full border p-2 transition md:hidden ${
              scrolled ? "border-[#C9A84C]/30 text-[#163C32]" : "border-[#C9A84C]/30 text-[#E8D5A3]"
            }`}
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-50 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[#0A0907]/80 backdrop-blur-md" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="absolute right-0 top-0 flex h-full w-[78%] max-w-sm flex-col bg-gradient-to-b from-[#163C32] to-[#2B1B14] p-8 text-[#FAF8F3]"
            >
              <div className="flex items-center justify-between">
                <p className="font-script text-2xl text-[#E8D5A3]">
                  {wedding.groom.name} &amp; {wedding.bride.name}
                </p>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="rounded-full border border-[#C9A84C]/40 p-2"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <ul className="mt-12 space-y-2">
                {links.map((l, i) => (
                  <motion.li
                    key={l.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.05 }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="block rounded-2xl border border-transparent px-5 py-3 font-serif-display text-2xl text-[#FAF8F3] transition hover:border-[#C9A84C]/40 hover:bg-[#C9A84C]/10"
                    >
                      {l.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
