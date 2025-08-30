import React, { useState } from 'react';
import './WeatherDashboard.css';
import WeatherCard from '../WeatherCard/WeatherCard';
import SearchBar from '../SearchBar/SearchBar';
import CoordinateSearch from '../CoordinateSearch/CoordinateSearch';
import WeatherStations from '../WeatherStations/WeatherStations';
import { WeatherData, WeatherStation } from '../../types/weather';
import { 
  getCurrentWeather, 
  getForecast, 
  transformWeatherData,
  getWeatherByCoordinates,
  getForecastByCoordinates,
  transformCoordinateWeatherData,
  getNearbyStations
} from '../../services/weatherApi';

const WeatherDashboard: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stations, setStations] = useState<WeatherStation[]>([]);
  const [searchMode, setSearchMode] = useState<'city' | 'coordinates'>('city');
  const [currentStation, setCurrentStation] = useState<WeatherStation | null>(null);

  const handleCitySearch = async (location: string) => {
    setLoading(true);
    setError(null);
    setStations([]);
    setCurrentStation(null);
    
    try {
      // Fetch both current weather and forecast
      const [currentWeather, forecast] = await Promise.all([
        getCurrentWeather(location),
        getForecast(location)
      ]);
      
      // Transform the data to our app's format
      const transformedData = transformWeatherData(location, currentWeather, forecast);
      setWeatherData(transformedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleCoordinateSearch = async (latitude: number, longitude: number) => {
    setLoading(true);
    setError(null);
    setStations([]);
    setCurrentStation(null);
    
    try {
      // Fetch both current weather and forecast by coordinates
      const [currentWeather, forecast] = await Promise.all([
        getWeatherByCoordinates(latitude, longitude),
        getForecastByCoordinates(latitude, longitude)
      ]);
      
      // Transform the coordinate data to our app's format
      const transformedData = transformCoordinateWeatherData(latitude, longitude, currentWeather, forecast);
      setWeatherData(transformedData);
      
      // Automatically fetch nearby stations
      try {
        const nearbyStations = await getNearbyStations(latitude, longitude);
        console.log('Fetched stations:', nearbyStations);
        setStations(nearbyStations);
      } catch (stationErr) {
        console.warn('Failed to fetch nearby stations:', stationErr);
        // Don't set error for station fetch failure, just log it
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch weather data for coordinates');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleNearbyStations = async (latitude: number, longitude: number) => {
    try {
      const nearbyStations = await getNearbyStations(latitude, longitude);
      setStations(nearbyStations);
    } catch (err) {
      setError('Failed to fetch nearby weather stations');
    }
  };

  const handleStationSelect = (latitude: number, longitude: number) => {
    // Find the selected station
    const selectedStation = stations.find(station => 
      station.latitude === latitude && station.longitude === longitude
    );
    if (selectedStation) {
      setCurrentStation(selectedStation);
    }
    handleCoordinateSearch(latitude, longitude);
  };

  return (
    <div className="weather-dashboard">
      <div className="search-mode-toggle">
        <button 
          className={`mode-btn ${searchMode === 'city' ? 'active' : ''}`}
          onClick={() => setSearchMode('city')}
        >
          🌍 City Search
        </button>
        <button 
          className={`mode-btn ${searchMode === 'coordinates' ? 'active' : ''}`}
          onClick={() => setSearchMode('coordinates')}
        >
          📍 Coordinate Search
        </button>
      </div>

      {searchMode === 'city' ? (
        <SearchBar onSearch={handleCitySearch} />
      ) : (
        <CoordinateSearch 
          onCoordinateSearch={handleCoordinateSearch}
          onNearbyStations={handleNearbyStations}
        />
      )}
      
      {loading && (
        <div className="loading">
          <div className="spinner"></div>
          <p>Fetching weather data...</p>
        </div>
      )}
      
      {error && (
        <div className="error-message">
          <h3>❌ Error</h3>
          <p>{error}</p>
          <p className="error-tip">Please check your input and try again.</p>
        </div>
      )}
      
      {weatherData && !loading && !error && (
        <div className="weather-content">
          <WeatherCard data={weatherData} station={currentStation} allStations={stations} />
        </div>
      )}
      
      {stations.length > 0 && (
        <WeatherStations 
          stations={stations}
          onStationSelect={handleStationSelect}
        />
      )}
      
      {!weatherData && !loading && !error && (
        <div className="default-weather">
          <WeatherCard 
            data={{
              location: "San Francisco",
              current: {
                temperature: 65,
                condition: "Partly Cloudy",
                icon: "⛅",
                humidity: 72,
                windSpeed: 12
              },
              forecast: [
                {
                  day: "Tomorrow",
                  high: 68,
                  low: 58,
                  condition: "Partly Cloudy",
                  icon: "⛅"
                },
                {
                  day: "Wednesday",
                  high: 70,
                  low: 60,
                  condition: "Sunny",
                  icon: "☀️"
                },
                {
                  day: "Thursday",
                  high: 72,
                  low: 62,
                  condition: "Clear Sky",
                  icon: "☀️"
                }
              ],
              hourly: [
                {
                  time: "1 PM",
                  temperature: 67,
                  windSpeed: 10,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 15
                },
                {
                  time: "2 PM",
                  temperature: 68,
                  windSpeed: 12,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 10
                },
                {
                  time: "3 PM",
                  temperature: 69,
                  windSpeed: 14,
                  condition: "Sunny",
                  icon: "☀️",
                  precipitationProbability: 5
                },
                {
                  time: "4 PM",
                  temperature: 70,
                  windSpeed: 15,
                  condition: "Sunny",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "5 PM",
                  temperature: 69,
                  windSpeed: 13,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 0
                },
                {
                  time: "6 PM",
                  temperature: 67,
                  windSpeed: 11,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 0
                },
                {
                  time: "7 PM",
                  temperature: 65,
                  windSpeed: 9,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "8 PM",
                  temperature: 63,
                  windSpeed: 8,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "9 PM",
                  temperature: 61,
                  windSpeed: 7,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "10 PM",
                  temperature: 59,
                  windSpeed: 6,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "11 PM",
                  temperature: 57,
                  windSpeed: 5,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "12 AM",
                  temperature: 56,
                  windSpeed: 4,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "1 AM",
                  temperature: 55,
                  windSpeed: 3,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "2 AM",
                  temperature: 54,
                  windSpeed: 3,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "3 AM",
                  temperature: 53,
                  windSpeed: 2,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "4 AM",
                  temperature: 52,
                  windSpeed: 2,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "5 AM",
                  temperature: 51,
                  windSpeed: 1,
                  condition: "Clear Sky",
                  icon: "☀️",
                  precipitationProbability: 0
                },
                {
                  time: "6 AM",
                  temperature: 52,
                  windSpeed: 2,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 5
                },
                {
                  time: "7 AM",
                  temperature: 54,
                  windSpeed: 3,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 10
                },
                {
                  time: "8 AM",
                  temperature: 56,
                  windSpeed: 4,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 15
                },
                {
                  time: "9 AM",
                  temperature: 58,
                  windSpeed: 5,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 20
                },
                {
                  time: "10 AM",
                  temperature: 60,
                  windSpeed: 6,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 25
                },
                {
                  time: "11 AM",
                  temperature: 62,
                  windSpeed: 7,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 30
                },
                {
                  time: "12 PM",
                  temperature: 64,
                  windSpeed: 8,
                  condition: "Partly Cloudy",
                  icon: "⛅",
                  precipitationProbability: 25
                }
              ]
            }}
            station={null}
            allStations={[]}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
