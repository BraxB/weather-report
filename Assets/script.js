var inputEl = document.querySelector("#searchInput");
var searchEl = document.querySelector("#citySearch");
var currentWeather = document.querySelector("#cityInfo");
var forecastEl = document.querySelector("#forecast");
var historyEl = document.querySelector("#history");

// this function handles button clicks to submit the search input
var formSubmitHandler = function (event) {
  event.preventDefault();
  var city = inputEl.value.trim();
  forecastEl.innerHTML = "";
  if (city) {
    getCoord(city);
    inputEl.value = '';
  } else {
    alert('Please Enter a City');
  }
};

// function that passes info needed to get forecast for previously searched city when history button is clicked
var historyHandler = function (clickedId) {
  let city = clickedId;
  let coords = JSON.parse(localStorage.getItem(clickedId));
  let lat = coords[0];
  let lon = coords[1];
  forecastEl.innerHTML = "";
  getWeather(city, lat, lon);
}

// save searched city to local storage
var saveCity = function(city, data) {
  let lat = data.lat;
  let lon = data.lon;
  var coord = [lat, lon];
  localStorage.setItem(city, JSON.stringify(coord));
  showHistory();
}

// get history from local storage and add it to the GUI
var showHistory = function() {
  historyEl.innerHTML = "";
  for (i = 0; i < localStorage.length; i++) {
    let searchedCity = localStorage.key(i);
    historyEl.innerHTML += `
    <button class="btn-block btn-secondary" id="${searchedCity}" onClick="historyHandler(this.id)">${searchedCity}</button>
    `
  }
}

//save data needed to variables
var parseData = function (city, data) {
  currentTemp = data.current.temp;
  humidity = data.current.humidity;
  windspeed = data.current.wind_speed;
  uvi = data.current.uvi;
  saveCity(city, data);
  showWeather(city, currentTemp, humidity, windspeed, uvi);
  forecast(data);
}

//use variables from formatData to display
var showWeather = function (city, currentTemp, humidity, windspeed) {
  $(".cityContainer").show();
  currentWeather.innerHTML = `
    <div class="selectedCity">${city}</div>
    <div class="temp">Temperature: ${currentTemp}°F</div>
    <div class="humidity">Humidity: ${humidity}%</div>
    <div class="wind">Wind Speed: ${windspeed}MPH</div>
    <div class="uv">UV Index: <button class="btn" id="uv-btn">${uvi}</button></div>`
  
  // set logic to change UV button based on uv index
  var uvEl = document.querySelector("#uv-btn");
  if (uvi < 3) {
    uvEl.classList.add("btn-success");
  } else if (uvi > 3 || uvi < 6) {
    uvEl.classList.add("btn-warning");
  } else {
    uvEl.classList.add("btn-danger");
  }
}

//build out 5day forecast
var forecast = function (data) {
  var currentDay = moment();
  for (i = 1; i < 6; i++) {
    let day = currentDay.clone().add(i, "day").format("MM/DD/YYYY");
    let temp = data.daily[i].temp.day;
    let hum = data.daily[i].humidity;
    let icon = data.daily[i].weather[0].icon;
    forecastEl.innerHTML += `
      <div class="card col-xs-2" id="${i}">
      <h3 id="date">${day}</h3>
      <img id="icon" src=https://openweathermap.org/img/w/${icon}.png />
      <p id="temperature">Temp: ${temp}°F</p>
      <p id="humidity">Humidity: ${hum}%</p>
      </div>`
  }
}

searchEl.addEventListener("submit", formSubmitHandler);