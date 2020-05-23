import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import * as WEATHER from "./constants/constant";
import CurrentWeather from "./components/MainPage/CurrentWeather";

// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}

function App() {
  // console.log(WEATHER.API_KEY)
  const [activeCity, setActiveCity] = useState("Kathmandu");
  const [temperatureUnit, setTemperatureUnit] = useState("metric");
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState({});
  const [temperatureClass, setTemperatureClass] = useState("");
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const apiRequest = async () => {
      setLoading(true);
      try {
        const locationUrl = `https://api.openweathermap.org/data/2.5/weather?q=${activeCity}&units=${temperatureUnit}&appid=${WEATHER.API_KEY}`;

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
          iconId: currentConditions.weather[0].id,
        });

        setTemperature({
          ...temperature,
          temp: currentConditions.main.temp,
          highTemp: currentConditions.main.temp_max,
          lowTemp: currentConditions.main.temp_min,
        });

        setLocation(currentConditions.name);
        setLoading(false);
      } catch (e) {
        setLoading(false);
        console.error(e);
      }
    };

    apiRequest();
    
  }, [activeCity]);

  const convertTemperature = () => {
    if (temperatureUnit === "metric") {
      return (temperature.temp * 9) / 5 + 32;
    } else {
      return temperature.temp;
    }
  };

  const setTemperatureInfo = () => {
    let tempCheck = convertTemperature();
    if (tempCheck >= 100) {
      setTemperatureClass("boiling");
    }
    if (tempCheck < 100 && tempCheck >= 85) {
      setTemperatureClass("hot");
    }
    if (tempCheck < 85 && tempCheck >= 65) {
      setTemperatureClass("warm");
    }
    if (tempCheck < 65 && tempCheck >= 50) {
      setTemperatureClass("perfect");
    }
    if (tempCheck < 50 && tempCheck >= 32) {
      setTemperatureClass("cool");
    }
    if (tempCheck < 32) {
      setTemperatureClass("freezing");
    }
  };

  return (
    <div className="App">
      <CurrentWeather
        temperature={temperature.temp}
        city={activeCity}
        iconId={weather.iconId}
        description={weather.description}
        loading = {loading}
      />
    </div>
  );
}

export default App;
