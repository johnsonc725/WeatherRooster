import React from 'react';
import './WeatherCard.css';
import { WeatherData, WeatherStation } from '../../types/weather';

interface WeatherCardProps {
  data: WeatherData;
  station?: WeatherStation | null;
  allStations?: WeatherStation[];
}

const WeatherCard: React.FC<WeatherCardProps> = ({ data, station, allStations }) => {
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
        
        {station && (
          <div className="weather-station-info">
            <div className="station-header">
              <span className="station-icon">🏭</span>
              <span className="station-name">{station.name}</span>
            </div>
            <div className="station-details">
              <div className="station-coordinate">
                <span className="coordinate-label">Lat:</span>
                <span className="coordinate-value">{station.latitude.toFixed(4)}</span>
              </div>
              <div className="station-coordinate">
                <span className="coordinate-label">Lon:</span>
                <span className="coordinate-value">{station.longitude.toFixed(4)}</span>
              </div>
              <div className="station-distance">
                <span className="distance-label">Distance:</span>
                <span className="distance-value">{station.distance} km</span>
              </div>
              {station.elevation && (
                <div className="station-elevation">
                  <span className="elevation-label">Elevation:</span>
                  <span className="elevation-value">{station.elevation}m</span>
                </div>
              )}
            </div>
          </div>
        )}
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
      
      {data.hourly && data.hourly.length > 0 && (
        <div className="hourly-forecast">
          <h3>24-Hour Forecast</h3>
          <div className="hourly-items">
            {data.hourly.map((hour, index) => {
              const now = new Date();
              const currentHour = now.getHours();
              const hourNumber = parseInt(hour.time.split(' ')[0]);
              const isPM = hour.time.includes('PM');
              const hour24 = isPM && hourNumber !== 12 ? hourNumber + 12 : hourNumber === 12 && !isPM ? 0 : hourNumber;
              
              const isCurrentHour = hour24 === currentHour;
              const isPastHour = hour24 < currentHour;
              
              return (
                <div 
                  key={index} 
                  className={`hourly-item ${isCurrentHour ? 'current-hour' : ''} ${isPastHour ? 'past-hour' : ''}`}
                >
                  <div className="hourly-time">{hour.time}</div>
                  <div className="hourly-icon">{hour.icon}</div>
                  <div className="hourly-temp">{hour.temperature}°F</div>
                  <div className="hourly-details">
                    <div className="hourly-wind">💨 {hour.windSpeed} km/h</div>
                    <div className="hourly-precipitation">🌧️ {hour.precipitationProbability}%</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      
      {allStations && allStations.length > 0 && (
        <div className="all-stations-section">
          <h3>🏭 All Available Weather Stations ({allStations.length})</h3>
          <div className="all-stations-grid">
            {allStations.map((station, index) => (
              <div key={station.id} className="station-card-compact">
                <div className="station-card-header">
                  <span className="station-name-compact">{station.name}</span>
                  <span className="station-distance-compact">{station.distance} km</span>
                </div>
                <div className="station-card-coordinates">
                  <div className="coordinate-compact">
                    <span className="coord-label">Lat:</span>
                    <span className="coord-value">{station.latitude.toFixed(4)}</span>
                  </div>
                  <div className="coordinate-compact">
                    <span className="coord-label">Lon:</span>
                    <span className="coord-value">{station.longitude.toFixed(4)}</span>
                  </div>
                </div>
                {station.elevation && (
                  <div className="station-elevation-compact">
                    <span className="elevation-label">Elevation:</span>
                    <span className="elevation-value">{station.elevation}m</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Debug info */}
      <div style={{marginTop: '20px', padding: '10px', background: 'rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '12px'}}>
        <p>Debug: allStations = {allStations ? `${allStations.length} stations` : 'undefined'}</p>
        <p>Debug: stations array = {JSON.stringify(allStations?.slice(0, 2))}</p>
      </div>
    </div>
  );
};

export default WeatherCard;
