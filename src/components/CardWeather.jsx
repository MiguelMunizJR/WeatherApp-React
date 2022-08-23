const CardWeather = ({
  weather,
  temp,
  date,
  isCelsius,
  setIsCelsius,
  menuMobile,
}) => {
  const toggleTemp = () => {
    setIsCelsius(!isCelsius);
  };

  const refresh = () => {
    location.reload();
  };

  return (
    <section className="container">
      <article className="location">
        <h2 className="location__title">
          <i className="fa-solid fa-location-dot"></i>{" "}
          {`${weather?.name}, ${weather?.sys.country}`}
        </h2>
        <h3 className="location__date">{date?.toDateString()}</h3>
      </article>
      <div className="menu__mobile" onClick={menuMobile}>
        <i className="fa-solid fa-bars"></i>
      </div>
      <article className="weather">
        <div className="weather__img">
          <img
            src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`}
            alt="icon-weather"
            className="img"
          />
        </div>
        <h2 className="weather__temp">
          <span>{isCelsius ? temp?.celsius : temp?.farenheit}</span>
          {isCelsius ? "°C" : "°F"}
        </h2>
        <div className="weather__maxmin">
          <div className="maxmin">
            <h4 className="maxmin__title">Min</h4>
            <h4 className="maxmin__temp">
              <span>{isCelsius ? temp?.celsiusMin : temp?.farenheitMin}</span>
              {isCelsius ? "°C" : "°F"}
            </h4>
          </div>
          <div className="maxmin">
            <h4 className="maxmin__title">Max</h4>
            <h4 className="maxmin__temp">
              <span>{isCelsius ? temp?.celsiusMax : temp?.farenheitMax}</span>
              {isCelsius ? "°C" : "°F"}
            </h4>
          </div>
        </div>
        <button className="refresh__btn" onClick={refresh}>
          <i className="fa-solid fa-arrow-rotate-right"></i>
        </button>
      </article>
      <article className="info">
        <div className="toggle__switch">
          <h4 className="toggle">&#176;C</h4>
          <input type="checkbox" id="switch" onClick={toggleTemp} />
          <label htmlFor="switch">Toggle</label>
          <h4 className="toggle">&#176;F</h4>
        </div>
        <h3 className="info__title">{weather?.weather[0].main}</h3>
        <h4 className="info__subtitle">{weather?.weather[0].description}</h4>
      </article>
    </section>
  );
};

export default CardWeather;
