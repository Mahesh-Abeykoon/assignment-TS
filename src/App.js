import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [latitude, setLatitude] = useState('6.9271');
  const [longitude, setLongitude] = useState('79.8612');
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);

  const apiKey = '33c92b0552e0eea71460739025382726';

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="App">
      <h1>Weather App</h1>
      <div className="latitude-longitude left-corner">
        <p>{latitude} | {longitude}</p>
      </div>
      <div className="weather-info">
        <div className="left-section">
          {weatherData && (
            <>
              <h2>{weatherData.name}, {weatherData.sys.country}</h2>
              <p>{new Date(weatherData.dt * 1000).toDateString()}</p>
            </>
          )}
          <div className="icon-value">
            {weatherData && (
              <>
                <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`} alt="Weather Icon" />
                <p>{Math.floor(weatherData.main.temp)}°</p>
              </>
            )}
          </div>
          <div className="icon-status">
            {weatherData && (
              <>
                <p>{weatherData.weather[0].main}</p>
              </>
            )}
          </div>
          <div>
            
          </div>
        </div>
        <div className="right-section">
          {weatherData && (
            <>
              <div>
                {weatherData.main && <p><div>{Math.floor(weatherData.main.temp_max)}°</div>High</p>}
                {weatherData.wind && <p><div>{Math.floor(weatherData.wind.speed)} mph</div>Wind</p>}
                {weatherData.sys && <p><div>{new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([],{ hour: "2-digit", minute: "2-digit",hour12: false })}</div>Sunrise</p>}
              </div>
              <div>
                {weatherData.main && <p><div>{Math.floor(weatherData.main.temp_min)}°C</div>Low</p>}
                {weatherData.clouds && <p><div>{Math.floor(weatherData.clouds.all)}%</div>Rain</p>}
                {weatherData.sys && <p><div>{new Date(weatherData.sys.sunset * 1000).toLocaleTimeString(
                  [],{ hour: "2-digit", minute: "2-digit",hour12: false })}</div>Sunset</p>}
              </div>
            </>
          )}
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default App;
