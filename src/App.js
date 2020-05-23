import React, { useState, useEffect } from "react";
import axios from "axios";

import "./App.css";

import * as WEATHER from "./constants/constant";
import CurrentWeather from "./components/MainPage/CurrentWeather";
import DetailWeather from "./components/MainPage/DetailWeather";
import Loading from "./components/MainPage/Loading";
import NavSearchBar from "./components/Appbar/NavSearchBar";


function App() {
  const [activeCity, setActiveCity] = useState("Kathmandu");
  const [temperatureUnit, setTemperatureUnit] = useState("metric");
  const [weather, setWeather] = useState({});
  const [location, setLocation] = useState("");
  const [temperature, setTemperature] = useState({});
  const [callApi, setCallApi] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errorFlag, setErrorFlag] = useState(false);

  const handleChange = (e) => {
    setActiveCity(e.target.value);
  };

  const handleApiCall = (e) => {
    e.preventDefault();
    !callApi ? setCallApi(true) : setCallApi(false);
  };

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
          time: currentConditions.dt,
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
        setErrorFlag(true);
      }
    };

    apiRequest();
  }, [callApi]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="App">
      <NavSearchBar
        handleChangeCity={handleChange}
        currentCity={activeCity}
        handleApiCall={handleApiCall}
      />
      <CurrentWeather
        temperature={temperature.temp}
        city={location}
        iconId={weather.iconId}
        description={weather.description}
        loading={loading}
      />

      <DetailWeather
        highTemp={temperature.highTemp}
        lowTemp={temperature.lowTemp}
        sunRise={weather.sunrise}
        sunSet={weather.sunset}
        humidity={weather.humidity}
        windSpeed={weather.windSpeed}
        time={weather.time}
      />
    </div>
  );
}

export default App;
