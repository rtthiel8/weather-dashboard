var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city")
var forecastContainerEl = document.querySelector("#forecast-container");
var dateToday = moment().format('l');

var formSubmitHandler = function(event) {
    event.preventDefault();
    
// get value from input element
var city = cityInputEl.value.trim();

    if (city) {
      getCityWeather(city);

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
      });
    });
  };

userFormEl.addEventListener("submit", formSubmitHandler);

var displayWeather = function(data, searchTerm) {
  const lat = data.coord.lat;
  const lon = data.coord.lon;
    // clear old content
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = "Current Weather for: " + searchTerm + (" (") + dateToday + (")");

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
  
    var weatherIcon = data.weather.icon;
    var weatherIconEl = document.createElement("div");
    weatherIconEl.textContent = "Weather Icon: " + weatherIcon;
    weatherEl.appendChild(weatherIconEl);
//    console.log(weatherIcon);

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
     for (var i = 0; i < data.daily.length; i++) {
//     // format data
     var {dt, weather, temp, wind_speed, humidity} = data.daily[i];
     console.log(data.daily);

    let output = `
      <div class="card text-white bg-dark m-3" style="width: 14rem;"> 
        <div class="card-body"
          <p class="card-text">${dt}</p>
          <p class="card-text">${weather.icon}</p>
          <p class="card-text">Temp: ${temp.day} °F</p>
          <p class="card-text">Wind: ${wind_speed} MPH</p>
          <p class="card-text">Humidity: ${humidity} %</p>
        </div>
      </div>
    `
    document.getElementById("forecast-container").innerHTML += output;
  }
  };