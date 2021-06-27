// Accessing the Weather API
const key = '762aa9c00ad9320d5e74709fb42178de';

const currentWeather = 'http://api.openweathermap.org/data/2.5/weather?q=London&appid=762aa9c00ad9320d5e74709fb42178de';

fetch(currentWeather)
    .then((weatherData) => { console.log('response', weatherData.json()) })
    .catch((error)=>{console.log(error)});

const requestCity = async (city) => {
    const currentWeather = 'http://api.openweathermap.org/data/2.5/weather'
    const query = '?q=' + city + '&appid=' + key;

    const response = await fetch(currentWeather + query);

    const data = await response.json();
    return data;
}
