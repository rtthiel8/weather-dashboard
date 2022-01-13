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
      getForecast(city);
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
    console.log(data.coord.lat);
    console.log(data.coord.lon);
//    console.log(searchTerm);
    // clear old content
    weatherContainerEl.textContent = "";
    citySearchTerm.textContent = "Current Weather for: " + searchTerm + (" (") + dateToday + (")");

//    var cityName = data.name;

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

  };

  var getForecast = function(city) {
    // format the api url
    var forecastApiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + city.coord.lat + "&lon=" + city.coord.lon + "&appid=1a9e1beac3e10cf54f1426a2f0ed425b&units=imperial";

    // make a request to the url
    fetch(forecastApiUrl).then(function(response) {
      response.json().then(function(data) {
//        console.log(data);
        displayForecast(data, city);
      });
    });
  };

  var displayForecast = function(data) {
    console.log(data);
    // clear old content
    forecastContainerEl.textContent = "";

    // loop over data
    for (var i = 0; i < data.list.length; i++) {
    // format data
    var {dt_txt, main, wind, weather} = data.list[i];
  //  console.log(data.list[i].main.temp);

    let output = `
      <div class="card text-white bg-dark m-3" style="width: 14rem;"> 
        <div class="card-body"
          <p class ="card-text">${dt_txt}</p>
          <p>${weather.icon}</p>
          <p class="card-text">Temp: ${main.temp} °F</p>
          <p class="card-text">Wind: ${wind.speed} MPH</p>
          <p class="card-text">Humidity: ${main.humidity} %</p>
        </div>
      </div>
    `
    document.getElementById("forecast-container").innerHTML += output;
}
};