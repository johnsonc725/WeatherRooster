import React, { useState } from 'react';
import './SearchBar.css';

interface SearchBarProps {
  onSearch: (location: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleCityClick = (city: string) => {
    setSearchTerm(city);
    onSearch(city);
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter city name..."
          className="search-input"
        />
        <button type="submit" className="search-button">
          🔍 Search
        </button>
      </form>
      
      <div className="quick-cities">
        <p>Quick search:</p>
        <div className="city-buttons">
          <button 
            type="button" 
            className="city-button"
            onClick={() => handleCityClick('London')}
          >
            London
          </button>
          <button 
            type="button" 
            className="city-button"
            onClick={() => handleCityClick('New York')}
          >
            New York
          </button>
          <button 
            type="button" 
            className="city-button"
            onClick={() => handleCityClick('Tokyo')}
          >
            Tokyo
          </button>
          <button 
            type="button" 
            className="city-button"
            onClick={() => handleCityClick('Paris')}
          >
            Paris
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
