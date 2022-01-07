var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#city")

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
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=1a9e1beac3e10cf54f1426a2f0ed425b"; 

    // make a request to the url
    fetch(apiUrl).then(function(response) {
      response.json().then(function(data) {
            console.log(data);
      });
    });
  };

userFormEl.addEventListener("submit", formSubmitHandler);
