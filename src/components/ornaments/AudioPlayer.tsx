import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/**
 * TODO: Connect to existing backend
 * Backend endpoint: GET /api/assets/nasheed.mp3
 */
export function AudioPlayer() {
  const [playing, setPlaying] = useState(false);
  const toggle = () => {
    setPlaying((p) => !p);
    // eslint-disable-next-line no-console
    console.log("[mock] nasheed toggled:", !playing);
  };
  return (
    <motion.button
      onClick={toggle}
      aria-label={playing ? "Mute nasheed" : "Play nasheed"}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2 }}
      className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-[#C9A84C]/40 bg-[#2B1B14]/80 text-[#E8D5A3] backdrop-blur-md transition hover:bg-[#163C32]/90 sm:bottom-8 sm:right-8"
    >
      {playing ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
      <span
        aria-hidden
        className={`absolute inset-0 rounded-full ring-1 ring-[#C9A84C]/30 ${playing ? "animate-ping" : ""}`}
      />
    </motion.button>
  );
}
