import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
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

  const search = async (city: string) => {
    setStatus("loading");
    setData(null);
    try {
      const res = await fetchWeather(city);
      setData(res);
      setFetchedAt(Date.now());
      setStatus("success");
      const condition = mapWeatherCode(res.weather.weather_code);

      const dayNight = res.weather.is_day ? "day" : "night";

      setWeather(condition, dayNight);
    } catch (err) {
      console.error(err);
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
        <div className="mt-10 flex justify-center">
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
                <LoadingOverlay />
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
                <ErrorCard onRetry={() => setStatus("idle")} />
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
