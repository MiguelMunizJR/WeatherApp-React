import { useEffect, useState } from "react";
import axios from "axios";
import bgnWeather from "./assets/modules/bgnWeather";
import CardWeather from "./components/CardWeather";
import BarWeather from "./components/BarWeather";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

function App() {
  const [coord, setCoord] = useState();
  const [weather, setWeather] = useState();
  const [isCelsius, setIsCelsius] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState();
  const [timeBgn, setTimeBgn] = useState();

  useEffect(() => {
    // Obtener cordenadas
    const success = (pos) => {
      const latlong = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoord(latlong);
    };

    navigator.geolocation.getCurrentPosition(success);

    // Llamar API
    if (coord?.lon) {
      const APIKey = "94b6ecc8f1e9c5b9aa77a83082dc0abf";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coord?.lat}&lon=${coord?.lon}&appid=${APIKey}`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          setIsCelsius(true);
          loadingTimeout();
        })
        .catch((err) => console.log(err.data));
    }
    // Obtener la fecha y hora actual
    setDate(new Date());
    // Funcion que cambia el background
    bgn__weather(weatherID, bgnWeather);
  }, [coord?.lon, isLoading, timeBgn]);

  // Loading Function
  let intervalLoading;

  // Funcion de loading con timeout
  const loadingTimeout = () => {
    intervalLoading = window.setTimeout(changeLoading, 1000);
  };

  // Termina loading
  const changeLoading = () => {
    setIsLoading(false);
    intervalLoading = window.clearTimeout();
  };

  // Cambiar el background dependiendo de la hora y estado del clima del dia
  const time = date?.getHours();
  const weatherID = weather?.weather[0].id;

  // Change background
  const bgn__weather = (id, bgn) => {
    // Clear
    if (id === 800) {
      // Day/Night
      if (time >= 8 && time < 20) {
        setTimeBgn(bgn?.[0]);
      } else {
        setTimeBgn(bgn?.[1]);
      }
    }
    // Clouds
    if (id >= 801 && id <= 804) {
      // Day/Night
      if (time >= 8 && time < 20) {
        setTimeBgn(bgn?.[2]);
      } else {
        setTimeBgn(bgn?.[3]);
      }
    }
    // Rain
    if (id >= 500 && id <= 531) {
      // Day/Night
      if (time >= 8 && time < 20) {
        setTimeBgn(bgn?.[4]);
      } else {
        setTimeBgn(bgn?.[5]);
      }
    }
    // Thunderstorm
    if (id >= 200 && id <= 232) {
      // Day/Night
      if (time >= 8 && time < 20) {
        setTimeBgn(bgn?.[6]);
      } else {
        setTimeBgn(bgn?.[7]);
      }
    }
  };

  console.log(weather?.main);

  //Convertir Kelvins a Celsius y Farenheit
  const tempCelsius = weather?.main.temp - 273.15;
  const tempFeelsCelsius = weather?.main.feels_like - 273.15;
  const tempFarenheit = ((weather?.main.temp - 273.15) * 9) / 5 + 32;
  const tempFeelsFarenheit = ((weather?.main.feels_like - 273.15) * 9) / 5 + 32;

  const temp = {
    celsius: Math.floor(tempCelsius),
    celsiusFeels: tempFeelsCelsius.toFixed(1),
    celsiusMax: Math.ceil(tempCelsius),
    celsiusMin: Math.floor(tempCelsius),
    farenheit: Math.floor(tempFarenheit),
    farenheitFeels: tempFeelsFarenheit.toFixed(1),
    farenheitMax: Math.ceil(tempFarenheit),
    farenheitMin: Math.floor(tempFarenheit),
  };

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return (
      <div className="App" style={timeBgn}>
        <CardWeather
          weather={weather}
          temp={temp}
          date={date}
          isCelsius={isCelsius}
          setIsCelsius={setIsCelsius}
        />
        <BarWeather weather={weather} temp={temp} isCelsius={isCelsius} />
      </div>
    );
  }
}
export default App;
