import React, { useEffect, useState } from "react";

const BarWeather = ({ weather, temp, isCelsius }) => {
  const [degrees, setDegrees] = useState("");

  useEffect(() => {
    setDegrees(weather?.wind.deg);

    // Conversion de grados cardinales a rosa de los vientos(North, South, East, West)
    if (degrees >= 0 && degrees < 25) {
      setDegrees("N");
    } else if (degrees >= 25 && degrees <= 65) {
      setDegrees("NE");
    } else if (degrees > 65 && degrees <= 115) {
      setDegrees("E");
    } else if (degrees > 115 && degrees <= 155) {
      setDegrees("SE");
    } else if (degrees > 155 && degrees <= 205) {
      setDegrees("S");
    } else if (degrees > 205 && degrees <= 250) {
      setDegrees("SW");
    } else if (degrees > 250 && degrees <= 290) {
      setDegrees("W");
    } else if (degrees > 290 && degrees <= 335) {
      setDegrees("NW");
    } else if (degrees > 335 && degrees <= 350) {
      setDegrees("N");
    }
  }, []);

  return (
    <div className="bar">
      <article className="card">
        <h5 className="card__title wind__title">Wind speed</h5>
        <h3 className="card__icon wind__icon">
          <i className="fa-solid fa-location-arrow"></i>
        </h3>
        <h4 className="wind__speed">
          <span className="card__span">{weather?.wind.speed}</span> M/S
        </h4>
        <h4 className="wind__direction">
          <span className="card__span">{degrees}</span>°
        </h4>
      </article>
      <article className="card">
        <h5 className="card__title clouds__title">% Clouds</h5>
        <h3 className="card__icon clouds__icon">
          <i className="fa-solid fa-cloud"></i>
        </h3>
        <h4 className="clouds__info">
          <span className="card__span">{weather?.clouds.all}</span> %
        </h4>
      </article>
      <article className="card">
        <h5 className="card__title humidity__title">% Humidity</h5>
        <h3 className="card__icon humidity__icon">
          <i className="fa-solid fa-droplet"></i>
        </h3>
        <h4 className="humidity__info">
          <span className="card__span">{weather?.main.humidity}</span> %
        </h4>
      </article>
      <article className="card">
        <h5 className="card__title pressure__title">Pressure</h5>
        <h3 className="card__icon pressure__icon">
          <i className="fa-solid fa-arrows-down-to-line"></i>
        </h3>
        <h4 className="pressure__info">
          <span className="card__span">{weather?.main.pressure}</span> hPa
        </h4>
      </article>
      <article className="card">
        <h5 className="card__title feels__title">Apparent temperature</h5>
        <h3 className="card__icon feels__icon">
          <i className="fa-solid fa-temperature-half"></i>
        </h3>
        <h4 className="feels__info">
          <span className="card__span">
            {isCelsius ? temp?.celsiusFeels : temp?.farenheitFeels}
          </span>
          {isCelsius ? "°C" : "°F"}
        </h4>
      </article>
    </div>
  );
};

export default BarWeather;
