import { motion } from "framer-motion";
import { Droplets, MapPin, Wind, Clock } from "lucide-react";
import type { WeatherResponse } from "@/types/weather";

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

export function WeatherCard({ data, fetchedAt }: Props) {
  const { location, weather } = data;
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto w-full max-w-2xl rounded-3xl border border-white/20 bg-white/10 p-8 text-white shadow-2xl backdrop-blur-2xl sm:p-10"
      aria-label={`Weather in ${location.city}, ${location.country}`}
    >
      <header className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-sm text-white/70">
            <MapPin size={16} aria-hidden />
            <span>{location.country}</span>
          </div>
          <h3 className="mt-1 text-3xl font-semibold tracking-tight">{location.city}</h3>
        </div>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <Clock size={16} aria-hidden />
          <span>{formatLocalTime(location.local_time)}</span>
        </div>
      </header>

      <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
        <div>
          <div className="flex items-start">
            <span className="text-8xl font-light leading-none tracking-tighter sm:text-9xl">
              {Math.round(weather.temperature.value)}
            </span>
            <span className="mt-3 ml-2 text-2xl text-white/70">{weather.temperature.unit}</span>
          </div>
          <p className="mt-2 text-lg font-medium text-white/90">{weather.condition}</p>
        </div>
      </div>

      <dl className="mt-8 grid grid-cols-2 gap-4 border-t border-white/15 pt-6 sm:grid-cols-2">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Droplets size={18} aria-hidden />
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/60">Humidity</dt>
            <dd className="text-lg font-semibold">
              {weather.humidity.value}
              {weather.humidity.unit}
            </dd>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
            <Wind size={18} aria-hidden />
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-white/60">Wind</dt>
            <dd className="text-lg font-semibold">
              {weather.wind_speed.value} {weather.wind_speed.unit}
            </dd>
          </div>
        </div>
      </dl>

      <p className="mt-6 text-xs text-white/50">Last updated {formatUpdated(fetchedAt)}</p>
    </motion.article>
  );
}
