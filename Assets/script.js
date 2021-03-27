// var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Paris&units=metric&appid=4354bae4bc4f80de34b0ce15453d2200"

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      return data;
    })
  }

$("#searchBtn").on("click", function() {
  var city = $("#searchInput").val();
  var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=4354bae4bc4f80de34b0ce15453d2200"
  var data = getApi(requestUrl);
  $(".selectedCity").html(city);
  debugger
  $(".temp").html("Temperature: " + data.list[0].temp);
})
