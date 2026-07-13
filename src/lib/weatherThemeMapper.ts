import type { WeatherCondition } from "@/types/weather";

export function mapWeatherCode(code: number): WeatherCondition {
  // Clear sky
  if (code === 0) return "Sunny";

  // Mainly clear, partly cloudy
  if ([1, 2].includes(code)) return "Partly Cloudy";

  // Overcast
  if (code === 3) return "Overcast";

  // Fog
  if ([45, 48].includes(code)) return "Fog";

  // Drizzle / Rain / Showers
  if (
    [51, 53, 55, 56, 57,
     61, 63, 65,
     66, 67,
     80, 81, 82].includes(code)
  ) {
    return "Rain";
  }

  // Snow
  if (
    [71, 73, 75, 77,
     85, 86].includes(code)
  ) {
    return "Snow";
  }

  // Thunderstorm
  if (
    [95, 96, 99].includes(code)
  ) {
    return "Thunderstorm";
  }

  return "Sunny";
}
