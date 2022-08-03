import { useEffect, useState } from "react";
import CardWeather from "./components/CardWeather";
import "./App.css";

function App() {
  const [coord, setCoord] = useState();

  useEffect(() => {
    const success = (pos) => {
      const latlong = {
        lat: pos.coords.latitude,
        lon: pos.coords.longitude,
      };
      setCoord(latlong);
    };

    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // console.log(coord);

  return (
    <div className="App">
      <CardWeather lat={coord?.lat} lon={coord?.lon} />
    </div>
  );
}

export default App;
