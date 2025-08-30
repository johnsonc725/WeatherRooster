import React from 'react';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">
          🌤️ Weather Rooster
        </h1>
        <p className="tagline">Your daily weather companion</p>
      </div>
    </header>
  );
};

export default Header;
