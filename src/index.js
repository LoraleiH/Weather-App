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
    console.log(response);
let cityElement = document.querySelector("#city");
cityElement.innerHTML = response.data.name;
let descriptionElement = document.querySelector("#description");
descriptionElement.innerHTML = response.data.weather[0].description;
let humidityElement = document.querySelector("#humidity");
humidityElement.innerHTML = response.data.main.humidity;
let windspeedElement = document.querySelector("#windspeed");
windspeedElement.innerHTML = Math.round(response.data.wind.speed);
let mainTempElement = document.querySelector("#main-temp");
mainTempElement.innerHTML = Math.round(response.data.main.temp);
let bigImageElement = document.querySelector("#big-image");
let icon = response.data.weather[0].icon;
bigImageElement.setAttribute("src", `http://openweathermap.org/img/wn/${icon}@2x.png`);


formatDate(response.data.dt * 1000);

}


let apiKey="b2d81bf38bb41052988aedac8aa89c4f";
let city="San Fransisco";
let apiUrl =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(formatWeather);