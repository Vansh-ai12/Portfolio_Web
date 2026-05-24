"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export function ProfessionalBackdrop() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 800], [0, 120]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <div className="professional-grid absolute inset-0 opacity-70" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(34,211,238,.16),transparent_28rem),linear-gradient(to_bottom,rgba(2,6,23,.12),#020617_86%)]" />
      <motion.div
        style={{ y }}
        className="absolute right-[-8rem] top-28 h-[30rem] w-[30rem] rounded-full border border-cyan-300/15 bg-cyan-300/[0.03]"
      />
      <motion.div
        style={{ y }}
        className="absolute right-16 top-44 h-56 w-56 rounded-lg border border-white/10 bg-white/[0.035] shadow-glow backdrop-blur-sm"
        animate={{ rotate: [0, 4, 0], y: [0, -10, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-950 to-transparent" />
    </div>
  );
}
