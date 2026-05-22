import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { readGuestFromUrl } from "@/lib/guest";
import { OpeningScreen } from "@/components/sections/OpeningScreen";
import { Hero } from "@/components/sections/Hero";
import { LoveStory } from "@/components/sections/LoveStory";
import { Ceremonies } from "@/components/sections/Ceremonies";
import { Gallery } from "@/components/sections/Gallery";
import { Family } from "@/components/sections/Family";
import { Countdown } from "@/components/sections/Countdown";
import { DuaWall } from "@/components/sections/DuaWall";
import { Rsvp } from "@/components/sections/Rsvp";
import { Footer } from "@/components/sections/Footer";
import { Contact } from "@/components/sections/Contact";
import { AudioPlayer } from "@/components/ornaments/AudioPlayer";
import { CursorGlow } from "@/components/ornaments/CursorGlow";
import { ScrollProgress } from "@/components/ornaments/ScrollProgress";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [opening, setOpening] = useState(true);
  const [rsvpOpen, setRsvpOpen] = useState(false);
  const [guest] = useState(() => readGuestFromUrl());

  useEffect(() => {
    if (!opening) document.body.style.overflow = "";
    else document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opening]);

  return (
    <main className="relative">
      <AnimatePresence>
        {opening && (
          <OpeningScreen guest={guest} onOpen={() => setOpening(false)} />
        )}
      </AnimatePresence>

      <ScrollProgress />
      <CursorGlow />

      <Hero guest={guest} onRsvp={() => setRsvpOpen(true)} />
      <LoveStory />
      <Ceremonies guest={guest} />
      <Gallery />
      <Family />
      <Countdown />
      <DuaWall />
      <Rsvp open={rsvpOpen} setOpen={setRsvpOpen} guest={guest} />
      <Contact />
      <Footer />

      <AudioPlayer />
    </main>
  );
}
