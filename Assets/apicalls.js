var getCoord = function (city) {
    var coordUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=771a23d6d05fd5b1ef86916f19186400";
  
    fetch(coordUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            lat = data.city.coord.lat;
            lon = data.city.coord.lon;
            getWeather(city, lat, lon);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Open Weather API');
      });
  };

  var getWeather = function(city, lat, lon) {
      var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&units=imperial&appid=771a23d6d05fd5b1ef86916f19186400";
      
      fetch(oneCallUrl)
      .then(function (response) {
        if (response.ok) {
          response.json().then(function (data) {
            parseData(city, data);
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Open Weather API');
      });
  }