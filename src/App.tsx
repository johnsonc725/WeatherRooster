import React, { useState } from 'react';
import './App.css';
import WeatherDashboard from './components/WeatherDashboard/WeatherDashboard';
import Header from './components/Header/Header';

function App() {
  const [resetKey, setResetKey] = useState(0);

  const handleLogoClick = () => {
    setResetKey(prev => prev + 1);
  };

  return (
    <div className="App">
      <Header onLogoClick={handleLogoClick} />
      <main className="main-content">
        <WeatherDashboard key={resetKey} />
      </main>
    </div>
  );
}

export default App;
