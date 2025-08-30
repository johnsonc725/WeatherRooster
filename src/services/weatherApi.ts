// Open-Meteo Weather API Service
// Completely free with no API key required!

export interface OpenMeteoCurrentResponse {
  current: {
    temperature_2m: number;
    relative_humidity_2m: number;
    wind_speed_10m: number;
    weather_code: number;
    apparent_temperature: number;
  };
  current_units: {
    temperature_2m: string;
    wind_speed_10m: string;
  };
}

export interface OpenMeteoForecastResponse {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
  };
  daily_units: {
    temperature_2m_max: string;
    temperature_2m_min: string;
  };
  hourly: {
    time: string[];
    temperature_2m: number[];
    wind_speed_10m: number[];
    weather_code: number[];
    precipitation_probability: number[];
  };
  hourly_units: {
    temperature_2m: string;
    wind_speed_10m: string;
    precipitation_probability: string;
  };
}

export interface GeocodingResponse {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
}

export interface WeatherStation {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  distance: number;
  elevation?: number;
}

// Convert Celsius to Fahrenheit
const celsiusToFahrenheit = (celsius: number): number => {
  return (celsius * 9/5) + 32;
};

// Convert WMO weather codes to emojis and readable text
const getWeatherInfo = (weatherCode: number): { icon: string; condition: string } => {
  const weatherMap: { [key: number]: { icon: string; condition: string } } = {
    0: { icon: '☀️', condition: 'Clear Sky' },
    1: { icon: '🌤️', condition: 'Mainly Clear' },
    2: { icon: '⛅', condition: 'Partly Cloudy' },
    3: { icon: '☁️', condition: 'Overcast' },
    45: { icon: '🌫️', condition: 'Foggy' },
    48: { icon: '🌫️', condition: 'Depositing Rime Fog' },
    51: { icon: '🌦️', condition: 'Light Drizzle' },
    53: { icon: '🌦️', condition: 'Moderate Drizzle' },
    55: { icon: '🌧️', condition: 'Dense Drizzle' },
    56: { icon: '🌧️', condition: 'Light Freezing Drizzle' },
    57: { icon: '🌧️', condition: 'Dense Freezing Drizzle' },
    61: { icon: '🌧️', condition: 'Slight Rain' },
    63: { icon: '🌧️', condition: 'Moderate Rain' },
    65: { icon: '🌧️', condition: 'Heavy Rain' },
    66: { icon: '🌧️', condition: 'Light Freezing Rain' },
    67: { icon: '🌧️', condition: 'Heavy Freezing Rain' },
    71: { icon: '❄️', condition: 'Slight Snow' },
    73: { icon: '❄️', condition: 'Moderate Snow' },
    75: { icon: '❄️', condition: 'Heavy Snow' },
    77: { icon: '❄️', condition: 'Snow Grains' },
    80: { icon: '🌦️', condition: 'Slight Rain Showers' },
    81: { icon: '🌧️', condition: 'Moderate Rain Showers' },
    82: { icon: '🌧️', condition: 'Violent Rain Showers' },
    85: { icon: '❄️', condition: 'Slight Snow Showers' },
    86: { icon: '❄️', condition: 'Heavy Snow Showers' },
    95: { icon: '⛈️', condition: 'Thunderstorm' },
    96: { icon: '⛈️', condition: 'Thunderstorm with Slight Hail' },
    99: { icon: '⛈️', condition: 'Thunderstorm with Heavy Hail' }
  };
  
  return weatherMap[weatherCode] || { icon: '🌤️', condition: 'Unknown' };
};

// Calculate distance between two coordinates (Haversine formula)
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

// Geocoding: Convert city name to coordinates
export const getCoordinates = async (city: string): Promise<GeocodingResponse> => {
  const response = await fetch(
    `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch city coordinates');
  }
  
  const data = await response.json();
  
  if (!data.results || data.results.length === 0) {
    throw new Error(`City "${city}" not found`);
  }
  
  return data.results[0];
};

// Get weather data by coordinates (for pinpointing)
export const getWeatherByCoordinates = async (latitude: number, longitude: number): Promise<OpenMeteoCurrentResponse> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature&timezone=auto`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data for coordinates');
  }
  
  return response.json();
};

// Get forecast data by coordinates
export const getForecastByCoordinates = async (latitude: number, longitude: number): Promise<OpenMeteoForecastResponse> => {
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,wind_speed_10m,weather_code,precipitation_probability&timezone=auto`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data for coordinates');
  }
  
  return response.json();
};

// Get current weather data by city name
export const getCurrentWeather = async (city: string): Promise<OpenMeteoCurrentResponse> => {
  const coords = await getCoordinates(city);
  
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code,apparent_temperature&timezone=auto`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }
  
  return response.json();
};

