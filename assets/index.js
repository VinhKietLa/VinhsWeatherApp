let todaysWeather = document.getElementById("todaysWeather");
let searchInput = document.getElementById('search-input');
let searcBtn = document.getElementById("search-button");

searcBtn.addEventListener("click", function (event) {
event.preventDefault();
let city = searchInput.value;

  let queryURL =
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=3a26ce967f024afe0e2f03c5159310b9`;

  fetch(queryURL)
    .then((response) => response.json())
    .then((cityList) => {
      let city = cityList[0];
      //   console.log(city.lat);
      //   console.log(city.lon);
      return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&speed=miles/hour&temp=celcius&appid=3a26ce967f024afe0e2f03c5159310b9`
      );
    })
    .then((response) => response.json())
    .then((weather) => {
      let result = weather.list;
      let requiredIndexes = [2, 10, 18, 26, 34, 39];
      let filteredResult = requiredIndexes.map((index) => result[index]);

      // console.log(filteredResult); this returns the 6 arrays I need to loop through and display the weather stats

      console.log(weather)
    // ;this returns the results

      let test = moment(1674874800, "X").format("DD/MM/YYYY HH:mm:ss"); // this converts the DT unix timestamp

      let cardDate = document.querySelectorAll("#card-date");
      let weatherIcon = document.querySelectorAll(".weatherIcon");
      let cardTemp = document.querySelectorAll("#card-temp");
      let cardWind = document.querySelectorAll("#card-wind");
      let cardHumid = document.querySelectorAll("#card-humid");

      for (let i = 0; i < filteredResult.length; i++) {
        const weather = filteredResult[i];
        // console.log(weather);
        let icons = weather.weather[0].icon;
        // console.log(icons);
        cardDate[i].textContent = moment(weather.dt, "X").format("DD/MM/YYYY");
        weatherIcon[i].setAttribute(
          "src",
          "http://openweathermap.org/img/w/" + icons + ".png"
        );
        cardTemp[i].textContent = "Temp " + weather.main.temp + " °C";
        cardWind[i].textContent = "Wind " + weather.wind.speed + " MPH";
        cardHumid[i].textContent = "Humidity " + weather.main.humidity + " %";
      }
    });
});

// console.log(filteredResult); this returns the 6 arrays I need to loop through and display the weather stats

// console.log(weather);this returns the results

//weather.weather[0].icon
//weather.main.temp
//weather.wind.speed
//weather.main.humidity

//PSEUDO CODE//

// I've created the required function to show both the weather on the current day as well as the five days for a predetermined city.

//I need to show these required values from the current day as well as the next 5 days.

//after this is done I need to workout how to take the city input from the user and apply this to the functions I already have.

//Once that is done, I need to store the results in local storage and show these in the recent searches.

//When the user clicks on one of the results in the search history it should update and show the weather stats for that city.

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
