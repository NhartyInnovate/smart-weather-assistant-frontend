import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

interface Props {
  phase?: "short" | "long" | "connected";
  countdown?: number;
}

const MESSAGES = [
  "Finding your city...",
  "Checking the skies...",
  "Preparing your weather...",
  "Looking beyond the clouds...",
  "Searching atmospheric data...",
];

const FACTS = [
  "🌦 Rain isn't always made of water.",
  "⚡ Lightning is hotter than the surface of the sun.",
  "🌍 The atmosphere weighs over 5 quadrillion tons.",
  "🌪 Not every dark cloud produces rain.",
  "🌈 Rainbows are actually complete circles.",
  "☁ Clouds can weigh hundreds of tons.",
  "💨 Wind has no color, only movement.",
  "☀ The Sahara receives enough sunlight to power the world.",
];

export function LoadingOverlay({ phase = "short", countdown = 60 }: Props) {
  const [shortMsgIndex, setShortMsgIndex] = useState(0);
  const [factIndex, setFactIndex] = useState(0);

  useEffect(() => {
    if (phase === "short") {
      const id = setInterval(() => setShortMsgIndex((v) => (v + 1) % MESSAGES.length), 1800);
      return () => clearInterval(id);
    }
  }, [phase]);

  useEffect(() => {
    if (phase !== "short") {
      const id = setInterval(() => setFactIndex((v) => (v + 1) % FACTS.length), 5000);
      return () => clearInterval(id);
    }
  }, [phase]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97, y: -30 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 text-white shadow-2xl backdrop-blur-3xl sm:p-10 flex flex-col items-center justify-center min-h-[460px]"
    >
      {/* Top micro-highlight glass line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {/* Ambient glowing blobs mimicking the weather theme colors inside the card */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-30">
        <div className="absolute -left-1/4 -top-1/4 h-1/2 w-1/2 rounded-full bg-amber-500/10 blur-3xl" />
        <div className="absolute -right-1/4 -bottom-1/4 h-1/2 w-1/2 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {phase === "connected" ? (
          <motion.div
            key="connected-state"
            initial={{ opacity: 0, scale: 0.9, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center py-6 text-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 15 }}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 shadow-[0_0_30px_rgba(16,185,129,0.3)] border border-emerald-500/30"
            >
              <CheckCircle2 size={44} />
            </motion.div>

            <h3 className="mt-6 text-3xl font-light tracking-tight text-white">Connected</h3>
            <p className="mt-2 text-sm font-medium tracking-wide text-emerald-400">
              Fetching live weather...
            </p>
          </motion.div>
        ) : phase === "short" ? (
          <motion.div
            key="short-loader"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center text-center py-8"
          >
            {/* Custom premium spinner */}
            <div
              className="relative flex h-24 w-24 items-center justify-center mb-6"
              role="img"
              aria-label="Loading weather details"
            >
              <motion.div
                className="absolute h-20 w-20 rounded-full border-2 border-white/5 border-t-amber-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute h-14 w-14 rounded-full border border-dashed border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-6 w-6 text-amber-300/80" />
              </motion.div>
            </div>

            {/* Atmospheric Message Container */}
            <div className="relative h-8 w-full max-w-xs mt-2 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={shortMsgIndex}
                  initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-x-0 font-sans text-sm font-light tracking-wide text-white/85"
                >
                  {MESSAGES[shortMsgIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

            {/* Premium progress-indicator line */}
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
          </motion.div>
        ) : (
          <motion.div
            key="long-loader"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4 }}
            className="w-full flex flex-col items-center text-center"
          >
            {/* Custom premium spinner */}
            <div
              className="relative flex h-24 w-24 items-center justify-center mb-6"
              role="img"
              aria-label="Loading weather details"
            >
              <motion.div
                className="absolute h-20 w-20 rounded-full border-2 border-white/5 border-t-amber-400"
                animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute h-14 w-14 rounded-full border border-dashed border-white/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                animate={{ scale: [0.9, 1.1, 0.9] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-6 w-6 text-amber-300/80" />
              </motion.div>
            </div>

            {/* Headings */}
            <h3 className="text-2xl font-light tracking-tight text-white sm:text-3xl">
              Starting Weather Service...
            </h3>
            <p className="mt-2 text-sm text-white/75">The weather engine is waking up.</p>
            <p className="mt-1 max-w-md text-xs text-white/60 font-light">
              This usually happens on the first request while the server wakes up.
            </p>

            {/* Countdown / Status display */}
            <div className="mt-6 flex flex-col items-center min-h-[50px]">
              {countdown > 0 ? (
                <>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Estimated wait
                  </p>
                  <p className="mt-1 font-mono text-2xl font-light tracking-wider text-white">
                    {countdown} seconds remaining
                  </p>
                </>
              ) : (
                <p className="font-sans text-sm font-medium tracking-wide text-amber-400">
                  Still waking up the weather service...
                </p>
              )}
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-xs mt-4">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-[1px] relative">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-amber-400 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
                  animate={{ width: `${(countdown / 60) * 100}%` }}
                  transition={{
                    width: {
                      duration: 1,
                      ease: "linear",
                    },
                  }}
                />
              </div>
            </div>

            {/* Divider */}
            <div className="mt-8 pt-6 w-full border-t border-white/10 flex flex-col items-center justify-center min-h-[80px]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3">
                Atmospheric Insight
              </p>
              <div className="h-12 flex items-center justify-center max-w-md px-4">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={factIndex}
                    initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="text-center text-sm font-light leading-relaxed text-white/80"
                  >
                    {FACTS[factIndex]}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
