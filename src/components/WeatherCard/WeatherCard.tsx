import React from 'react';
import './WeatherCard.css';
import { WeatherData } from '../../types/weather';

interface WeatherCardProps {
  data: WeatherData;
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data }) => {
  return (
    <div className="weather-card">
      <div className="current-weather">
        <h2 className="location">{data.location}</h2>
        <div className="current-details">
          <div className="temperature">
            <span className="temp-value">{data.current.temperature}°F</span>
            <span className="condition">{data.current.condition}</span>
          </div>
          <div className="weather-icon">
            {data.current.icon}
          </div>
        </div>
        <div className="weather-stats">
          <div className="stat">
            <span className="stat-label">Humidity</span>
            <span className="stat-value">{data.current.humidity}%</span>
          </div>
          <div className="stat">
            <span className="stat-label">Wind</span>
            <span className="stat-value">{data.current.windSpeed} km/h</span>
          </div>
        </div>
      </div>
      
      <div className="forecast">
        <h3>3-Day Forecast</h3>
        <div className="forecast-items">
          {data.forecast.map((day, index) => (
            <div key={index} className="forecast-item">
              <div className="forecast-day">{day.day}</div>
              <div className="forecast-icon">{day.icon}</div>
              <div className="forecast-temps">
                <span className="high">{day.high}°F</span>
                <span className="low">{day.low}°F</span>
              </div>
              <div className="forecast-condition">{day.condition}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
