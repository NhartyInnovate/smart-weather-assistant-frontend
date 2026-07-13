export interface WeatherResponse {
  location: {
    city: string;
    country: string;
    local_time?: string;
  };
  weather: {
    temperature: { value: number; unit: string };
    humidity: { value: number; unit: string };
    wind_speed: { value: number; unit: string };
    condition: string;
  };
  advice: string;
}

export type WeatherCondition =
  | "Sunny"
  | "Partly Cloudy"
  | "Overcast"
  | "Rain"
  | "Thunderstorm"
  | "Snow"
  | "Fog";

export type DayNight = "day" | "night";

export interface ThemeDefinition {
  key: WeatherCondition;
  label: string;
  gradientDay: string;
  gradientNight: string;
  accent: string;
  accentSoft: string;
  textOnBg: string;
}
