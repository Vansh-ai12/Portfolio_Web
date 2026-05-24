"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect } from "react";

export function AnimatedCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 420, damping: 32 });
  const springY = useSpring(y, { stiffness: 420, damping: 32 });

  useEffect(() => {
    const move = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
    };
    window.addEventListener("pointermove", move);
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  return (
    <>
      <motion.div
        className="cursor-ring pointer-events-none fixed z-[80] h-10 w-10 rounded-full border border-cyan-300/50 mix-blend-screen"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
      />
      <motion.div
        className="cursor-dot pointer-events-none fixed z-[81] h-2 w-2 rounded-full bg-cyan-200 shadow-glow"
        style={{ x, y, translateX: "-50%", translateY: "-50%" }}
      />
    </>
  );
}
