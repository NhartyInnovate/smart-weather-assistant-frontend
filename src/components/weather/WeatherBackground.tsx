import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { useWeatherTheme } from "@/contexts/ThemeContext";
import type { WeatherCondition } from "@/types/weather";

function seedArray(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

function SolarDustLayer() {
  const particles = useMemo(() => seedArray(20), []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((i) => {
        const left = (i * 27) % 100;
        const delay = i * 0.35;
        const size = 2 + (i % 3);
        const duration = 10 + (i % 6) * 2;
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-amber-200/30"
            style={{
              left: `${left}%`,
              bottom: "-5%",
              width: size,
              height: size,
              filter: "blur(0.5px)",
              willChange: "transform",
            }}
            animate={{
              y: ["0vh", "-110vh"],
              x: [0, Math.sin(i) * 35, 0],
              opacity: [0, 0.75, 0.75, 0],
            }}
            transition={{
              duration: duration,
              delay: delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
}

function RainLayer() {
  const drops = useMemo(() => seedArray(60), []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((i) => {
        const left = (i * 37) % 100;
        const delay = (i % 20) * 0.12;
        const dur = 0.5 + ((i * 13) % 40) / 100;
        return (
          <span
            key={i}
            className="absolute top-[-10%] h-12 w-[1px] bg-white/25"
            style={{
              left: `${left}%`,
              transform: "rotate(-12deg)",
              animation: `wa-rain ${dur}s linear ${delay}s infinite`,
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}

function SnowLayer() {
  const flakes = useMemo(() => seedArray(40), []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((i) => {
        const left = (i * 47) % 100;
        const delay = i * 0.25;
        const dur = 6 + (i % 8);
        const size = 3 + (i % 4);
        return (
          <motion.span
            key={i}
            className="absolute rounded-full bg-white/60"
            style={{
              left: `${left}%`,
              top: "-5%",
              width: size,
              height: size,
              filter: "blur(0.2px)",
              willChange: "transform",
            }}
            animate={{
              y: ["0vh", "105vh"],
              x: [0, Math.sin(i) * 25, 0],
            }}
            transition={{
              duration: dur,
              delay: delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );
      })}
    </div>
  );
}

function CloudsLayer({ dense = false }: { dense?: boolean }) {
  const clouds = useMemo(() => seedArray(dense ? 6 : 4), [dense]);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {clouds.map((i) => {
        const top = 8 + i * 12;
        const dur = 50 + i * 15;
        const delay = -i * 10;
        const scale = 0.8 + (i % 3) * 0.3;
        return (
          <span
            key={i}
            className="absolute h-28 w-72 rounded-full bg-white/10 blur-3xl"
            style={{
              top: `${top}%`,
              left: "-30%",
              transform: `scale(${scale})`,
              animation: `wa-drift ${dur}s linear ${delay}s infinite`,
              willChange: "transform",
            }}
          />
        );
      })}
    </div>
  );
}

function SunGlow({ night }: { night: boolean }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute rounded-full"
        style={{
          top: "10%",
          right: "10%",
          width: "340px",
          height: "340px",
          background: night
            ? "radial-gradient(circle, rgba(226,232,240,0.3) 0%, transparent 60%)"
            : "radial-gradient(circle, rgba(255,220,150,0.5) 0%, transparent 60%)",
          willChange: "transform, opacity",
        }}
        animate={{ opacity: [0.6, 0.9, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function LightningLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Ambient background flash */}
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.15, 0, 0.22, 0, 0, 0.08, 0, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.4, 0.42, 0.44, 0.46, 0.48, 0.72, 0.74, 0.76, 1],
          ease: "linear",
        }}
      />
      {/* Glowing Lightning strike shape */}
      <motion.svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute left-[35%] top-0 h-[65%] w-24 text-amber-100/35 filter drop-shadow(0px 0px 12px rgba(254,240,138,0.4))"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.85, 0, 0.7, 0, 0, 0.5, 0, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          times: [0, 0.39, 0.41, 0.43, 0.45, 0.47, 0.71, 0.73, 0.75, 1],
          ease: "linear",
        }}
      >
        <path
          d="M 50,0 L 35,40 L 55,40 L 25,70 L 45,70 L 20,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </motion.svg>
    </div>
  );
}

function FogLayer() {
  const bands = useMemo(() => seedArray(5), []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {bands.map((i) => (
        <span
          key={i}
          className="absolute h-36 w-[140%] bg-white/10 blur-3xl"
          style={{
            top: `${15 + i * 18}%`,
            left: "-20%",
            animation: `wa-fog ${35 + i * 5}s ease-in-out ${-i * 5}s infinite`,
            willChange: "transform",
          }}
        />
      ))}
    </div>
  );
}

function ConditionEffect({ condition, night }: { condition: WeatherCondition; night: boolean }) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    // Return absolutely static effects for reduced motion accessibility
    return condition === "Sunny" || condition === "Partly Cloudy" ? (
      <div className="absolute inset-0 bg-gradient-to-tr from-amber-400/5 to-transparent" />
    ) : null;
  }

  switch (condition) {
    case "Sunny":
      return (
        <>
          <SunGlow night={night} />
          <SolarDustLayer />
        </>
      );
    case "Partly Cloudy":
      return (
        <>
          <SunGlow night={night} />
          <CloudsLayer />
        </>
      );
    case "Overcast":
      return <CloudsLayer dense />;
    case "Rain":
      return (
        <>
          <CloudsLayer dense />
          <RainLayer />
        </>
      );
    case "Thunderstorm":
      return (
        <>
          <CloudsLayer dense />
          <RainLayer />
          <LightningLayer />
        </>
      );
    case "Snow":
      return (
        <>
          <CloudsLayer />
          <SnowLayer />
        </>
      );
    case "Fog":
      return <FogLayer />;
    default:
      return null;
  }
}

export function WeatherBackground() {
  const { gradient, condition, dayNight } = useWeatherTheme();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Animated shifting Liquid Sky effect style block */}
      <style>{`
        @keyframes slowLiquidPan {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
      <AnimatePresence mode="sync">
        <motion.div
          key={`${condition}-${dayNight}`}
          className="absolute inset-0"
          style={{
            background: gradient,
            backgroundSize: shouldReduceMotion ? "auto" : "180% 180%",
            animation: shouldReduceMotion ? "none" : "slowLiquidPan 25s ease-in-out infinite",
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <ConditionEffect condition={condition} night={dayNight === "night"} />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
