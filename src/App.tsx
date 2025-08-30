import React from 'react';
import './App.css';
import WeatherDashboard from './components/WeatherDashboard/WeatherDashboard';
import Header from './components/Header/Header';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <WeatherDashboard />
      </main>
    </div>
  );
}

export default App;
