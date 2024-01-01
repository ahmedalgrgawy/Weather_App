import './App.css';
import { useState } from 'react';

// Images + Icons
import search from './Components/Images/search.png'
import clear from './Components/Images/clear.png'
import cloud from './Components/Images/cloud.png'
import drizzle from './Components/Images/drizzle.png'
import humidityImg from './Components/Images/humidity.png'
import rain from './Components/Images/rain.png'
import snow from './Components/Images/snow.png'
import windImg from './Components/Images/wind.png'

function App() {
  const [icon, setIcon] = useState(clear);

  let key = '96e9b4299a62d031ffa5bc8d5a6288b2';

  async function searchFun() {

    // City Name
    const cityName = document.querySelector('.city').value;

    if (cityName === "") {
      return 0;
    }

    //
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=Metric&appid=${key}`;

    let res = await fetch(apiUrl);

    let data = await res.json();

    const humidity = document.querySelector(".percentage");
    humidity.innerHTML = data.main.humidity + '%';


    const wind = document.querySelector('.speed');
    wind.innerHTML = Math.floor(data.wind.speed) + ' km/h';


    const temp = document.querySelector('.temp');
    temp.innerHTML = Math.floor(data.main.temp) + "°C";


    const location = document.querySelector('.location');
    location.innerHTML = data.name;

    // Handling The Icon of The Weather

    if (data.weather.icon === '01d' || data.weather.icon === '01n') {
      setIcon(clear);
    } else if (data.weather.icon === '02d' || data.weather.icon === '02n') {
      setIcon(cloud);
    } else if (data.weather.icon === '3d' || data.weather.icon === '03n') {
      setIcon(drizzle);
    } else if (data.weather.icon === '4d' || data.weather.icon === '04n') {
      setIcon(drizzle);
    } else if (data.weather.icon === '09d' || data.weather.icon === '09n') {
      setIcon(rain);
    } else if (data.weather.icon === '10d' || data.weather.icon === '10n') {
      setIcon(rain);
    } else if (data.weather.icon === '13d' || data.weather.icon === '13n') {
      setIcon(snow);
    } else {
      setIcon(clear)
    }

  }



  return (
    <div className='container'>
      <div className='top-bar'>
        <input placeholder='Search' className='city' type='text' />
        <div className='search-icon' onClick={() => searchFun()}>
          <img src={search} alt=''></img>
        </div>
      </div>
      <div className='img'>
        <img src={icon} alt=''></img>
      </div>
      <div className='temp'>20°C</div>
      <div className='location'>Cairo</div>
      <div className='data-container'>
        <div className='elements'>
          <img src={humidityImg} alt='' className='icon'></img>
          <div className='data'>
            <div className='percentage'>52%</div>
            <div className='text'>Humidity</div>
          </div>
        </div>
        <div className='elements'>
          <img src={windImg} alt='' className='icon'></img>
          <div className='data'>
            <div className='speed'>3 km/h</div>
            <div className='text'>Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
