import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import * as WEATHER from "./constants/constant";

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

function App() {
  // console.log(WEATHER.API_KEY)
  const [activeCity, setActiveCity] = useState("Kathmandu");
  const [temperatureUnit, setTemperatureUnit] = useState("metric");
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState({});

  useEffect(() => {
    const apiRequest = async () => {
      try {
        const locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${activeCity}&appid=${WEATHER.API_KEY}`;

        let res = await axios.get(locationUrl);
        let currentConditions = res.data;
        console.log(currentConditions);

        setWeather({
          ...weather,
          description: currentConditions.weather[0].main,
          humidity: currentConditions.main.humidity,
          sunrise: currentConditions.sys.sunrise,
          sunset: currentConditions.sys.sunset,
          windSpeed: `${currentConditions.wind.speed} ${
            temperatureUnit === "metric" ? "m/s" : "mph"
          }`,
          iconId: currentConditions.weather[0].id
        });

        setTemperature({
          ...temperature,
          temp: currentConditions.main.temp,
          highTemp: currentConditions.main.temp_max,
          lowTemp: currentConditions.main.temp_min,
        });

        setLocation(currentConditions.name);
      } catch (e) {
        console.error(e);
      }
    };

    apiRequest();
  }, [activeCity]);

  return (
    <div className="App">
      <h1>{location}</h1>
      <h2>{temperature.lowTemp}</h2>
      <h3>windspeed = {weather.windSpeed} </h3>
    </div>
  );
}

export default App;
