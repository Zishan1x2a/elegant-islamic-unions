import { motion, useReducedMotion, type Variants } from "framer-motion";
import { type PropsWithChildren } from "react";

export function Reveal({
  children,
  delay = 0,
  y = 24,
  className = "",
}: PropsWithChildren<{ delay?: number; y?: number; className?: string }>) {
  const reduced = useReducedMotion();
  const variants: Variants = reduced
    ? { hidden: { opacity: 0 }, show: { opacity: 1 } }
    : {
        hidden: { opacity: 0, y, filter: "blur(12px)" },
        show: {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          transition: { duration: 1, delay, ease: [0.22, 1, 0.36, 1] },
        },
      };
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
    >
      {children}
    </motion.div>
  );
}
