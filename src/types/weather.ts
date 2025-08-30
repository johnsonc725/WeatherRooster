export interface CurrentWeather {
  temperature: number;
  condition: string;
  icon: string;
  humidity: number;
  windSpeed: number;
}

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  icon: string;
}

export interface WeatherData {
  location: string;
  current: CurrentWeather;
  forecast: ForecastDay[];
}

export interface WeatherStation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
  elevation?: number;
}
