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

    let result = weather.list;
    let requiredIndexes = [2,10,18,26,34,39];
    let filteredResult = requiredIndexes.map(index => result[index]);
    console.log(filteredResult);

    console.log(weather);

    let test = moment(1674874800, "X").format("DD/MM/YYYY HH:mm:ss");// this converts the DT unix timestamp
    
    for (let i = 0; i < filteredResult.length; i++) {
        const index = filteredResult[i];
        console.log(index)
    }
})

//for 6pm snapshot each day

//I need indexes 
// 6 for day 1, 14 for day 2, 22 for day 3, 30 for day 4, 38 for day 5

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
