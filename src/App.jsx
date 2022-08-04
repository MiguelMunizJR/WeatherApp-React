import { useEffect, useState } from "react";
import axios from "axios";
import CardWeather from "./components/CardWeather";
import BarWeather from "./components/BarWeather";
import LoadingScreen from "./components/LoadingScreen";
import "./App.css";

const bgnApp = [
  {
    backgroundImage:
      "linear-gradient(to left top, #353c46, #293343, #1e2940, #15203c, #0d1637)",
    transition: ".3s",
  },
  {
    backgroundImage:
      "linear-gradient(to right bottom, #246ac4, #028ad1, #39a7d6, #6fc1da, #a3dae0)",
    transition: ".3s",
  },
];

function App() {
  const [coord, setCoord] = useState();
  const [weather, setWeather] = useState();
  const [isCelsius, setIsCelsius] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [date, setDate] = useState();
  const [timeBgn, setTimeBgn] = useState();

  useEffect(() => {
    const success = (pos) => {
      const latlong = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoord(latlong);
    };

    navigator.geolocation.getCurrentPosition(success);

    if (coord?.lon) {
      const APIKey = "94b6ecc8f1e9c5b9aa77a83082dc0abf";
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coord?.lat}&lon=${coord?.lon}&appid=${APIKey}`;

      axios
        .get(URL)
        .then((res) => {
          setWeather(res.data);
          setIsLoading(false);
        })
        .catch((err) => console.log(err.data));
    }
    setDate(new Date());
    const time = date?.getHours();

    if (time >= 8 && time <= 20) {
      setTimeBgn(bgnApp?.[1]);
    } else {
      setTimeBgn(bgnApp?.[0]);
    }
  }, [coord?.lat, timeBgn, isLoading]);

  //Convertir Kelvins a Celsius y Farenheit
  const temp = {
    celsius: Math.round(weather?.main.temp - 273.15),
    celsiusFeels: Math.floor(weather?.main.feels_like - 273.15),
    celsiusMax: Math.round(weather?.main.temp_max - 273.15),
    celsiusMin: Math.floor(weather?.main.temp_min - 273.15),
    farenheit: Math.round(((weather?.main.temp - 273.15) * 9) / 5 + 3),
    farenheitFeels: Math.floor(
      ((weather?.main.feels_like - 273.15) * 9) / 5 + 3
    ),
    farenheitMax: Math.round(((weather?.main.temp_max - 273.15) * 9) / 5 + 3),
    farenheitMin: Math.floor(((weather?.main.temp_min - 273.15) * 9) / 5 + 3),
  };

  // console.log(coord);

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
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <BarWeather
          weather={weather}
          temp={temp} 
          isCelsius={isCelsius} 
        />
      </div>
    );
  }
}

export default App;
