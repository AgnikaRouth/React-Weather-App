import React, {useState, useEffect} from 'react';
import './App.css';
import {getWeatherData, getWeatherForecast, getWeatherDataForecast} from './data/weatherapi';


function App() {
  const day = new Date();
  const  today = day.toDateString();

  const [weatherdata, setWeatherData] = useState({});
  const [weatherNewData, setWeatherNewData] = useState({});
  const [city, setCity] = useState('Kolkata');
  //const [loading, setLoading] = useState(false);

  const getData = async () => {
    try{
        //setLoading(true);
        const data = await getWeatherData(city);
        setWeatherData(data);
        //setLoading(false);
    }catch(error) {
      console.log(error.message);
      //setLoading(false);
    }
  }

  const getNewData = async () =>{
    try{
      const newdata = await getWeatherForecast(city);
      setWeatherNewData(newdata);
    }catch(error){
      console.log(error.message);
    }
  }
  
  useEffect(() => {
    getData();
    getNewData();
  }, []); 

  

  return (
    <div className="App">
      <div className="card">
        <h2 className="title"><i className="fa fa-cloud"></i>Weather App</h2>
        <div className="search-form">
          <input 
          type="text"
          value={city} 
          onChange={(e) => setCity(e.target.value)} //bind the value equal to the City query
          placeholder="Enter your city name"
          onKeyPress={getData}
          />
          <button type="button" onClick={() => getWeatherDataForecast()}>Forecast</button>
        </div>
        
          {(typeof weatherdata.main != "undefined") ? ( //required for this check as axios is async, removes TypeError
          <div className="main-container">
            <h4>Live Weather Condition</h4>
            <div className="weather-icon">
              <img src={`https://openweathermap.org/img/wn/${weatherdata.weather[0].icon}@2x.png`} alt="imgicon"/>
              <p>{weatherdata.weather[0].description}</p>
            </div>
            
            <div className="temperature">
              <h1>{Math.round(weatherdata.main.temp)}&deg;C</h1>
            </div>
            <div className="location">
              <h3><i className="fa fa-street-view"></i>{weatherdata.name} | {weatherdata.sys.country}</h3>
              <div className="date">{today}</div>
            </div>
            <div className="temperature-range">
              <h6>Min: {Math.round(weatherdata.main.temp_min)}&deg;C
              || Max: {Math.round(weatherdata.main.temp_max)}&deg;C 
              || Humidity: {weatherdata.main.humidity}% 
              || Wind speed: {weatherdata.wind.speed} m/s
              </h6>
              <h6>
              Sunrise: {new Date(weatherdata.sys.sunrise * 1000).toLocaleTimeString('en-IN')}
               || Sunset: {new Date(weatherdata.sys.sunset * 1000).toLocaleTimeString('en-IN')} </h6>
              
            </div>
          </div>
          ) : ('')} 
        
          
              
      </div>
    </div>
  );
}
export default App;
