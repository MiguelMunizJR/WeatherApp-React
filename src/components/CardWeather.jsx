import React, { useEffect, useState } from "react";
import LoadingScreen from "./LoadingScreen";
import axios from "axios";

const CardWeather = ({ lat, lon }) => {
  const [weather, setWeather] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  //Convertir Kelvins a Celsius y Farenheit
  const temp = {
    celsius: Math.round(weather?.main.temp - 273.15),
    celsiusMax: Math.round(weather?.main.temp_max - 273.15),
    celsiusMin: Math.round(weather?.main.temp_min - 273.15),
    farenheit: Math.round(((weather?.main.temp - 273.15) * 9) / 5 + 3),
    farenheitMax: Math.round(((weather?.main.temp_max - 273.15) * 9) / 5 + 3),
    farenheitMin: Math.round(((weather?.main.temp_min - 273.15) * 9) / 5 + 3),
  };

  useEffect(() => {
    const APIKey = "94b6ecc8f1e9c5b9aa77a83082dc0abf";
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;

    axios
      .get(URL)
      .then((res) => {
        setWeather(res.data);
        setIsLoading(false);
      })
      .catch((err) => console.log(err.data));
  }, [lat, lon]);

  // console.log(weather);

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <section className="container">
        <article className="location">
          <h2 className="location__title">
            <i className="fa-solid fa-location-dot"></i>{" "}
            {`${weather?.name}, ${weather?.sys.country}`}
          </h2>
        </article>
        <article className="weather">
          <div className="weather__img">
            <img
              src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
              alt="icon-weather"
              className="img"
            />
          </div>
          <h2 className="weather__temp">
            <span>{isCelsius ? temp.celsius : temp.farenheit}</span>
            {isCelsius ? "°C" : "°F"}
          </h2>
          <div className="weather__maxmin">
            <div className="maxmin">
              <h4 className="maxmin__title">Max</h4>
              <h4 className="maxmin__temp">
                <span>{isCelsius ? temp.celsiusMax : temp.farenheitMax}</span>
                {isCelsius ? "°C" : "°F"}
              </h4>
            </div>
            <div className="maxmin">
              <h4 className="maxmin__title">Min</h4>
              <h4 className="maxmin__temp">
                <span>{isCelsius ? temp.celsiusMin : temp.farenheitMin}</span>
                {isCelsius ? "°C" : "°F"}
              </h4>
            </div>
          </div>
        </article>
        <article className="info">
          <h3 className="info__title">{weather?.weather[0].main}</h3>
          <h4 className="info__subtitle">{weather?.weather[0].description}</h4>
        </article>
      </section>
    );
  }
};

export default CardWeather;
