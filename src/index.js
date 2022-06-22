function formatWeather(response) {
    console.log(response);

    
}


let apiKey="b2d81bf38bb41052988aedac8aa89c4f";
let city="London";
let apiUrl =
`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(formatWeather);