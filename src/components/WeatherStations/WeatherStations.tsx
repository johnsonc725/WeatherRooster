import React from 'react';
import './WeatherStations.css';
import { WeatherStation } from '../../services/weatherApi';

interface WeatherStationsProps {
  stations: WeatherStation[];
  onStationSelect: (latitude: number, longitude: number) => void;
}

const WeatherStations: React.FC<WeatherStationsProps> = ({ stations, onStationSelect }) => {
  if (stations.length === 0) {
    return null;
  }

  return (
    <div className="weather-stations">
      <h3>🏭 Nearby Weather Points</h3>
      <p className="stations-description">
        These are virtual weather monitoring points around your selected coordinates.
        Click on any point to get weather data for that specific location.
      </p>
      
      <div className="stations-grid">
        {stations.map((station) => (
          <div 
            key={station.id} 
            className="station-card"
            onClick={() => onStationSelect(station.latitude, station.longitude)}
          >
            <div className="station-header">
              <h4>{station.name}</h4>
              <span className="station-distance">{station.distance} km</span>
            </div>
            
            <div className="station-coordinates">
              <div className="coordinate">
                <span className="label">Lat:</span>
                <span className="value">{station.latitude.toFixed(4)}</span>
              </div>
              <div className="coordinate">
                <span className="label">Lon:</span>
                <span className="value">{station.longitude.toFixed(4)}</span>
              </div>
            </div>
            
            {station.elevation && (
              <div className="station-elevation">
                <span className="label">Elevation:</span>
                <span className="value">{station.elevation}m</span>
              </div>
            )}
            
            <div className="station-action">
              <span className="click-hint">Click to get weather</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="stations-info">
        <p>
          <strong>Note:</strong> These are simulated weather monitoring points based on Open-Meteo's grid system. 
          Each point represents a different weather data grid cell for more precise local forecasting.
        </p>
      </div>
    </div>
  );
};

export default WeatherStations;
