function formatDate(timestamp) {


    let now = new Date(timestamp);
    let mins = now.getMinutes();
    if (mins < 10) { 
       mins = `0${mins}`; 
    }
    let hours = now.getHours();
    if (hours < 10) {
        hours = `0${hours}`;
    }

    let time = `${hours}:${mins}`


    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

    let day = days[now.getDay()];

    let dayTime = document.querySelector("#day-time");
    dayTime.innerHTML = `${day} ${time}`;
}


function formatWeather(response) {
let cityElement = document.querySelector("#city");
let humidityElement = document.querySelector("#humidity");
let windspeedElement = document.querySelector("#windspeed");
let mainTempElement = document.querySelector("#main-temp");
let bigImageElement = document.querySelector("#big-image");
let descriptionElement = document.querySelector("#description");
let icon = response.data.weather[0].icon;

celsiusTemperature = response.data.main.temp;

cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
humidityElement.innerHTML = response.data.main.humidity;
windspeedElement.innerHTML = Math.round(response.data.wind.speed);
mainTempElement.innerHTML = Math.round(celsiusTemperature);

bigImageElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);


formatDate(response.data.dt * 1000);
getForecast(response.data.coord)

}

function search(city) {
let apiKey = "b2d81bf38bb41052988aedac8aa89c4f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(formatWeather);

}

function handleSubmit(event) {
    event.preventDefault();
    let inputValue = document.querySelector("#search-field");
    search(inputValue.value);
    inputValue.value = "";
}

function formatDay(timestamp) {
let date = new Date(timestamp * 1000);



let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

let day = days[date.getDay()];

return day;

}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#week-forecast");
    let forecastHTML = `<div class="row">`;
    forecast.forEach(function (forecastDay) {
        forecastHTML =
          forecastHTML +
          `<div class="col" id="forecast-col">
     <div class="forecast-day">${formatDay(forecastDay.dt)}</div>
   <img class="forecast-icon" src="http://openweathermap.org/img/wn/${
       forecastDay.weather[0].icon
     }@2x.png" />

        <div><span class="high">
       ${Math.round(
         forecastDay.temp.max
       )}°</span> <span class="low">${Math.round(
            forecastDay.temp.min
          )}°</span></div>

        </div>`;


        

    })

    forecastHTML = forecastHTML + `</div>`;

    forecastElement.innerHTML = forecastHTML;

    

}


function displayFar(event) {
    event.preventDefault();
    celConvert.classList.remove("active");
    farConvert.classList.add("active");
    let temperature = document.querySelector("#main-temp");
    let farTemp = Math.round((celsiusTemperature * 9) / 5 + 32);
    temperature.innerHTML = farTemp;
}

function displayCel(event) {
    event.preventDefault();
    farConvert.classList.remove("active");
    celConvert.classList.add("active");
    let temperature = document.querySelector("#main-temp");
    temperature.innerHTML = Math.round(celsiusTemperature);
}

function currentPosition(event) {
event.preventDefault();
navigator.geolocation.getCurrentPosition(currentLocation);

}

function currentLocation(position) {
let lat = position.coords.latitude;
let lon = position.coords.longitude;
let apiKey = "b2d81bf38bb41052988aedac8aa89c4f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(formatWeather);
}



function getForecast(coordinates) {
    console.log(coordinates);
    let apiKey = "b2d81bf38bb41052988aedac8aa89c4f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

}




let celsiusTemperature = null;

let citySearch = document.querySelector("#city-search");
citySearch.addEventListener("submit", handleSubmit);

let farConvert = document.querySelector("#far-convert");
farConvert.addEventListener("click", displayFar);

let celConvert = document.querySelector("#cel-convert");
celConvert.addEventListener("click", displayCel);

let currentLoc = document.querySelector("#submit-current-button")
currentLoc.addEventListener("click", currentPosition);



search("London");

displayForecast();



