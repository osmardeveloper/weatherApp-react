import axios from "axios";
import { useEffect, useState } from "react";
import "./App.css";
import Loader from "./assets/components/Loader";
import WeatherCard from "./assets/components/WeatherCard";

//almacenar la apiKey para hacer la peticion a la api
const API_KEY = "d7caf1c20d5663eaf0ebcb619759a27e";

function App() {
  const [coords, setCoords] = useState();
  const [weather, setWeather] = useState();
  const [temps, setTemps] = useState();
  const [isCelsius, setIsCelsius] = useState(true);

  //para almacenar lalatitud y longitud en un objeto y enviarloalestado con setCoords
  const success = (e) => {
    const newCoords = {
      lat: e.coords.latitude,
      lon: e.coords.longitude,
    };
    setCoords(newCoords);
  };

  //funcion quecambia las temperaturas del onclick
  const changeUnitTemp = () => setIsCelsius(!isCelsius);

  //seva a ejecutar dos veces cuando incia la aplicacion y cuando coords estado cambia
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  // para que cuando coords
  useEffect(() => {
    //el if verifica que ya el estado coords tiene la informacion de coordenadas almacenadas
    if (coords) {
      const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}`;
      axios
        .get(URL)
        .then((res) => {
          setTimeout(() => {
            setWeather(res.data);
            const celsius = (res.data.main.temp - 273.15).toFixed(2);
            const fahrenheit = (celsius * (9 / 5) + 32).toFixed(2);
            const newTemps = { celsius, fahrenheit };
            setTemps(newTemps);
          }, 1000)
        })
        .catch((err) => console.log(err));
    }
  }, [coords]);

  return (
    <div className="App">
   {
    weather ? (
       <WeatherCard
        weather={weather}
        temps={temps}
        isCelsius={isCelsius}
        changeUnitTemp={changeUnitTemp}
      />
    ) : <Loader />
   }
    </div>
  );
}

export default App;
