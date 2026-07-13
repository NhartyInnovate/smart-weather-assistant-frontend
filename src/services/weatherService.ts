import type { WeatherResponse } from "@/types/weather";

const BASE_URL =
  (import.meta.env.VITE_WEATHER_API_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:8000";

export async function fetchWeather(city: string): Promise<WeatherResponse> {
  const url = `${BASE_URL}/weather?city=${encodeURIComponent(city)}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });

  if (!res.ok) {
    throw new Error(`Request failed with status ${res.status}`);
  }

  const data = (await res.json()) as WeatherResponse;
  return data;
}
