import type { WeatherResponse, WeatherCondition } from "@/types/weather";
import { mapWeatherCode } from "@/lib/weatherThemeMapper";

const BASE_URL =
  (import.meta.env.VITE_WEATHER_API_URL as string | undefined)?.replace(/\/$/, "") ??
  "http://localhost:8000";

// Standard conditions advice dictionary
const ADVICE_MAP: Record<WeatherCondition, string> = {
  Sunny:
    "Perfect day for outdoor activities. Don't forget your sunscreen, wear sunglasses, and stay hydrated!",
  "Partly Cloudy":
    "Nice and pleasant weather. Ideal for a relaxing walk, a park visit, or some light outdoor exercise.",
  Overcast:
    "Gloomy skies today. A cozy jacket and perhaps a warm cup of tea or coffee are highly recommended.",
  Fog: "Visibility is quite low. Take extra caution if you are driving or traveling, and dress in warm layers.",
  Rain: "It's raining outside. Grab your umbrella, keep dry, and enjoy some cozy, comforting indoor activities.",
  Thunderstorm:
    "Stormy conditions detected with possible lightning. It is safest to stay indoors and keep electronics unplugged.",
  Snow: "Brrr, it's snowy and freezing! Bundle up in thick insulated layers, wear warm boots, and enjoy the winter scene.",
};

// Simple seed-based random generator to make local mocks deterministic for each city name
function createSeededRandom(seedString: string) {
  let hash = 0;
  for (let i = 0; i < seedString.length; i++) {
    hash = seedString.charCodeAt(i) + ((hash << 5) - hash);
  }
  return () => {
    const x = Math.sin(hash++) * 10000;
    return x - Math.floor(x);
  };
}

// Generate realistic mock weather for a city
function generateMockWeather(city: string): WeatherResponse {
  const seed = city.trim().toLowerCase();
  const random = createSeededRandom(seed);

  // Pick a random weather code
  const possibleCodes = [
    0, // Sunny
    1,
    2, // Partly Cloudy
    3, // Overcast
    45,
    48, // Fog
    51,
    61,
    80, // Rain
    71,
    85, // Snow
    95, // Thunderstorm
  ];
  const codeIndex = Math.floor(random() * possibleCodes.length);
  const weatherCode = possibleCodes[codeIndex];
  const condition = mapWeatherCode(weatherCode);

  // Generate metrics based on condition
  let tempBase = 20;
  if (condition === "Snow") tempBase = -2;
  else if (condition === "Rain" || condition === "Thunderstorm") tempBase = 12;
  else if (condition === "Fog" || condition === "Overcast") tempBase = 10;
  else if (condition === "Sunny") tempBase = 25;

  const temperature = Math.round(tempBase + (random() * 10 - 5));
  const humidity = Math.round(50 + random() * 40);
  const windSpeed = Math.round(5 + random() * 25);
  const isDay = random() > 0.35; // mostly day

  const countries = [
    "United States",
    "United Kingdom",
    "Canada",
    "Germany",
    "Australia",
    "Japan",
    "France",
    "Kenya",
  ];
  const country = countries[Math.floor(random() * countries.length)];

  const now = new Date();
  const localTimeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return {
    location: {
      city: city.charAt(0).toUpperCase() + city.slice(1),
      country: country,
      timezone: "UTC",
    },
    weather: {
      temperature: { value: temperature, unit: "°C" },
      humidity: { value: humidity, unit: "%" },
      wind_speed: { value: windSpeed, unit: "km/h" },
      condition,
      weather_code: weatherCode,
      is_day: isDay,
    },
    advice: ADVICE_MAP[condition] || "Enjoy your day, whatever the weather!",
    metadata: {
      local_time: localTimeStr,
      last_updated: now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }),
    },
  };
}

export async function fetchWeather(city: string): Promise<WeatherResponse> {
  const trimmed = city.trim();
  if (!trimmed) {
    throw new Error("CITY_NOT_FOUND");
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 65000);

  try {
    // 1. Try backend server if it is configured to a non-localhost address
    if (!BASE_URL.includes("localhost") && !BASE_URL.includes("127.0.0.1")) {
      try {
        const url = `${BASE_URL}/weather?city=${encodeURIComponent(trimmed)}`;
        const res = await fetch(url, {
          headers: { Accept: "application/json" },
          signal: controller.signal,
        });
        if (res.status === 404) {
          throw new Error("CITY_NOT_FOUND");
        }
        if (res.status >= 500) {
          throw new Error("BACKEND_UNAVAILABLE");
        }
        if (res.ok) {
          return (await res.json()) as WeatherResponse;
        }
      } catch (e) {
        const error = e as Error;
        if (error.name === "AbortError") {
          throw new Error("TIMEOUT");
        }
        if (error.message === "CITY_NOT_FOUND" || error.message === "BACKEND_UNAVAILABLE") {
          throw error;
        }
        console.warn("Primary backend fetch failed, falling back to Open-Meteo:", e);
      }
    }

    // 2. Try Open-Meteo free public API fallback
    try {
      // A. Geocode the city
      const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(trimmed)}&count=1&language=en&format=json`;
      let geoRes;
      try {
        geoRes = await fetch(geoUrl, { signal: controller.signal });
      } catch (err) {
        const error = err as Error;
        if (error.name === "AbortError") {
          throw new Error("TIMEOUT");
        }
        throw new Error("NETWORK_ERROR");
      }

      if (!geoRes.ok) {
        throw new Error("BACKEND_UNAVAILABLE");
      }

      const geoData = await geoRes.json();
      if (!geoData.results || geoData.results.length === 0) {
        throw new Error("CITY_NOT_FOUND");
      }

      const location = geoData.results[0];
      const { latitude, longitude, name, country, timezone } = location;

      // B. Fetch forecast
      const forecastUrl = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,is_day,weather_code,wind_speed_10m&timezone=${encodeURIComponent(timezone || "auto")}`;
      let forecastRes;
      try {
        forecastRes = await fetch(forecastUrl, { signal: controller.signal });
      } catch (err) {
        const error = err as Error;
        if (error.name === "AbortError") {
          throw new Error("TIMEOUT");
        }
        throw new Error("NETWORK_ERROR");
      }

      if (!forecastRes.ok) {
        throw new Error("BACKEND_UNAVAILABLE");
      }

      const forecastData = await forecastRes.json();
      const current = forecastData.current;

      const weatherCode = current.weather_code;
      const condition = mapWeatherCode(weatherCode);

      const now = new Date();
      const localTimeStr = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        timeZone: timezone,
      });

      return {
        location: {
          city: name,
          country: country || "Unknown",
          timezone: timezone || "UTC",
        },
        weather: {
          temperature: { value: Math.round(current.temperature_2m), unit: "°C" },
          humidity: { value: current.relative_humidity_2m, unit: "%" },
          wind_speed: { value: Math.round(current.wind_speed_10m), unit: "km/h" },
          condition,
          weather_code: weatherCode,
          is_day: current.is_day === 1,
        },
        advice: ADVICE_MAP[condition] || "Enjoy your day, whatever the weather!",
        metadata: {
          local_time: localTimeStr,
          last_updated: now.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }),
        },
      };
    } catch (e) {
      const error = e as Error;
      if (
        error.message === "CITY_NOT_FOUND" ||
        error.message === "BACKEND_UNAVAILABLE" ||
        error.message === "TIMEOUT" ||
        error.message === "NETWORK_ERROR"
      ) {
        throw error;
      }
      throw new Error("NETWORK_ERROR");
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
