"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function RoleRotator({ roles }: { roles: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIndex((value) => (value + 1) % roles.length), 1800);
    return () => window.clearInterval(timer);
  }, [roles.length]);

  return (
    <span className="inline-grid min-h-12 overflow-hidden text-cyan-200 sm:min-h-16">
      <AnimatePresence mode="wait">
        <motion.span
          key={roles[index]}
          initial={{ y: 28, opacity: 0, filter: "blur(8px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: -28, opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.42 }}
        >
          {roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
