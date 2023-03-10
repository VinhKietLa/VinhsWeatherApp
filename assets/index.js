//Global variables//
let todaysWeather = document.getElementById("todaysWeather"); //todays weather section
let searchInput = document.getElementById("search-input"); //city search input
let searchBtn = document.getElementById("search-button"); //search btn
let searchHistory = document.getElementById("history"); //Your history section
let clearHistory = document.getElementById("clear"); //clear history button
let cardDateToday = document.getElementById("card-date-today"); //variable for the search city in the today section

//This is the core function of the application//.
function query(event) {
  event.preventDefault(); //prevents the page from submitting when the user clicks the search button//
  let city;

  if (event.target.id === "search-button" && searchInput.value == "") {
    return alert("You must enter a city name!");//This will alert the user that they need to enter a city name and the return stops the function from executing any further.
  } else if (event.target.id === "historyBtn") {
    //if the user selects an item from the 'your history' then the queried 'city' will equal the event.target name specified in the searchHistory function.
    city = existingCity;
  } else {
    city = searchInput.value;//this is a normal type city name and hit search button condition.
  }

  let savedLocation = localStorage.getItem("Location"); //This will check the local storage for a key called "Location"

  console.log(savedLocation);

  let newLocationHistory = { name: city };//This object is used for setting a new key/value pair in local storage, name/city.

  if (savedLocation) {//If 'Location' exists in localStorage then 
    savedLocation = JSON.parse(savedLocation);//the localStorage is parsed from a string to a javascript object.
    savedLocation.push(newLocationHistory);//the current city object is pushed onto the savedLocations array.

  } else {//If savedLocation was null or undefined, then savedLocation is assigned an array containing the newLocationHistory object.
    savedLocation = [newLocationHistory];
  }

  localStorage.setItem("Location", JSON.stringify(savedLocation));//he savedLocation array is stringified using JSON.stringify() and stored in the local storage using the setItem() method and the key "Location".

  let queryURL = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=3a26ce967f024afe0e2f03c5159310b9`;//The API endpoint uses a city variable which is based on the conditions above.

  fetch(queryURL)
    .then((response) => response.json())
    .then((cityList) => {
      let city = cityList[0];
      cardDateToday.textContent = city.name;//From the response, the cityname is taken using dot notation and set onto the web page.
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&speed=miles/hour&temp=celcius&appid=3a26ce967f024afe0e2f03c5159310b9`
      )//using the lat and long from the previous fetch, a new fetch is created to display todays date weather.
        .then((response) => response.json())
        .then((weather) => {
          let weatherIconToday = document.querySelector(".weatherIcon-today");
          let cardTempToday = document.getElementById("card-temp-today");
          let cardWindToday = document.getElementById("card-wind-today");
          let cardHumidToday = document.getElementById("card-humid-today");

          let icons = weather.weather[0].icon;
          cardDateToday.textContent +=
            " (" + moment(weather.dt, "X").format("DD/MM/YYYY") + ")";
          weatherIconToday.setAttribute(
            "src",
            "http://openweathermap.org/img/w/" + icons + ".png"
          );
          cardTempToday.textContent = "Temp " + weather.main.temp + " ??C";
          cardWindToday.textContent = "Wind " + weather.wind.speed + " MPH";
          cardHumidToday.textContent =
            "Humidity " + weather.main.humidity + " %";
        });

      return fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&units=metric&speed=miles/hour&temp=celcius&appid=3a26ce967f024afe0e2f03c5159310b9`
      );// the fetch is returned with the same lat and long details for a different API endpoint to display the weather for the next 5 days.
    })
    .then((response) => response.json())
    .then((weather) => {
      let result = weather.list;
      let requiredIndexes = [7, 15, 23, 31, 39];
      let filteredResult = requiredIndexes.map((index) => result[index]);
      let cardDate = document.querySelectorAll("#card-date");
      let weatherIcon = document.querySelectorAll(".weatherIcon");
      let cardTemp = document.querySelectorAll("#card-temp");
      let cardWind = document.querySelectorAll("#card-wind");
      let cardHumid = document.querySelectorAll("#card-humid");

      for (let i = 0; i < filteredResult.length; i++) {
        const weather = filteredResult[i];
        let icons = weather.weather[0].icon;
        cardDate[i].textContent = moment(weather.dt, "X").format("DD/MM/YYYY");
        weatherIcon[i].setAttribute(
          "src",
          "http://openweathermap.org/img/w/" + icons + ".png"
        );
        cardTemp[i].textContent = "Temp " + weather.main.temp + " ??C";
        cardWind[i].textContent = "Wind " + weather.wind.speed + " MPH";
        cardHumid[i].textContent = "Humidity " + weather.main.humidity + " %";
      }
    });
  displayHistory();//at the end of the function this is called to display any local storage items.
}

function displayHistory() {
  // this retrieves items within the local storage and displays them as buttons.
  searchHistory.innerHTML = "";
  let storedLocation = localStorage.getItem("Location");
  let retrievedParsedLocation = JSON.parse(storedLocation);

  if (retrievedParsedLocation != null) {
    for (let i = 0; i < retrievedParsedLocation.length; i++) {
      let message = retrievedParsedLocation[i].name;

      let button = document.createElement("button");

      button.textContent = message;
      button.id = "historyBtn";
      searchHistory.prepend(button);
    }
  }
}
displayHistory();// this is called when the page loads to show any local storage items as buttons. 

let existingCity;//This variable will store the HTML of the selected event.target in the 'Your history section'

searchHistory.addEventListener("click", function (event) {
  //runs when you click a button in the history
  event.preventDefault();
  if (event.target.matches("button")) {
    searchInput.value = "";
    let element = event.target;
    let eventHTML = element.innerHTML;
    existingCity = eventHTML;
    query(event);
  }
});

searchBtn.addEventListener("click", query); //When the user enters a city name and clicks search it runs the query function.

clearHistory.addEventListener("click", function () {
  // This clears the local history in turn removing all the buttons fr the 'Your history' section.
  localStorage.clear();
});

//issues//

//displayhistory is giving an error because there isn't anything in the history when you first load the page.

// console.log(filteredResult); this returns the 6 arrays I need to loop through and display the weather stats

// console.log(weather);this returns the results

//weather.weather[0].icon
//weather.main.temp
//weather.wind.speed
//weather.main.humidity

//PSEUDO CODE//

//localstorage is now complete

//I need to get the storage names and display these in the history section//
//Add an event listener to the history section and if user clicks on the history name, add a condition to use the second value pair in the fetch query endpoint.

//what do I need to store and retrieve from local storage for it to work when the user clicks on the city search history for the function to work?
// city name so that the query runs for that city plus the user input?
// get these items in the storage and use it in the function if the user clicks on a search area?

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
