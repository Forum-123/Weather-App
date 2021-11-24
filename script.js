const search = document.querySelector('.searchCity');
const cityInput = document.querySelector('.searchCity input');
const cityName = document.querySelector('.city-name');
const cityDescription = document.querySelector('.city-description');
const topContent = document.querySelector('.card-body');
const time = document.querySelector('.top img');
const cardImage = document.querySelector('.card-image')

const Celcius = (kelvinTemp) => {
    celcius = Math.round(kelvinTemp - 273.15);
    return celcius;
};

const Visibility = (m) => {
    km = m / 1000;
    return km;
};

const dayTime = (icon) => {
    if (icon.includes('d')) { 
        return true; 
    } else {
        return false;
    }
};

// Show result from API request to site
updateWeather = (city) => {
    const weatherIconCode = city.weather[0].icon;
    const weatherIconSrc = `https://openweathermap.org/img/wn/${weatherIconCode}.png`
    cityName.textContent = city.name;
    cityDescription.textContent = `Country: ${city.sys.country}`
    topContent.textContent = `
        <div class="middle row" style="padding-bottom: 0.5em;">
            <div class="col text-center temperature">
                <p>${Celcius(city.main.temp)}&deg;C</p>
            </div>
            <div class="col weather-icon card shadow mx-auto">
                <img src="${weatherIconSrc}" alt=""/>
            </div>
            <div class="col weather">
                <p class="data-condition">${city.weather[0].description}</p>
                <p class="data">H: ${Celcius(city.main.temp_max)}&deg;C</p>
                <p class="data">L: ${Celcius(city.main.temp_min)}&deg;C</p>
            </div>
        </div>
        <div class="bottom px-3 py-3 row">
            <div class="col text-center">
                <p class="data-title">FEELS LIKE</p>
                <p class="data">${Celcius(city.main.feels_like)}&deg;C</p>
            </div>
            <div class="col text-center">
                <p class="data-title">HUMIDITY</p>
                <p class="data">${city.main.humidity}%</p>
            </div>
            <div class="col text-center">
                <p class="data-title">PRESSURE</p>
                <p class="data">${city.main.pressure}hPa</p>
            </div>
            <div class="col text-center">
                <p class="data-title">VISIBILITY</p>
                <p class="data">${Visibility(city.visibility)}km</p>
            </div>
            <div class="col text-center">
                <p class="data-title">WIND SPEED</p>
                <p class="data">${city.wind.speed}mph</p>
            </div>
        </div>`;

    // Change text colour depending on weather image
    if (dayTime(weatherIconCode)) {
        time.setAttribute('src', "images/day.jpg");
        if (cityName.classList.contains('text-white')){
            cityName.classList.remove('text-white');
        } else {
            cityName.classList.add('text-black');
        }
        
        if (cityDescription.classList.contains('text-white')){
            cityDescription.classList.remove('text-white');
        } else {
            cityDescription.classList.add('text-black');
        }
    } else {
        time.setAttribute('src', "images/night.jpg");
        if (cityName.classList.contains('text-black')){
            cityName.classList.remove('text-black');
        } else {
            cityName.classList.add('text-white');
        }
       
        if (cityDescription.classList.contains('text-black')){
            cityDescription.classList.remove('text-black');
        } else {
            cityDescription.classList.add('text-white');
        }
    }
    cardImage.classList.remove('d-none');
}

search.addEventListener('submit', (city) => {
    city.preventDefault();
    const cityEntered = cityInput.value.trim();
    search.reset();

    requestCity(cityEntered)
        .then((data)=>{updateWeather(data);})
        .catch((error)=>{console.log(error)})
});
