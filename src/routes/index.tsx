import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { readGuestFromUrl } from "@/lib/guest";
import { OpeningScreen } from "@/components/sections/OpeningScreen";
import { Hero } from "@/components/sections/Hero";
import { LoveStory } from "@/components/sections/LoveStory";
import { Ceremonies } from "@/components/sections/Ceremonies";
import { Family } from "@/components/sections/Family";
import { Countdown } from "@/components/sections/Countdown";
import { DuaWall } from "@/components/sections/DuaWall";
import { Rsvp } from "@/components/sections/Rsvp";
import { Contact } from "@/components/sections/Contact";
import { AudioPlayer } from "@/components/ornaments/AudioPlayer";
import { CursorGlow } from "@/components/ornaments/CursorGlow";
import { FloatingParticles } from "@/components/ornaments/FloatingParticles";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [opening, setOpening] = useState(true);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [guest] = useState(() => readGuestFromUrl());
  const [sceneIdx, setSceneIdx] = useState(0);
  const [dir, setDir] = useState(1);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const scenes: { key: string; label: string; node: ReactNode }[] = [
    { key: "hero", label: "Welcome", node: <Hero guest={guest} onRsvp={() => setRsvpOpen(true)} /> },
    { key: "events", label: "Events", node: <Ceremonies guest={guest} /> },
    { key: "story", label: "Our Story", node: <LoveStory /> },
    { key: "family", label: "Family", node: <Family /> },
    { key: "countdown", label: "Countdown", node: <Countdown /> },
    { key: "blessings", label: "Blessings", node: <DuaWall /> },
    { key: "contact", label: "Contact", node: <Contact /> },
  ];

  const go = (next: number) => {
    if (next < 0 || next >= scenes.length) return;
    setDir(next > sceneIdx ? 1 : -1);
    setSceneIdx(next);
  };

  return (
    <main className="relative h-[100svh] w-full overflow-hidden bg-[#1B3A6B]">
      {/* Global light-navy backdrop + drifting particles behind all scenes */}
      {!opening && (
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-[#1E3F75] via-[#22468A] to-[#1B3A6B]" />
          <div
            className="absolute inset-0 opacity-70"
            style={{
              background:
                "radial-gradient(circle at 20% 25%, rgba(147,197,253,0.20), transparent 55%), radial-gradient(circle at 80% 75%, rgba(96,165,250,0.18), transparent 60%)",
            }}
          />
          <FloatingParticles count={60} />
        </div>
      )}
      <AnimatePresence mode="wait">
        {opening && (
          <OpeningScreen guest={guest} onOpen={() => setOpening(false)} />
        )}
      </AnimatePresence>

      <CursorGlow />

      {!opening && (
      <div className="relative z-10 h-full w-full">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.section
            key={scenes[sceneIdx].key}
            custom={dir}
            initial={{ opacity: 0, x: dir * 80, scale: 0.97, filter: "blur(14px)" }}
            animate={{ opacity: 1, x: 0, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: dir * -80, scale: 0.97, filter: "blur(14px)" }}
            transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 overflow-y-auto"
          >
            {scenes[sceneIdx].node}

            {/* Scene nav (Back / Next) */}
            <div className="pointer-events-none sticky bottom-0 left-0 right-0 z-40 flex items-end justify-between gap-4 px-5 pb-6 pt-4 sm:px-10 sm:pb-10">
              <SceneNavButton
                disabled={sceneIdx === 0}
                onClick={() => go(sceneIdx - 1)}
                icon={<ChevronLeft className="h-4 w-4" />}
                label="Back"
                side="left"
              />
              <SceneDots
                total={scenes.length}
                active={sceneIdx}
                labels={scenes.map((s) => s.label)}
                onJump={(i) => go(i)}
              />
              <SceneNavButton
                disabled={sceneIdx === scenes.length - 1}
                onClick={() => go(sceneIdx + 1)}
                icon={<ChevronRight className="h-4 w-4" />}
                label="Next"
                side="right"
              />
            </div>
          </motion.section>
        </AnimatePresence>
      </div>
      )}

      <Rsvp open={rsvpOpen} setOpen={setRsvpOpen} guest={guest} />

      <AudioPlayer />
    </main>
  );
}

function SceneNavButton({
  onClick,
  disabled,
  icon,
  label,
  side,
}: {
  onClick: () => void;
  disabled?: boolean;
  icon: ReactNode;
  label: string;
  side: "left" | "right";
}) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.06 }}
      whileTap={{ scale: disabled ? 1 : 0.96 }}
      className={`pointer-events-auto group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-[#C9A84C]/40 bg-[#0A0907]/60 px-5 py-3 font-sans-soft text-[10px] uppercase tracking-[0.4em] text-[#FFF3D6] backdrop-blur-xl transition-all duration-500 hover:border-[#C9A84C] hover:shadow-[0_0_30px_rgba(201,168,76,0.5)] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:shadow-none ${
        side === "right" ? "flex-row-reverse" : ""
      }`}
      aria-label={label}
    >
      <span className="relative z-10 flex items-center gap-2">
        {side === "left" ? icon : null}
        <span>{label}</span>
        {side === "right" ? icon : null}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-[#C9A84C]/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full"
      />
    </motion.button>
  );
}

function SceneDots({
  total,
  active,
  labels,
  onJump,
}: {
  total: number;
  active: number;
  labels: string[];
  onJump: (i: number) => void;
}) {
  return (
    <div className="pointer-events-auto hidden items-center gap-3 rounded-full border border-[#C9A84C]/25 bg-[#0A0907]/50 px-5 py-2.5 backdrop-blur-xl sm:flex">
      {Array.from({ length: total }).map((_, i) => {
        const isActive = i === active;
        return (
          <button
            key={i}
            onClick={() => onJump(i)}
            className="group relative flex items-center"
            aria-label={labels[i]}
          >
            <motion.span
              animate={{
                width: isActive ? 28 : 6,
                backgroundColor: isActive ? "#FFF3D6" : "#C9A84C",
                opacity: isActive ? 1 : 0.5,
              }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="block h-[2px] rounded-full"
              style={{
                boxShadow: isActive ? "0 0 12px rgba(255,243,214,0.7)" : "none",
              }}
            />
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-[#C9A84C]/30 bg-[#0A0907]/80 px-3 py-1 font-sans-soft text-[8px] uppercase tracking-[0.35em] text-[#FFF3D6] opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              {labels[i]}
            </span>
          </button>
        );
      })}
    </div>
  );
}
