var inputEl = document.querySelector("#searchInput");
var searchEl = document.querySelector("#citySearch");
var currentWeather = document.querySelector("#cityInfo");

// this function handles button clicks to submit the search input
var formSubmitHandler = function (event) {
  event.preventDefault();

  var city = inputEl.value.trim();

  if (city) {
    getCoord(city);

    inputEl.value = '';
  } else {
    alert('Please Enter a City');
  }
};

//save data I need to variables
var formatData = function (city, data) {
  currentTemp = data.current.temp;
  humidity = data.current.humidity;
  windspeed = data.current.wind_speed;
  showWeather(city, currentTemp, humidity, windspeed);
}

//use variables from formatData to display
var showWeather = function (city, currentTemp, humidity, windspeed) {
  currentWeather.innerHTML = `<div class="selectedCity">${city}</div>
    <div class="temp">Temperature: ${currentTemp}</div>
    <div class="humidity">Humidity: ${humidity}%</div>
    <div class="wind">Wind Speed: ${windspeed}MPH</div>
    <div class="uv"></div>`
}

//build out 5day forecast
var forecast = function (data) {
  for (i = 1; i < 5; i++) {
    
  }
}

searchEl.addEventListener("submit", formSubmitHandler);