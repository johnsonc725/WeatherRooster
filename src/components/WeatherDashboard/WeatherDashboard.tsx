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

  const handleCitySearch = async (location: string) => {
    setLoading(true);
    setError(null);
    setStations([]);
    
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
    
    try {
      // Fetch both current weather and forecast by coordinates
      const [currentWeather, forecast] = await Promise.all([
        getWeatherByCoordinates(latitude, longitude),
        getForecastByCoordinates(latitude, longitude)
      ]);
      
      // Transform the coordinate data to our app's format
      const transformedData = transformCoordinateWeatherData(latitude, longitude, currentWeather, forecast);
      setWeatherData(transformedData);
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
          <WeatherCard data={weatherData} />
        </div>
      )}
      
      {stations.length > 0 && (
        <WeatherStations 
          stations={stations}
          onStationSelect={handleStationSelect}
        />
      )}
      
      {!weatherData && !loading && !error && (
        <div className="welcome-message">
          <h2>Welcome to Weather Rooster! 🐓</h2>
          <p>Choose your search method to get started with weather forecasting.</p>
          <p className="temp-unit-note">🌡️ All temperatures are displayed in Fahrenheit (°F)</p>
          
          {searchMode === 'city' ? (
            <div className="example-cities">
              <p>Try searching for:</p>
              <div className="city-tags">
                <span className="city-tag">London</span>
                <span className="city-tag">New York</span>
                <span className="city-tag">San Francisco</span>
                <span className="city-tag">Tokyo</span>
                <span className="city-tag">Paris</span>
                <span className="city-tag">Sydney</span>
              </div>
            </div>
          ) : (
            <div className="coordinate-examples">
              <p>Try these coordinates:</p>
              <div className="coordinate-examples-grid">
                <div className="coord-example">
                  <strong>London:</strong> 51.5074, -0.1278
                </div>
                <div className="coord-example">
                  <strong>New York:</strong> 40.7128, -74.0060
                </div>
                <div className="coord-example">
                  <strong>Tokyo:</strong> 35.6762, 139.6503
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
