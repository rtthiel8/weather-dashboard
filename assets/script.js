var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city")
var forecastContainerEl = document.querySelector("#forecast-container");
var dateToday = moment().format('l');
var citySearchHistory = [];
var cityHistoryEl = document.querySelector("#city-storage");


var formSubmitHandler = function(event) {
    event.preventDefault();
    
// get value from input element
var city = cityInputEl.value.trim();

    if (city) {
      getCityWeather(city);
      saveCityHistory(city);
      cityInputEl.value = "";
    } else {
      alert("Please enter a valid City");
    }

  };

var getCityWeather = function(city) {
    // format the api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1a9e1beac3e10cf54f1426a2f0ed425b&units=imperial"; 

    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
            displayWeather(data, city);
            console.log(data);
      });
    });
  };

var displayWeather = function(data, searchTerm) {
  const lat = data.coord.lat;
  const lon = data.coord.lon;
    // clear old content
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = "Current Weather for: " + searchTerm + (" (") + dateToday + (")") ;

    // create a container for each stat
    var weatherEl = document.createElement("div");
    
    var currentTemp = data.main.temp;
    var currentTempEl = document.createElement("div");
    currentTempEl.textContent = "Temp: " + currentTemp + " °F";
    weatherEl.appendChild(currentTempEl);

    var windSpeed = data.wind.speed;
    var windSpeedEl = document.createElement("div");
    windSpeedEl.textContent = "Wind: " + windSpeed + " MPH";
    weatherEl.appendChild(windSpeedEl);

    var humidity = data.main.humidity;
    var humidityEl = document.createElement("div");
    humidityEl.textContent = "Humidity: " + humidity + " %";
    weatherEl.appendChild(humidityEl);
  
    // append container to the dom
    weatherContainerEl.appendChild(weatherEl);
    getForecast(lat, lon);

  };
  
var getForecast = function(lat, lon) {
    // format the api url
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=1a9e1beac3e10cf54f1426a2f0ed425b&units=imperial";
    // make a request to the url
    fetch(forecastApiUrl).then(function(response) {
      response.json().then(function(data) {
//        console.log(data);
        displayForecast(data);
      });
    });
  };

var displayForecast = function(data) {
     console.log(data);
     // clear old content
     forecastContainerEl.textContent = "";

     // loop over data
     for (var i = 1; i < data.daily.length-2; i++) {
//     // format data
     var {dt, weather, temp, wind_speed, humidity} = data.daily[i];
     console.log(data.daily);

    let day = moment.unix(dt).utc().format("ll");

    let output = `
      <div class="card text-white bg-dark m-3" style="width: 12rem;"> 
        <div class="card-body"
          <p class="card-text">${day}</p>
          <img src="https://openweathermap.org/img/w/${weather[0].icon}.png">
          <p class="card-text">Temp: ${temp.day} °F</p>
          <p class="card-text">Wind: ${wind_speed} MPH</p>
          <p class="card-text">Humidity: ${humidity} %</p>
        </div>
      </div>
    `
    document.getElementById("forecast-container").innerHTML += output;
  }
    var uvIndex = data.current.uvi;
    var uvIndexEl = document.createElement("span");
    uvIndexEl.textContent =  + uvIndex;
    uvIndexEl.style.backgroundColor = uvIndex <= 2 ? 'green' : uvIndex <= 5 ? 'yellow' : uvIndex <= 7 ? 'orange' : 'red'
    uvIndexEl.style.padding = '2px';
    document.getElementById("weather-container").innerHTML += "UV Index: ";
    document.getElementById("weather-container").appendChild(uvIndexEl);

    var weatherIcon =  `<img src="https://openweathermap.org/img/w/${weather[0].icon}.png">`
    var weatherIconEl = document.createElement("div");
    weatherIconEl.innerHTML = weatherIcon;
    document.getElementById("city-search-term").innerHTML += weatherIcon;

  };

// save searches to new array
  var saveCityHistory = function(city) {
    if (!citySearchHistory.includes(city)) {
      citySearchHistory.push(city);
      console.log(citySearchHistory);
      cityButtonMaker(city);
    }
    saveCity(citySearchHistory);
  };

// save array to local storage
  var saveCity = function (cityHistory) {
    let history = localStorage.cityHistory;
    if(history == undefined) {
      history = JSON.stringify(cityHistory);
    };

  };

// make button for each new city search
  var cityButtonMaker = function (city) {
    var citySearchHistoryEl = document.createElement("button");
    citySearchHistoryEl.className = "btn btn-secondary";
    citySearchHistoryEl.innerText = city;
    cityHistoryEl.append(citySearchHistoryEl);
    citySearchHistoryEl.addEventListener("click", () => getCityWeather(city));
  };

// show past searches when reloading page
  var loadSearchHistory = function() {
    var loadCityHistory = localStorage.getItem("cityHistory");
    var parsedCityHistory = JSON.parse(loadCityHistory);
    console.log(parsedCityHistory);
    if (parsedCityHistory) {
      parsedCityHistory.forEach(cityButtonMaker);
    } 
  };

  userFormEl.addEventListener("submit", formSubmitHandler);
  window.onload = loadSearchHistory;