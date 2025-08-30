import React from 'react';
import './Header.css';

interface HeaderProps {
  onLogoClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogoClick }) => {
  const handleLogoClick = () => {
    if (onLogoClick) {
      onLogoClick();
    }
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1 
          className={`logo ${onLogoClick ? 'clickable' : ''}`}
          onClick={handleLogoClick}
        >
          🌤️ Weather Rooster
        </h1>
        <p className="tagline">Your daily weather companion</p>
      </div>
    </header>
  );
};

export default Header;
