import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { DayNight, ThemeDefinition, WeatherCondition } from "@/types/weather";

const THEMES: Record<WeatherCondition, ThemeDefinition> = {
  Sunny: {
    key: "Sunny",
    label: "Sunny",
    gradientDay: "linear-gradient(135deg, #ffb347 0%, #ffcc70 45%, #4fc3f7 100%)",
    gradientNight: "linear-gradient(135deg, #0b1e3f 0%, #1e3c72 50%, #2a5298 100%)",
    accent: "#ffb347",
    accentSoft: "rgba(255, 204, 112, 0.25)",
    textOnBg: "#fff8ec",
  },
  "Partly Cloudy": {
    key: "Partly Cloudy",
    label: "Partly Cloudy",
    gradientDay: "linear-gradient(135deg, #74b9ff 0%, #a1c4fd 50%, #dfe4ea 100%)",
    gradientNight: "linear-gradient(135deg, #141e30 0%, #243b55 100%)",
    accent: "#74b9ff",
    accentSoft: "rgba(116, 185, 255, 0.25)",
    textOnBg: "#f5f9ff",
  },
  Overcast: {
    key: "Overcast",
    label: "Overcast",
    gradientDay: "linear-gradient(135deg, #8e9eab 0%, #bdc3c7 100%)",
    gradientNight: "linear-gradient(135deg, #232526 0%, #414345 100%)",
    accent: "#b0bec5",
    accentSoft: "rgba(176, 190, 197, 0.25)",
    textOnBg: "#f4f6f8",
  },
  Rain: {
    key: "Rain",
    label: "Rain",
    gradientDay: "linear-gradient(135deg, #4b6cb7 0%, #182848 100%)",
    gradientNight: "linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)",
    accent: "#5eead4",
    accentSoft: "rgba(94, 234, 212, 0.2)",
    textOnBg: "#eaf4ff",
  },
  Thunderstorm: {
    key: "Thunderstorm",
    label: "Thunderstorm",
    gradientDay: "linear-gradient(135deg, #373b44 0%, #4286f4 100%)",
    gradientNight: "linear-gradient(135deg, #0a0a23 0%, #1a1a40 50%, #2b2b5a 100%)",
    accent: "#facc15",
    accentSoft: "rgba(250, 204, 21, 0.2)",
    textOnBg: "#f1f5ff",
  },
  Snow: {
    key: "Snow",
    label: "Snow",
    gradientDay: "linear-gradient(135deg, #e6ddd6 0%, #d5def1 50%, #a1c4fd 100%)",
    gradientNight: "linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #4b6cb7 100%)",
    accent: "#e0f2fe",
    accentSoft: "rgba(224, 242, 254, 0.3)",
    textOnBg: "#f8fbff",
  },
  Fog: {
    key: "Fog",
    label: "Fog",
    gradientDay: "linear-gradient(135deg, #d7d2cc 0%, #f2f2f2 100%)",
    gradientNight: "linear-gradient(135deg, #3e5151 0%, #decba4 100%)",
    accent: "#cbd5e1",
    accentSoft: "rgba(203, 213, 225, 0.3)",
    textOnBg: "#f4f5f7",
  },
};

const CYCLE_ORDER: WeatherCondition[] = [
  "Sunny",
  "Partly Cloudy",
  "Rain",
  "Thunderstorm",
  "Snow",
  "Fog",
  "Overcast",
];

export function normalizeCondition(raw: string): WeatherCondition {
  const s = raw.toLowerCase();
  if (s.includes("thunder")) return "Thunderstorm";
  if (s.includes("snow")) return "Snow";
  if (s.includes("rain") || s.includes("drizzle") || s.includes("shower")) return "Rain";
  if (s.includes("fog") || s.includes("mist") || s.includes("haze")) return "Fog";
  if (s.includes("overcast")) return "Overcast";
  if (s.includes("partly") || s.includes("cloud")) return "Partly Cloudy";
  return "Sunny";
}

export function computeDayNight(localTime?: string): DayNight {
  const d = localTime ? new Date(localTime) : new Date();
  const hour = Number.isNaN(d.getHours()) ? new Date().getHours() : d.getHours();
  return hour >= 6 && hour < 19 ? "day" : "night";
}

interface ThemeContextValue {
  condition: WeatherCondition;
  dayNight: DayNight;
  theme: ThemeDefinition;
  gradient: string;
  isCycling: boolean;
  setWeather: (condition: WeatherCondition, dayNight: DayNight) => void;
  stopCycle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [condition, setCondition] = useState<WeatherCondition>("Sunny");
  const [dayNight, setDayNight] = useState<DayNight>(computeDayNight());
  const [isCycling, setIsCycling] = useState(true);

  useEffect(() => {
    if (!isCycling) return;
    let i = 0;
    const id = setInterval(() => {
      i = (i + 1) % CYCLE_ORDER.length;
      setCondition(CYCLE_ORDER[i]);
    }, 9000);
    return () => clearInterval(id);
  }, [isCycling]);

  const setWeather = useCallback((c: WeatherCondition, dn: DayNight) => {
    setIsCycling(false);
    setCondition(c);
    setDayNight(dn);
  }, []);

  const stopCycle = useCallback(() => setIsCycling(false), []);

  const value = useMemo<ThemeContextValue>(() => {
    const theme = THEMES[condition];
    return {
      condition,
      dayNight,
      theme,
      gradient: dayNight === "day" ? theme.gradientDay : theme.gradientNight,
      isCycling,
      setWeather,
      stopCycle,
    };
  }, [condition, dayNight, isCycling, setWeather, stopCycle]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useWeatherTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useWeatherTheme must be used inside ThemeProvider");
  return ctx;
}
