var requestUrl = "https://api.openweathermap.org/data/2.5/forecast?q=Paris&units=metric&appid=4354bae4bc4f80de34b0ce15453d2200"

function getApi(requestUrl) {
    fetch(requestUrl)
      .then(function (response) {
        return response.json();
    })
    .then(function (data) {
      console.log(data);
    })
  }
  
  getApi(requestUrl);