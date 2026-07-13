import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const MESSAGES = [
  "Finding your city...",
  "Checking the skies...",
  "Preparing your weather...",
  "Looking beyond the clouds...",
  "Searching atmospheric data...",
];

export function LoadingOverlay() {
  const [i, setI] = useState(0);

  useEffect(() => {
    // Elegant cycling interval
    const id = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center gap-8 py-16"
      role="status"
      aria-live="polite"
    >
      <div className="relative flex h-24 w-24 items-center justify-center">
        {/* Outer glowing atmospheric orbit */}
        <motion.span
          className="absolute h-20 w-20 rounded-full border border-dashed border-white/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        />

        {/* Medium dynamic orbit */}
        <motion.span
          className="absolute h-14 w-14 rounded-full border border-t-white/80 border-r-white/40 border-b-white/10 border-l-transparent"
          animate={{ rotate: -360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
        />

        {/* Core celestial pulse */}
        <motion.span
          className="absolute h-6 w-6 rounded-full bg-white/30 blur-[2px]"
          animate={{ scale: [0.85, 1.2, 0.85], opacity: [0.5, 0.9, 0.5] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="relative h-8 w-80 text-center">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 font-sans text-sm font-medium tracking-wide text-white/90"
          >
            {MESSAGES[i]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
