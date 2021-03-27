var inputEl = document.querySelector("#searchInput");
var searchEl = document.querySelector("#citySearch");
var currentWeather = document.querySelector("#cityInfo");
var forecastEl = document.querySelector("#forecast");

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

//save data needed to variables
var formatData = function (city, data) {
  currentTemp = data.current.temp;
  humidity = data.current.humidity;
  windspeed = data.current.wind_speed;
  uvi = data.current.uvi;
  showWeather(city, currentTemp, humidity, windspeed, uvi);
  forecast(data);
}

//use variables from formatData to display
var showWeather = function (city, currentTemp, humidity, windspeed) {
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