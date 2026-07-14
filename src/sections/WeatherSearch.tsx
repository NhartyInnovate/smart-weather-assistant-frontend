import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SearchBar } from "@/components/weather/SearchBar";
import { LoadingOverlay } from "@/components/weather/LoadingOverlay";
import { ErrorCard } from "@/components/weather/ErrorCard";
import { WeatherCard } from "@/components/weather/WeatherCard";
import { RecommendationCard } from "@/components/weather/RecommendationCard";
import { useWeatherTheme } from "@/contexts/ThemeContext";
import { mapWeatherCode } from "@/lib/weatherThemeMapper";
import { fetchWeather } from "@/services/weatherService";
import type { WeatherResponse } from "@/types/weather";

type Status = "idle" | "loading" | "success" | "error";

export function WeatherSearch() {
  const { setWeather } = useWeatherTheme();
  const [status, setStatus] = useState<Status>("idle");
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [fetchedAt, setFetchedAt] = useState<number>(0);
  const [errorType, setErrorType] = useState<string>("");
  const [loadingPhase, setLoadingPhase] = useState<"short" | "long" | "connected">("short");
  const [countdown, setCountdown] = useState<number>(60);

  const longTimerRef = useRef<NodeJS.Timeout | null>(null);
  const countdownIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const cleanupTimers = () => {
    if (longTimerRef.current) {
      clearTimeout(longTimerRef.current);
      longTimerRef.current = null;
    }
    if (countdownIntervalRef.current) {
      clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return cleanupTimers;
  }, []);

  const search = async (city: string) => {
    const trimmed = city.trim();
    if (!trimmed) {
      setErrorType("CITY_NOT_FOUND");
      setStatus("error");
      return;
    }

    cleanupTimers();
    setStatus("loading");
    setLoadingPhase("short");
    setCountdown(60);
    setData(null);
    setErrorType("");

    let currentPhase: "short" | "long" | "connected" = "short";

    longTimerRef.current = setTimeout(() => {
      currentPhase = "long";
      setLoadingPhase("long");
    }, 3000);

    countdownIntervalRef.current = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    try {
      const res = await fetchWeather(trimmed);
      cleanupTimers();

      if (currentPhase === "long") {
        setLoadingPhase("connected");
        setCountdown(0);
        await new Promise((resolve) => setTimeout(resolve, 600));
      }

      setData(res);
      setFetchedAt(Date.now());
      setStatus("success");
      const condition = mapWeatherCode(res.weather.weather_code);

      const dayNight = res.weather.is_day ? "day" : "night";

      setWeather(condition, dayNight);
    } catch (err) {
      cleanupTimers();
      console.error(err);
      const errorMessage = err instanceof Error ? err.message : "NETWORK_ERROR";
      setErrorType(errorMessage);
      setStatus("error");
    }
  };

  return (
    <section id="search" className="relative px-6 py-24 text-white">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <p className="text-xs uppercase tracking-[0.35em] text-white/70">Search</p>
          <h2 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">
            Where should we look?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-white/75">
            Type a city and press Enter. The interface will shift to match the sky.
          </p>
        </div>
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex flex-col items-center gap-3 w-full max-w-xl">
            <span className="text-xs uppercase tracking-[0.2em] text-white/50">Try searching</span>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {["Abuja", "Lagos", "London", "Tokyo", "Cape Town"].map((city) => (
                <motion.button
                  key={city}
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.12)" }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => search(city)}
                  disabled={status === "loading"}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-light text-white/90 backdrop-blur-md transition-colors hover:border-white/30 disabled:opacity-50 disabled:hover:scale-100"
                >
                  {city}
                </motion.button>
              ))}
            </div>
          </div>
          <SearchBar onSearch={search} disabled={status === "loading"} />
        </div>

        <div className="mt-12">
          <AnimatePresence mode="wait">
            {status === "loading" && (
              <motion.div
                key="loading"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <LoadingOverlay phase={loadingPhase} countdown={countdown} />
              </motion.div>
            )}
            {status === "error" && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <ErrorCard errorType={errorType} onRetry={() => setStatus("idle")} />
              </motion.div>
            )}
            {status === "success" && data && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -25, filter: "blur(4px)" }}
                transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
              >
                <WeatherCard data={data} fetchedAt={fetchedAt} />
                <RecommendationCard advice={data.advice} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
