import React from 'react' 
import "./styles/WeatherCard.css"
import styled, { keyframes } from "styled-components"

const animacion = keyframes`
0%{
    transform: translateY(0);
}
50%{
    transform: translateY(12px);
}
100%{
    transform: translateY(0);
}`;

const WeatherCard = ({weather, temps, isCelsius, changeUnitTemp}) => {
  return (
    
    <section className='weatherCard'>
        <h1 className='weatherCard__title'>Weather App</h1>
        <h2 className='weatherCard__place'>{weather?.name}, {weather?.sys.country}</h2>
       <div className='flex'>
            <div className='weatherCard__img'>
                <Animation><img src={`http://openweathermap.org/img/wn/${weather?.weather[0].icon}@4x.png`} alt="icon weather" /></Animation>
                <h3 className='weatherCard__temp'>{ isCelsius ? temps?.celsius + " °C" : temps?.fahrenheit + " °F"}</h3>
            </div> 
            <div>
                <ul className='weatherCard__list'>
                    <li className='weatherCard__description'>{weather?.weather[0].main}, {weather?.weather[0].description}</li>
                    <li><span>Wind Speed: </span> {weather?.wind.speed} m/sec</li>
                    <li><span>Clouds: </span> {weather?.clouds.all} %</li>
                    <li><span>Pressure: </span> {weather?.main.pressure} hPa</li>
                </ul>  
            </div>
        </div>
        <button className='weatherCard__btn' onClick={changeUnitTemp}> °C  / °F </button>
    </section>
        
  )
}

export default WeatherCard

export const Animation = styled.div`
animation: ${animacion} 3s linear infinite;`