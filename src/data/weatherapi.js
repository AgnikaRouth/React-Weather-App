import axios from 'axios';

const baseUrl = 'https://api.openweathermap.org/data/2.5/';
const apiKey = '31e5cbca3c104c4f385923d1da661d57';

export const getWeatherData = async (cityname) => {
    try{
        const {data} = await axios.get(`${baseUrl}weather?q=${cityname}&units=metric&APPID=${apiKey}`);
        return data;
    }catch(error) {
        throw error;
    }
}

export const getWeatherForecast = async (cityname) => {
    try{
        const {forecastData} = await axios.get(`${baseUrl}forecast/daily?q=${cityname}&units=metric&cnt=7&APPID=${apiKey}`);
        return forecastData;
    } catch(error){
        throw error;
    }
}



export function getWeatherDataForecast () {
    navigator.geolocation.getCurrentPosition((success) => {
        
        let {latitude, longitude } = success.coords;

        fetch(`${baseUrl}onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&APPID=${apiKey}`)
        .then(res => res.json())
        .then(data => {

        console.log(data)
        
        })

    })
    
}