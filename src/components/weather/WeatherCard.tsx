import { motion } from "framer-motion";
import { Droplets, MapPin, Wind, Clock } from "lucide-react";
import type { WeatherResponse, WeatherCondition } from "@/types/weather";

interface Props {
  data: WeatherResponse;
  fetchedAt: number;
}

function formatLocalTime(iso?: string) {
  const d = iso ? new Date(iso) : new Date();
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatUpdated(ts: number) {
  const d = new Date(ts);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function AnimatedWeatherIcon({
  condition,
  isDay,
}: {
  condition: WeatherCondition;
  isDay: boolean;
}) {
  // SVG container variants
  const containerVariants = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  };

  switch (condition) {
    case "Sunny":
      return (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44"
        >
          {/* Radial Outer Glow */}
          <motion.div
            className="absolute h-24 w-24 rounded-full bg-amber-400/20 blur-xl"
            animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#fffbeb" />
                <stop offset="45%" stopColor="#fef08a" />
                <stop offset="100%" stopColor="#f59e0b" />
              </radialGradient>
            </defs>
            {/* Pulsating Sun Rays */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "50px 50px" }}
            >
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="50"
                  y1="18"
                  x2="50"
                  y2="8"
                  stroke="#f59e0b"
                  strokeWidth="4"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 50 50)`}
                />
              ))}
            </motion.g>
            {/* Main Sun Body */}
            <motion.circle
              cx="50"
              cy="50"
              r="22"
              fill="url(#sunGlow)"
              filter="drop-shadow(0px 4px 10px rgba(245, 158, 11, 0.45))"
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      );

    case "Partly Cloudy":
      return (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <linearGradient id="cloudGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(203,213,225,0.95)" />
              </linearGradient>
            </defs>
            {/* Peeking Sun */}
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
              style={{ transformOrigin: "42px 42px" }}
            >
              {[0, 60, 120, 180, 240, 300].map((angle) => (
                <line
                  key={angle}
                  x1="42"
                  y1="18"
                  x2="42"
                  y2="10"
                  stroke="#fbbf24"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 42 42)`}
                />
              ))}
            </motion.g>
            <circle cx="42" cy="42" r="16" fill="#fbbf24" />

            {/* Foreground Cloud */}
            <motion.path
              d="M 25 68 L 30 68 A 12 12 0 0 1 54 68 L 56 68 A 16 16 0 0 1 84 64 A 12 12 0 0 1 80 84 L 25 84 A 10 10 0 0 1 25 68 Z"
              fill="url(#cloudGrad)"
              filter="drop-shadow(0px 8px 16px rgba(15, 23, 42, 0.15))"
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      );

    case "Overcast":
      return (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <linearGradient id="cloudDark" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(203,213,225,1)" />
                <stop offset="100%" stopColor="rgba(148,163,184,0.95)" />
              </linearGradient>
              <linearGradient id="cloudLight" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(226,232,240,0.95)" />
              </linearGradient>
            </defs>
            {/* Back Cloud */}
            <motion.path
              d="M 22 50 A 10 10 0 0 1 42 46 A 14 14 0 0 1 68 50 A 10 10 0 0 1 64 68 L 22 68 Z"
              fill="url(#cloudDark)"
              animate={{ x: [-1.5, 1.5, -1.5], y: [-0.5, 0.5, -0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            />
            {/* Front Cloud */}
            <motion.path
              d="M 18 64 A 12 12 0 0 1 40 58 A 16 16 0 0 1 72 62 A 12 12 0 0 1 68 82 L 18 82 Z"
              fill="url(#cloudLight)"
              filter="drop-shadow(0px 8px 16px rgba(0, 0, 0, 0.12))"
              animate={{ x: [1, -1, 1], y: [1, -1, 1] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </svg>
        </motion.div>
      );

    case "Rain":
      return (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <linearGradient id="rainCloud" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(226,232,240,1)" />
                <stop offset="100%" stopColor="rgba(148,163,184,1)" />
              </linearGradient>
            </defs>
            <path
              d="M 20 54 A 12 12 0 0 1 42 48 A 16 16 0 0 1 74 52 A 12 12 0 0 1 70 72 L 20 72 Z"
              fill="url(#rainCloud)"
              filter="drop-shadow(0px 6px 12px rgba(15, 23, 42, 0.15))"
            />
            {/* Animating Raindrops */}
            <g stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round">
              {[
                { x: 28, delay: 0 },
                { x: 38, delay: 0.3 },
                { x: 48, delay: 0.15 },
                { x: 58, delay: 0.45 },
                { x: 68, delay: 0.2 },
              ].map((drop, idx) => (
                <motion.line
                  key={idx}
                  x1={drop.x}
                  y1="78"
                  x2={drop.x - 2}
                  y2="88"
                  animate={{
                    y1: [72, 92],
                    y2: [82, 102],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 0.9,
                    repeat: Infinity,
                    delay: drop.delay,
                    ease: "linear",
                  }}
                />
              ))}
            </g>
          </svg>
        </motion.div>
      );

    case "Thunderstorm":
      return (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <linearGradient id="stormCloud" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(148,163,184,1)" />
                <stop offset="100%" stopColor="rgba(71,85,105,1)" />
              </linearGradient>
            </defs>
            <path
              d="M 20 54 A 12 12 0 0 1 42 48 A 16 16 0 0 1 74 52 A 12 12 0 0 1 70 72 L 20 72 Z"
              fill="url(#stormCloud)"
              filter="drop-shadow(0px 6px 12px rgba(15, 23, 42, 0.2))"
            />
            {/* Intermittent Lightning Bolt */}
            <motion.polygon
              points="48,74 38,88 47,88 43,100 55,84 46,84"
              fill="#fbbf24"
              filter="drop-shadow(0px 0px 8px #fbbf24)"
              animate={{
                opacity: [0, 0, 1, 0, 1, 0, 0, 0.8, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 2.2,
                repeat: Infinity,
                times: [0, 0.3, 0.35, 0.4, 0.45, 0.5, 0.8, 0.85, 0.9],
              }}
            />
          </svg>
        </motion.div>
      );

    case "Snow":
      return (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            <defs>
              <linearGradient id="snowCloud" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(203,213,225,1)" />
              </linearGradient>
            </defs>
            <path
              d="M 20 54 A 12 12 0 0 1 42 48 A 16 16 0 0 1 74 52 A 12 12 0 0 1 70 72 L 20 72 Z"
              fill="url(#snowCloud)"
              filter="drop-shadow(0px 6px 12px rgba(15, 23, 42, 0.1))"
            />
            {/* Falling & Rotating Snowflakes */}
            {[
              { x: 30, delay: 0, s: 0.8 },
              { x: 45, delay: 0.4, s: 1 },
              { x: 60, delay: 0.2, s: 0.7 },
            ].map((flake, idx) => (
              <motion.g
                key={idx}
                transform={`translate(${flake.x}, 78)`}
                animate={{
                  y: [0, 18],
                  opacity: [0, 1, 0],
                  rotate: [0, 180],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  delay: flake.delay,
                  ease: "linear",
                }}
                style={{ transformOrigin: "center" }}
              >
                <circle cx="0" cy="0" r="2" fill="#e0f2fe" />
                <line x1="-3" y1="0" x2="3" y2="0" stroke="#e0f2fe" strokeWidth="0.8" />
                <line x1="0" y1="-3" x2="0" y2="3" stroke="#e0f2fe" strokeWidth="0.8" />
              </motion.g>
            ))}
          </svg>
        </motion.div>
      );

    case "Fog":
      return (
        <motion.div
          variants={containerVariants}
          initial="initial"
          animate="animate"
          className="relative flex h-36 w-36 items-center justify-center sm:h-44 sm:w-44"
        >
          <svg viewBox="0 0 100 100" className="h-full w-full">
            {/* Wavy drifting mist lines */}
            <g stroke="rgba(255,255,255,0.7)" strokeWidth="3.5" strokeLinecap="round">
              {[
                { y: 35, xRange: [-4, 4], dur: 3 },
                { y: 48, xRange: [4, -4], dur: 4 },
                { y: 61, xRange: [-6, 6], dur: 3.5 },
                { y: 74, xRange: [3, -3], dur: 4.5 },
              ].map((line, idx) => (
                <motion.line
                  key={idx}
                  x1="22"
                  y1={line.y}
                  x2="78"
                  y2={line.y}
                  animate={{
                    x: line.xRange,
                    opacity: [0.4, 0.8, 0.4],
                  }}
                  transition={{
                    duration: line.dur,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </g>
          </svg>
        </motion.div>
      );

    default:
      return null;
  }
}

export function WeatherCard({ data, fetchedAt }: Props) {
  const { location, weather } = data;
  const condition = weather.condition as WeatherCondition;

  return (
    <motion.article
      initial={{ opacity: 0, scale: 0.97, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 text-white shadow-2xl backdrop-blur-3xl sm:p-10"
      aria-label={`Weather in ${location.city}, ${location.country}`}
    >
      {/* Top micro-highlight glass line */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
            <MapPin size={12} className="text-white/70" aria-hidden />
            <span>{location.country}</span>
          </div>
          <h3 className="mt-1 text-3xl font-light tracking-tight text-white sm:text-4xl">
            {location.city}
          </h3>
        </div>
        <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium tracking-wide text-white/70 backdrop-blur-md">
          <Clock size={12} aria-hidden />
          <span>Local Time: {formatLocalTime(location.local_time)}</span>
        </div>
      </header>

      {/* Main Stats Block */}
      <div className="mt-10 flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <div className="flex items-start justify-center sm:justify-start">
            <span className="font-sans text-8xl font-thin leading-none tracking-tighter sm:text-9xl md:text-[10rem]">
              {Math.round(weather.temperature.value)}
            </span>
            <span className="mt-4 ml-1 text-2xl font-light text-white/60">
              {weather.temperature.unit}
            </span>
          </div>
          <p className="mt-2 text-xl font-medium tracking-wide text-white/90">
            {weather.condition}
          </p>
        </div>

        {/* Dynamic Condition Visualization */}
        <div className="flex items-center justify-center">
          <AnimatedWeatherIcon condition={condition} isDay={weather.is_day} />
        </div>
      </div>

      {/* Bento Grid Stats Tiles */}
      <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8">
        <motion.div
          whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md transition-colors"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/80">
            <Droplets size={20} aria-hidden />
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              Humidity
            </dt>
            <dd className="mt-0.5 text-lg font-semibold tracking-tight">
              {weather.humidity.value}
              <span className="text-sm font-normal text-white/60">{weather.humidity.unit}</span>
            </dd>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 backdrop-blur-md transition-colors"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/5 text-white/80">
            <Wind size={20} aria-hidden />
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-wider text-white/40">
              Wind Force
            </dt>
            <dd className="mt-0.5 text-lg font-semibold tracking-tight">
              {weather.wind_speed.value}
              <span className="ml-1 text-xs font-normal text-white/60">
                {weather.wind_speed.unit}
              </span>
            </dd>
          </div>
        </motion.div>
      </dl>

      <footer className="mt-8 flex items-center justify-between text-[11px] text-white/40">
        <span>Intelligent Atmospheric Feed</span>
        <span>Last updated: {formatUpdated(fetchedAt)}</span>
      </footer>
    </motion.article>
  );
}
