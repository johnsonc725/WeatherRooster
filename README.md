# Weather Rooster 🌤️

A beautiful and modern weather application built with React and TypeScript. Get your daily weather forecast with real-time data from Open-Meteo API - completely free with no API keys required!

## ✨ Features

- 🌍 **Real Weather Data**: Powered by Open-Meteo API (100% free!)
- 🔍 **Location Search**: Search for any city or location worldwide
- 🌡️ **Current Weather**: Real-time temperature, conditions, and weather stats
- 📅 **3-Day Forecast**: Extended weather outlook with daily predictions
- 📱 **Responsive Design**: Works perfectly on all devices
- 🎨 **Modern UI**: Beautiful glassmorphism design with smooth animations
- ⚡ **Fast Performance**: Built with React 18 and optimized for speed
- 🚀 **Quick Cities**: One-click access to popular cities
- 🔑 **No API Key Required**: Open-Meteo is completely free!

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: CSS3 with modern features (backdrop-filter, CSS Grid, Flexbox)
- **Build Tool**: Create React App
- **Package Manager**: npm
- **Weather API**: Open-Meteo (completely free, no rate limits!)

## 🚀 Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm (comes with Node.js)
- **No API key required!** Open-Meteo is completely free

### Installation

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd WeatherRooster
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser** to `http://localhost:3000`

**That's it!** No API keys, no configuration needed. Open-Meteo provides free weather data instantly.

## 🔑 API Features

Open-Meteo provides:
- **100% Free**: No API keys, no rate limits, no costs
- **High Accuracy**: Uses multiple weather models for reliable data
- **Global Coverage**: Weather data for any location worldwide
- **Real-time Updates**: Current conditions and forecasts
- **Multiple Parameters**: Temperature, humidity, wind, weather codes
- **Geocoding**: Automatic city name to coordinates conversion

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header/         # App header component
│   ├── SearchBar/      # Location search component
│   ├── WeatherCard/    # Weather display component
│   └── WeatherDashboard/ # Main dashboard component
├── services/           # API services
│   └── weatherApi.ts  # Open-Meteo API integration
├── types/              # TypeScript type definitions
├── App.tsx            # Main App component
├── index.tsx          # Application entry point
└── styles/            # CSS files
```

## 🎯 Component Architecture

- **App**: Main application wrapper
- **Header**: App title and branding
- **WeatherDashboard**: Main container managing weather state and API calls
- **SearchBar**: Location input, search functionality, and quick city buttons
- **WeatherCard**: Displays current weather and forecast data
- **weatherApi**: Handles all Open-Meteo API communication

## 🌟 Features Implemented

- ✅ **Real Weather API Integration**: Live data from Open-Meteo
- ✅ **No API Key Required**: Completely free weather service
- ✅ **Error Handling**: User-friendly error messages for invalid cities
- ✅ **Quick City Buttons**: One-click access to popular cities
- ✅ **Loading States**: Smooth loading animations during API calls
- ✅ **Responsive Design**: Mobile-first approach with touch-friendly interface
- ✅ **WMO Weather Codes**: Professional weather condition mapping

## 🚀 Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## 🔮 Future Enhancements

- [ ] **Geolocation Support**: Automatic location detection
- [ ] **Weather Alerts**: Severe weather notifications
- [ ] **Theme Toggle**: Dark/light mode switch
- [ ] **Unit Conversion**: Celsius/Fahrenheit toggle
- [ ] **Weather Maps**: Interactive weather radar
- [ ] **Historical Data**: Past weather information
- [ ] **PWA Features**: Offline support and app installation
- [ ] **Weather Widgets**: Customizable dashboard components

## 🐛 Troubleshooting

### Common Issues:

1. **"City not found" error:**
   - Check if the city name is spelled correctly
   - Try using the country name after the city (e.g., "London, UK")
   - Use the quick city buttons for popular locations

2. **Weather data not loading:**
   - Check your internet connection
   - Ensure the development server is running (`npm start`)
   - Check browser console for error messages

3. **App not loading:**
   - Ensure all dependencies are installed (`npm install`)
   - Check browser console for error messages
   - Verify the development server is running (`npm start`)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Open-Meteo** for providing completely free weather data
- Weather icons provided by emoji
- Design inspiration from modern weather apps
- Built with ❤️ using React and TypeScript

## 📞 Support

If you encounter any issues or have questions:
1. Check the troubleshooting section above
2. Review the Open-Meteo API documentation
3. Open an issue on GitHub
4. Check the browser console for error messages

---

**Happy Weather Forecasting! 🌤️🐓**

*Powered by Open-Meteo - The Free Weather API*
