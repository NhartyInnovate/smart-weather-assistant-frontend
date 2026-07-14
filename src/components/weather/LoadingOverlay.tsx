import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
  Zap,
  Cloud,
  Sun,
  Snowflake,
  Waves,
  Globe,
  Wind,
  CheckCircle2,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

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

interface Fact {
  text: string;
  icon: LucideIcon;
  color: string;
}

const FACTS: Fact[] = [
  {
    text: "Lightning reaches nearly 30,000°C.",
    icon: Zap,
    color: "text-amber-400 shadow-[0_0_15px_rgba(251,191,36,0.3)]",
  },
  {
    text: "Clouds can weigh more than 500 tons.",
    icon: Cloud,
    color: "text-sky-300 shadow-[0_0_15px_rgba(125,211,252,0.3)]",
  },
  {
    text: "A rainbow is actually a complete circle.",
    icon: Sparkles,
    color: "text-pink-400 shadow-[0_0_15px_rgba(244,114,182,0.3)]",
  },
  {
    text: "Over 8 million lightning strikes occur every day.",
    icon: Zap,
    color: "text-yellow-300 shadow-[0_0_15px_rgba(253,224,71,0.3)]",
  },
  {
    text: "No two snowflakes have ever been proven identical.",
    icon: Snowflake,
    color: "text-blue-200 shadow-[0_0_15px_rgba(191,219,254,0.3)]",
  },
  {
    text: "The oceans store most of Earth's heat.",
    icon: Waves,
    color: "text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)]",
  },
  {
    text: "Weather satellites orbit Earth continuously.",
    icon: Globe,
    color: "text-indigo-400 shadow-[0_0_15px_rgba(129,140,248,0.3)]",
  },
  {
    text: "The Sahara sometimes sends dust across the Atlantic Ocean.",
    icon: Wind,
    color: "text-amber-200 shadow-[0_0_15px_rgba(253,230,138,0.3)]",
  },
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
      const id = setInterval(() => setFactIndex((v) => (v + 1) % FACTS.length), 8000);
      return () => clearInterval(id);
    }
  }, [phase]);

  if (phase === "short") {
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

  const progressPercent = phase === "connected" ? 100 : (countdown / 60) * 100;
  const currentFact = FACTS[factIndex];
  const FactIcon = currentFact.icon;

  const formattedSecs = countdown.toString().padStart(2, "0");
  const countdownStr = `00:${formattedSecs}`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 p-4 sm:p-6 backdrop-blur-2xl text-white overflow-y-auto"
      role="status"
      aria-live="polite"
    >
      {/* Decorative premium background light spots */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] -left-[10%] h-[60%] w-[60%] rounded-full bg-blue-500/10 blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -30, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -right-[10%] h-[60%] w-[60%] rounded-full bg-amber-500/5 blur-[120px]"
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 sm:p-10 text-center shadow-2xl backdrop-blur-3xl flex flex-col items-center"
      >
        {/* Subtle glass top highlight */}
        <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

        <AnimatePresence mode="wait">
          {phase === "connected" ? (
            <motion.div
              key="connected-state"
              initial={{ opacity: 0, scale: 0.9, y: 10, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.9, y: -10, filter: "blur(5px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col items-center py-6"
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
          ) : (
            <motion.div
              key="loading-state"
              initial={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.98, filter: "blur(5px)" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full flex flex-col items-center"
            >
              {/* Central Weather Service Header Icon */}
              <div className="relative flex h-24 w-24 items-center justify-center mb-4">
                {/* Sun backplate */}
                <motion.div
                  className="absolute left-1/3 top-2 h-10 w-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.4)]"
                  animate={{
                    scale: [0.93, 1.07, 0.93],
                    rotate: 360,
                  }}
                  transition={{
                    scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                  }}
                />

                {/* Cloud overlay */}
                <motion.svg
                  viewBox="0 0 100 100"
                  className="absolute inset-0 h-full w-full text-white/95 drop-shadow-[0_6px_12px_rgba(255,255,255,0.15)]"
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <path
                    d="M 25 64 L 30 64 A 10 10 0 0 1 50 64 L 52 64 A 14 14 0 0 1 76 60 A 10 10 0 0 1 72 76 L 25 76 A 8 8 0 0 1 25 64 Z"
                    fill="currentColor"
                  />
                </motion.svg>
              </div>

              {/* Main Titles */}
              <h3 className="text-2xl font-light tracking-tight text-white sm:text-3xl">
                Starting Weather Service
              </h3>
              <p className="mt-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-amber-400">
                We're waking up the weather engine...
              </p>

              <div className="mt-4 max-w-sm rounded-2xl bg-white/5 border border-white/5 px-4 py-3.5 text-xs text-white/70 leading-relaxed">
                The first request may take up to one minute because the weather service is hosted on
                a free cloud server.
                <span className="block mt-1.5 font-medium text-white/95">
                  Please keep this page open.
                </span>
              </div>

              {/* Countdown timer */}
              <div className="mt-6 flex flex-col items-center">
                <p className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                  Estimated wait
                </p>
                <p className="mt-1 font-mono text-3xl font-extralight tracking-wider text-white">
                  {countdownStr}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress Bar (Always rendered to animate smoothly between states) */}
        <div className="w-full max-w-xs mt-4">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10 p-[1px] relative">
            <motion.div
              className={`h-full rounded-full bg-gradient-to-r ${
                phase === "connected"
                  ? "from-emerald-400 to-teal-300 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                  : "from-amber-400 to-amber-300 shadow-[0_0_10px_rgba(245,158,11,0.3)]"
              }`}
              animate={{ width: `${progressPercent}%` }}
              transition={{
                width: {
                  duration: phase === "connected" ? 0.4 : 1,
                  ease: phase === "connected" ? "easeOut" : "linear",
                },
              }}
            />
          </div>
        </div>

        {/* Weather Facts section */}
        <AnimatePresence mode="wait">
          {phase !== "connected" && (
            <motion.div
              key="facts-section"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, height: 0, y: 15, transition: { duration: 0.3 } }}
              className="mt-8 pt-6 w-full border-t border-white/10 flex flex-col items-center justify-center min-h-[90px]"
            >
              <p className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-3.5">
                Atmospheric Insight
              </p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={factIndex}
                  initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3.5 max-w-sm px-4"
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 ${currentFact.color}`}
                  >
                    <FactIcon size={20} aria-hidden />
                  </div>
                  <p className="text-left text-xs sm:text-sm font-light leading-relaxed text-white/80">
                    {currentFact.text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
