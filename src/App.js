
import React, { useEffect, useRef, useState } from 'react'
import './App.css'
function App() {
  const inputref = useRef();
  const [weatherData, setweatherData] = useState(null);

  const search = async (city) => {
    if (city === "") {
      alert("Enter City Name");
      return;
    }

    try {
      const apiKey = '3703a630f7d8819ed203c05eb582c104';
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      const response = await fetch(url);
      const data = await response.json();
      // console.log(data)

      setweatherData({
        temp: data.main.temp,
        location: data.name,
        description: data.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        humidity: data.main.humidity

      });
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }

  useEffect(() => {
    search("Delhi");
  }, []);

  return (
    <div className="weather-app">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city name"
          ref={inputref}
        />
        <button onClick={() => search(inputref.current.value)}>
          <i className="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>

      {weatherData && (
        <div className="weather-info">
          <h2>{weatherData.location}</h2>
          <p>{weatherData.temp}°C</p>
          <p>{weatherData.description}</p>
          <img src={weatherData.icon} alt={weatherData.description} />
          <p>Humidity:{weatherData.humidity}</p>
        </div>
      )}
    </div>
  )
}

export default App