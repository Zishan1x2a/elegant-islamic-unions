import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed top-0 left-0 z-[70] h-[2px] w-full origin-left bg-gradient-to-r from-[#8B7355] via-[#C9A84C] to-[#FFF3D6]"
    />
  );
}
