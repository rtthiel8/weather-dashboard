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

getCityWeather("Portland");


//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}