let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=3a26ce967f024afe0e2f03c5159310b9"


fetch(queryURL)
        .then((response) => response.json())
        .then((cityList) => {
          let city = cityList[0]
          console.log(city.lat);
          console.log(city.lon);
    return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&speed=miles/hour&temp=celcius&appid=3a26ce967f024afe0e2f03c5159310b9`)
})

.then(response => response.json())
.then(weather => {
    console.log(weather.weather[0].icon);
    console.log(`Wind: ${weather.wind.speed}MPH`);
    console.log(`Temp: ${weather.main.temp}` );
    console.log(`Humidity:${weather.main.humidity}%`);

})

//use moment JS to display the time?

