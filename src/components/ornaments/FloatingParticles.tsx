import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

export function FloatingParticles({ count = 24, className = "" }: { count?: number; className?: string }) {
  const reduced = useReducedMotion();
  const particles = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 1.5,
        delay: Math.random() * 6,
        duration: 8 + Math.random() * 10,
        drift: (Math.random() - 0.5) * 30,
      })),
    [count],
  );
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: "radial-gradient(circle, rgba(255,243,214,0.9), rgba(201,168,76,0) 70%)",
          }}
          initial={{ opacity: 0 }}
          animate={
            reduced
              ? { opacity: 0.6 }
              : { opacity: [0, 0.9, 0], y: [0, -60, -120], x: [0, p.drift, 0] }
          }
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}
    </div>
  );
}
