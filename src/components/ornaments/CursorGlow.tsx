import { useEffect, useState } from "react";

export function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    const onMove = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    if (mq.matches) window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  if (!enabled) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[60] mix-blend-screen">
      <div
        className="absolute h-[400px] w-[400px] rounded-full"
        style={{
          left: pos.x - 200,
          top: pos.y - 200,
          background: "radial-gradient(circle, rgba(201,168,76,0.18), rgba(201,168,76,0) 60%)",
          transition: "left 120ms ease-out, top 120ms ease-out",
        }}
      />
    </div>
  );
}
