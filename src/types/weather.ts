export interface Measurement {
  value: number;
  unit: string;
}

export interface WeatherResponse {
  location: {
    city: string;
    country: string;
    timezone: string;
  };

  weather: {
    temperature: Measurement;
    humidity: Measurement;
    wind_speed: Measurement;

    condition: string;
    weather_code: number;
    is_day: boolean;
  };

  advice: string;

  hourly: Array<{
    time: string;
    temperature: number;
    condition: string;
    weather_code: number;
  }>;

  metadata: {
    local_time: string;
    last_updated: string;
  };
}

export type WeatherCondition =
  "Sunny" | "Partly Cloudy" | "Overcast" | "Rain" | "Thunderstorm" | "Snow" | "Fog";

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
