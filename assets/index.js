let todaysWeather = document.getElementById('todaysWeather');

let queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=3a26ce967f024afe0e2f03c5159310b9"


fetch(queryURL)
        .then((response) => response.json())
        .then((cityList) => {
          let city = cityList[0]
          console.log(city.lat);
          console.log(city.lon);
    return fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&speed=miles/hour&temp=celcius&appid=3a26ce967f024afe0e2f03c5159310b9`)
})

.then(response => response.json())
.then(weather => {
    console.log(weather);

 
})

// let queryURL2 = (`https://api.openweathermap.org/data/2.5/forecast?lat=51.5073219
// &lon=-0.1276474
// &units=metric&speed=miles/hour&temp=celcius&appid=3a26ce967f024afe0e2f03c5159310b9`)

// fetch(queryURL2)
// .then(response => response.json())
// .then(forecast => {
//     console.log(forecast)
// })


//use moment JS to display the time?

   // let newDiv = document.createElement('div');
    // newDiv.innerHTML = 
    // `<h5>${weather.name}</h5>
    // <img src="http://openweathermap.org/img/w/10d.png
    // "${weather.weather(0).icon}">
    // <p>Wind: ${weather.wind.speed}MPH</p>
    // <p>Temp: ${weather.main.temp}</p>
    // <p>Humidity:${weather.main.humidity}%</p>`

    // todaysWeather.append(newDiv);
