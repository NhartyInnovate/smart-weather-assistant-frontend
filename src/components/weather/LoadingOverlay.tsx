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
    const id = setInterval(() => setI((v) => (v + 1) % MESSAGES.length), 1800);
    return () => clearInterval(id);
  }, []);

  return (
    <div
      className="relative mx-auto w-full max-w-md overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-10 text-center shadow-2xl backdrop-blur-3xl"
      role="status"
      aria-live="polite"
    >
      {/* Top highlight line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Shimmer overlay sweeping across */}
      <motion.div
        className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent"
        animate={{ x: ["100%", "-100%"] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        style={{ skewX: -20 }}
      />

      {/* Floating premium weather icon in the center */}
      <div className="relative mx-auto flex h-32 w-32 items-center justify-center">
        {/* Golden Sun backplate */}
        <motion.div
          className="absolute left-1/3 top-6 h-12 w-12 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.4)]"
          animate={{
            scale: [0.95, 1.05, 0.95],
            rotate: 360,
          }}
          transition={{
            scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
            rotate: { duration: 15, repeat: Infinity, ease: "linear" },
          }}
        />

        {/* Floating cloud overlay */}
        <motion.svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full text-white/90 drop-shadow-[0_8px_16px_rgba(255,255,255,0.15)]"
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <path
            d="M 25 64 L 30 64 A 10 10 0 0 1 50 64 L 52 64 A 14 14 0 0 1 76 60 A 10 10 0 0 1 72 76 L 25 76 A 8 8 0 0 1 25 64 Z"
            fill="currentColor"
          />
        </motion.svg>

        {/* Outer orbital glow */}
        <motion.div
          className="absolute h-24 w-24 rounded-full border border-dashed border-white/10"
          animate={{ rotate: -360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Atmospheric Message Container */}
      <div className="relative mt-4 h-8 w-full">
        <AnimatePresence mode="wait">
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 font-sans text-sm font-light tracking-wide text-white/85"
          >
            {MESSAGES[i]}
          </motion.p>
        </AnimatePresence>
      </div>

      {/* Custom ambient fill bar */}
      <div className="mx-auto mt-6 h-[2px] w-28 overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full bg-gradient-to-r from-amber-400/80 to-white/80"
          animate={{
            x: ["-100%", "100%"],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{ width: "60%" }}
        />
      </div>
    </div>
  );
}
