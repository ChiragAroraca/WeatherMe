var search = document.querySelector(".search-box .search-button2");
var weatherBox = document.querySelector(".weather-box");
var weatherDetails = document.querySelector(".weather-details");
var error404 = document.querySelector(".not-found");
var container = document.querySelector(".weather-template");

search.addEventListener("click", () => {
  const city = document.querySelector(".search-box input").value;

  if (city == "") {
    return;
  }

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=aa669c5d800bdbf5c887f7742a850422`
  )
    .then((response) => response.json())
    .then((json) => {
      if (json.cod == "404") {
        container.style.height = "555px";
        weatherBox.classList.remove("active");
        weatherDetails.classList.remove("active");
        error404.classList.add("active");
        return;
      }

      weatherBox.classList.add("active");
      weatherDetails.classList.add("active");
      error404.classList.remove("active");

      var image = document.querySelector(".condition");
      var temperature = document.querySelector(".temp");
      var description = document.querySelector(".weather-des");
      var humidity = document.querySelector(".humidity");
      var wind = document.querySelector(".wind");

      switch (json.weather[0].main) {
        case "Clear":
          image.src = "images/clear.png";
          break;

        case "Rain":
          image.src = "images/rain.png";
          break;

        case "Snow":
          image.src = "images/snow.png";
          break;

        case "Clouds":
          image.src = "images/cloud.png";
          break;

        case "Mist":
          image.src = "images/mist.png";
          break;

        case "Haze":
          image.src = "images/mist.png";
          break;

        default:
          image.src = "images/cloud.png";
      }

      temperature.innerText = `${parseInt(json.main.temp)}°C`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerText = `${json.main.humidity} %`;
      wind.innerText = `${parseInt(json.wind.speed)}Km/h`;
    });
});
