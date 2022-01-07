var weatherContainerEl = document.querySelector("#weather-container");
var citySearchTerm = document.querySelector("#city-search-term");
var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city")
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
    console.log(data);
    console.log(searchTerm);
    // clear old content
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = searchTerm + (" (") + dateToday + (")");

//    var cityName = data.name;

    // create a container for each repo
    var weatherEl = document.createElement("div");
    
    var currentTemp = data.main.temp;
    var currentTempEl = document.createElement("div");
    currentTempEl.textContent = "Temp: " + currentTemp + " F";
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

  };