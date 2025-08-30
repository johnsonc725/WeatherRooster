import React, { useState } from 'react';
import './CoordinateSearch.css';

interface CoordinateSearchProps {
  onCoordinateSearch: (latitude: number, longitude: number) => void;
  onNearbyStations: (latitude: number, longitude: number) => void;
}

const CoordinateSearch: React.FC<CoordinateSearchProps> = ({ onCoordinateSearch, onNearbyStations }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lon)) {
      alert('Please enter valid coordinates');
      return;
    }
    
    if (lat < -90 || lat > 90) {
      alert('Latitude must be between -90 and 90');
      return;
    }
    
    if (lon < -180 || lon > 180) {
      alert('Longitude must be between -180 and 180');
      return;
    }
    
    onCoordinateSearch(lat, lon);
  };

  const handleGetCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude.toFixed(6));
          setLongitude(position.coords.longitude.toFixed(6));
        },
        (error) => {
          alert(`Error getting location: ${error.message}`);
        }
      );
    } else {
      alert('Geolocation is not supported by this browser');
    }
  };

  const handleNearbyStations = () => {
    const lat = parseFloat(latitude);
    const lon = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lon)) {
      alert('Please enter valid coordinates first');
      return;
    }
    
    onNearbyStations(lat, lon);
  };

  return (
    <div className="coordinate-search">
      <div className="coordinate-header">
        <h3>📍 Pinpoint Weather Station</h3>
        <button 
          className="toggle-advanced"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced
        </button>
      </div>
      
      <form onSubmit={handleSubmit} className="coordinate-form">
        <div className="coordinate-inputs">
          <div className="input-group">
            <label htmlFor="latitude">Latitude:</label>
            <input
              id="latitude"
              type="number"
              step="0.000001"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              placeholder="e.g., 51.5074"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="longitude">Longitude:</label>
            <input
              id="longitude"
              type="number"
              step="0.000001"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              placeholder="e.g., -0.1278"
              required
            />
          </div>
        </div>
        
        <div className="coordinate-buttons">
          <button type="submit" className="search-btn">
            🔍 Get Weather
          </button>
          <button 
            type="button" 
            className="location-btn"
            onClick={handleGetCurrentLocation}
          >
            📍 My Location
          </button>
        </div>
      </form>
      
      {showAdvanced && (
        <div className="advanced-options">
          <h4>Advanced Options</h4>
          <button 
            type="button" 
            className="stations-btn"
            onClick={handleNearbyStations}
          >
            🏭 Find Nearby Stations
          </button>
          
          <div className="coordinate-help">
            <h5>Coordinate Format:</h5>
            <ul>
              <li><strong>Latitude:</strong> -90 to +90 (North/South)</li>
              <li><strong>Longitude:</strong> -180 to +180 (East/West)</li>
              <li><strong>Examples:</strong></li>
              <li>• London: 51.5074, -0.1278</li>
              <li>• New York: 40.7128, -74.0060</li>
              <li>• Tokyo: 35.6762, 139.6503</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordinateSearch;
