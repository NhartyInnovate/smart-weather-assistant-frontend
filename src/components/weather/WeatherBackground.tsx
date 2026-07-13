import { AnimatePresence, motion } from "framer-motion";
import { useMemo } from "react";
import { useWeatherTheme } from "@/contexts/ThemeContext";
import type { WeatherCondition } from "@/types/weather";

function seedArray(n: number) {
  return Array.from({ length: n }, (_, i) => i);
}

function RainLayer() {
  const drops = useMemo(() => seedArray(60), []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {drops.map((i) => {
        const left = (i * 37) % 100;
        const delay = (i % 20) * 0.15;
        const dur = 0.7 + ((i * 13) % 60) / 100;
        return (
          <span
            key={i}
            className="absolute top-[-10%] h-8 w-[1.5px] bg-white/40"
            style={{
              left: `${left}%`,
              animation: `wa-rain ${dur}s linear ${delay}s infinite`,
            }}
          />
        );
      })}
    </div>
  );
}

function SnowLayer() {
  const flakes = useMemo(() => seedArray(50), []);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {flakes.map((i) => {
        const left = (i * 53) % 100;
        const delay = (i % 15) * 0.4;
        const dur = 6 + ((i * 7) % 60) / 10;
        const size = 4 + (i % 5);
        return (
          <span
            key={i}
            className="absolute top-[-5%] rounded-full bg-white/80"
            style={{
              left: `${left}%`,
              width: size,
              height: size,
              filter: "blur(0.3px)",
              animation: `wa-snow ${dur}s linear ${delay}s infinite`,
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
        const dur = 45 + i * 10;
        const delay = -i * 8;
        const scale = 0.8 + (i % 3) * 0.3;
        return (
          <span
            key={i}
            className="absolute h-24 w-64 rounded-full bg-white/20 blur-2xl"
            style={{
              top: `${top}%`,
              left: "-30%",
              transform: `scale(${scale})`,
              animation: `wa-drift ${dur}s linear ${delay}s infinite`,
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
          width: 320,
          height: 320,
          background: night
            ? "radial-gradient(circle, rgba(226,232,240,0.5) 0%, transparent 60%)"
            : "radial-gradient(circle, rgba(255,220,150,0.7) 0%, transparent 60%)",
        }}
        animate={{ opacity: [0.6, 1, 0.6], scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}

function LightningLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0, 0.6, 0, 0.3, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 5, times: [0, 0.4, 0.45, 0.5, 0.55, 0.6] }}
      />
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
          className="absolute h-32 w-[140%] bg-white/15 blur-3xl"
          style={{
            top: `${15 + i * 18}%`,
            left: "-20%",
            animation: `wa-fog ${30 + i * 5}s ease-in-out ${-i * 4}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function ConditionEffect({ condition, night }: { condition: WeatherCondition; night: boolean }) {
  switch (condition) {
    case "Sunny":
      return <SunGlow night={night} />;
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
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <AnimatePresence mode="sync">
        <motion.div
          key={`${condition}-${dayNight}`}
          className="absolute inset-0"
          style={{ background: gradient }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <ConditionEffect condition={condition} night={dayNight === "night"} />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
