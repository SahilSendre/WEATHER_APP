import React, { useState } from 'react';
import 'boxicons';
import clear from '../image/clear.png';
import rain from '../image/rain.png';
import snow from '../image/snow.png';
import cloud from '../image/cloud.png';
import mist from '../image/mist.png';

function WeatherHome() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState({
    temperature: 0,
    description: '',
    humidity: 0,
    windSpeed: 0,
    weatherType: 'Clear', // default value
  });

  const getWeatherImage = () => {
    switch (weatherData.weatherType) {
      case 'Clear':
        return clear;
      case 'Rain':
        return rain;
      case 'Snow':
        return snow;
      case 'Clouds':
        return cloud;
      case 'Mist':
      case 'Haze':
        return mist;
      default:
        return clear;
    }
  };

  const handleSearchClick = async () => {
    if (city === '') return;

    const APIkey = '6fa0b3489111fe01fff8ca8d5a0318fd';

    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIkey}`
      );

      if (!response.ok) {
        throw new Error('City not found');
      }

      const data = await response.json();
      document.getElementById('cityNotFound').innerHTML = ""
      setWeatherData({
        temperature: data.main.temp,
        description: data.weather[0].description,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        weatherType: data.weather[0].main,

        
      });
    } catch (error) {
    //   console.error('Error fetching weather data:', error.message);
      document.getElementById('cityNotFound').innerHTML = "Invalid Input !"
    }
  };

  return (
    <div className="container w-[100%] h-screen flex justify-center items-center m-auto">
      <div className="search-box max-[320px]:w-[90%] max-[420px]:w-[90%]w-[50%] h-auto rounded-lg p-3">
        <div className="search-box w-[100%] h-16 rounded-lg bg-transparent flex items-center justify-center p-3 mb-3">
          <i className="bx bxs-map text-white mx-1"></i>
          <input
            type="text"
            placeholder="Enter your location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className="text-white placeholder:text-lg placeholder:text-white w-[100%] h-[100%] bg-transparent text capitalize focus-within:outline-none focus:text-white"
          />
          <button className="bx bx-search text-white mx-1" onClick={handleSearchClick}></button>
        </div>
        
        <span id='cityNotFound' className='text-white text-sm'></span>
<br />
        <div className="weather-box flex items-center flex-col">
          <img src={getWeatherImage()} alt={weatherData.weatherType} className="w-20" />
          <p className="temperature text-3xl text-white font-semibold">
            {weatherData.temperature} <span>°C</span>
          </p>
          <p className="description text-md text-white ">{weatherData.description}</p>
        </div>

        <div className="weather-details w-[100%] flex justify-between mt-8 max-[320px]:p-2 p-8">
          <div className="humidity text-white flex items-center w-[50%] justify-around">
            <i className="bx bx-water  max-[320px]:text-sm text-3xl font-semibold"></i>
            <div className="info-humidity p-3">
              <span className="max-[320px]:text-sm text-lg font-semibold">{weatherData.humidity} %</span>
              <p className="text-white text-xs">Humidity</p>
            </div>
          </div>

          <div className="wind-speed flex items-center w-[50%] justify-around text-white ml-4">
            <i className="bx bx-wind text-white max-[320px]:text-sm text-3xl font-semibold"></i>
            <div className="info-wind p-3">
              <span className="max-[320px]:text-sm text-lg font-semibold">{weatherData.windSpeed}km/h</span>
              <p className=" text-xs">Wind Speed</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WeatherHome;