// Get forecast data by city name
export const getForecast = async (city: string): Promise<OpenMeteoForecastResponse> => {
  const coords = await getCoordinates(city);
  
  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${coords.latitude}&longitude=${coords.longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,wind_speed_10m,weather_code,precipitation_probability&timezone=auto`
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch forecast data');
  }
  
  return response.json();
};

// Get nearby weather stations (using Open-Meteo's grid system)
export const getNearbyStations = async (latitude: number, longitude: number): Promise<WeatherStation[]> => {
  // Open-Meteo uses a grid system, so we'll create virtual stations around the coordinates
  const stations: WeatherStation[] = [];
  const radius = 0.1; // 0.1 degree radius (roughly 11km)
  
  for (let i = 0; i < 8; i++) {
    const angle = (i * Math.PI * 2) / 8;
    const lat = latitude + radius * Math.cos(angle);
    const lon = longitude + radius * Math.sin(angle);
    const distance = calculateDistance(latitude, longitude, lat, lon);
    
    stations.push({
      id: `station_${i}`,
      name: `Weather Point ${i + 1}`,
      latitude: lat,
      longitude: lon,
      distance: Math.round(distance * 10) / 10,
      elevation: Math.round((Math.random() * 1000 + 100)) // Simulated elevation
    });
  }
  
  // Sort by distance
  return stations.sort((a, b) => a.distance - b.distance);
};

// Transform Open-Meteo data to our app's format (Fahrenheit)
export const transformWeatherData = (
  city: string,
  current: OpenMeteoCurrentResponse,
  forecast: OpenMeteoForecastResponse
) => {
  const currentWeather = getWeatherInfo(current.current.weather_code);
  
  // Get next 24 hours of hourly data
  const now = new Date();
  const hourlyData = forecast.hourly?.time
    ?.map((timeStr, index) => {
      const time = new Date(timeStr);
      if (time > now && time <= new Date(now.getTime() + 24 * 60 * 60 * 1000)) {
        const weatherInfo = getWeatherInfo(forecast.hourly.weather_code[index]);
        return {
          time: time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
          temperature: Math.round(celsiusToFahrenheit(forecast.hourly.temperature_2m[index])),
          windSpeed: Math.round(forecast.hourly.wind_speed_10m[index]),
          condition: weatherInfo.condition,
          icon: weatherInfo.icon,
          precipitationProbability: forecast.hourly.precipitation_probability[index] || 0
        };
      }
      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .slice(0, 24) || []; // Limit to 24 hours, default to empty array
  
  return {
    location: city,
    current: {
      temperature: Math.round(celsiusToFahrenheit(current.current.temperature_2m)),
      condition: currentWeather.condition,
      icon: currentWeather.icon,
      humidity: current.current.relative_humidity_2m,
      windSpeed: Math.round(current.current.wind_speed_10m)
    },
    forecast: forecast.daily.time.slice(1, 4).map((dateStr, index) => {
      const date = new Date(dateStr);
      const dayNames = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const weatherInfo = getWeatherInfo(forecast.daily.weather_code[index + 1]);
      
      return {
        day: dayNames[index] || date.toLocaleDateString('en-US', { weekday: 'long' }),
        high: Math.round(celsiusToFahrenheit(forecast.daily.temperature_2m_max[index + 1])),
        low: Math.round(celsiusToFahrenheit(forecast.daily.temperature_2m_min[index + 1])),
        condition: weatherInfo.condition,
        icon: weatherInfo.icon
      };
    }),
    hourly: hourlyData
  };
};

// Transform coordinate-based weather data (Fahrenheit)
export const transformCoordinateWeatherData = (
  latitude: number,
  longitude: number,
  current: OpenMeteoCurrentResponse,
  forecast: OpenMeteoForecastResponse
) => {
  const currentWeather = getWeatherInfo(current.current.weather_code);
  
  // Get next 24 hours of hourly data
  const now = new Date();
  const hourlyData = forecast.hourly?.time
    ?.map((timeStr, index) => {
      const time = new Date(timeStr);
      if (time > now && time <= new Date(now.getTime() + 24 * 60 * 60 * 1000)) {
        const weatherInfo = getWeatherInfo(forecast.hourly.weather_code[index]);
        return {
          time: time.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
          temperature: Math.round(celsiusToFahrenheit(forecast.hourly.temperature_2m[index])),
          windSpeed: Math.round(forecast.hourly.wind_speed_10m[index]),
          condition: weatherInfo.condition,
          icon: weatherInfo.icon,
          precipitationProbability: forecast.hourly.precipitation_probability[index] || 0
        };
      }
      return null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)
    .slice(0, 24) || []; // Limit to 24 hours, default to empty array
  
  return {
    location: `📍 ${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
    current: {
      temperature: Math.round(celsiusToFahrenheit(current.current.temperature_2m)),
      condition: currentWeather.condition,
      icon: currentWeather.icon,
      humidity: current.current.relative_humidity_2m,
      windSpeed: Math.round(current.current.wind_speed_10m)
    },
    forecast: forecast.daily.time.slice(1, 4).map((dateStr, index) => {
      const date = new Date(dateStr);
      const dayNames = ['Today', 'Tomorrow', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
      const weatherInfo = getWeatherInfo(forecast.daily.weather_code[index + 1]);
      
      return {
        day: dayNames[index] || date.toLocaleDateString('en-US', { weekday: 'long' }),
        high: Math.round(celsiusToFahrenheit(forecast.daily.temperature_2m_max[index + 1])),
        low: Math.round(celsiusToFahrenheit(forecast.daily.temperature_2m_min[index + 1])),
        condition: weatherInfo.condition,
        icon: weatherInfo.icon
      };
    }),
    hourly: hourlyData
  };
};
