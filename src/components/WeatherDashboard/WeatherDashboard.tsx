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
              hourly: []
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
