import { motion } from "framer-motion";
import { FloatingParticles } from "@/components/ornaments/FloatingParticles";
import { GoldButton } from "@/components/ornaments/GoldButton";
import { ArabesqueDivider } from "@/components/ornaments/ArabesqueDivider";
import mosqueImg from "@/assets/mosque-silhouette.jpg";
import type { Guest } from "@/lib/guest";
import { wedding } from "@/lib/wedding-data";

export function OpeningScreen({ guest, onOpen }: { guest: Guest; onOpen: () => void }) {
  return (
    <motion.div
      className="fixed inset-0 z-[80] overflow-hidden bg-[#0A0907]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, filter: "blur(20px)" }}
      transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Mosque silhouette background */}
      <motion.img
        src={mosqueImg}
        alt=""
        aria-hidden
        initial={{ y: "30%", opacity: 0, scale: 1.15 }}
        animate={{ y: "10%", opacity: 0.45, scale: 1 }}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-x-0 bottom-0 h-[70vh] w-full object-cover object-bottom"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0907]/70 via-[#0A0907]/40 to-[#0A0907]/95" />
      <div className="vignette absolute inset-0" />
      <FloatingParticles count={28} />

      {/* Pulsing gold halo */}
      <div
        aria-hidden
        className="anim-pulse-glow pointer-events-none absolute left-1/2 top-1/2 h-[80vmin] w-[80vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(201,168,76,0.25) 0%, rgba(201,168,76,0.06) 45%, transparent 70%)",
        }}
      />

      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">
        {/* Preview Guest tag */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-10"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-[#C9A84C]/40 bg-[#C9A84C]/5 px-5 py-2 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C9A84C] anim-pulse-glow" />
            <p className="font-sans-soft text-[10px] uppercase tracking-[0.5em] text-[#E8D5A3]">
              Preview Guest
            </p>
          </div>
          <p className="font-script mt-4 text-3xl text-[#FFF3D6] sm:text-4xl">
            {guest.name} {guest.honorific}
          </p>
        </motion.div>

        {/* Bismillah */}
        <motion.p
          dir="rtl"
          lang="ar"
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="font-arabic gold-shimmer text-2xl sm:text-3xl md:text-4xl"
        >
          بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
        </motion.p>

        {/* Couple names in luxurious script */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, filter: "blur(16px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.6, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8"
        >
          <p className="font-sans-soft text-[10px] uppercase tracking-[0.5em] text-[#E8D5A3]/70">
            The wedding of
          </p>
          <h1 className="script-luxe mt-4 text-balance text-6xl leading-[1.05] sm:text-7xl md:text-8xl lg:text-[120px]">
            {wedding.groom.name} &amp; {wedding.bride.name}
          </h1>
          <ArabesqueDivider className="mt-6" />
          <p className="font-serif-display mt-4 text-lg italic text-[#E8D5A3]/90 sm:text-xl">
            {wedding.dateLabel}
          </p>
        </motion.div>

        {/* Open Invitation button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-12"
        >
          <GoldButton onClick={onOpen}>Open Invitation</GoldButton>
          <p className="mt-4 font-sans-soft text-[10px] uppercase tracking-[0.45em] text-[#E8D5A3]/60">
            Tap to enter
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
