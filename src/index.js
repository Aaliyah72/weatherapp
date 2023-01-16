function formatDate(timestamp) {
  let date = newDate(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

let form = document.querySelector("#weather-city");
form.addEventListener("submit", newCity);

function newCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  let cityLocation = `${city.value}`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `<i class="fa-solid fa-house-chimney"></i>Currently in <strong>${cityLocation}</strong>`;
  let apiKey = `827f9a01625aeb3o0572et3c741df379`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityLocation}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `827f9a01625aeb3o0572et3c741df379`;
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayForecast);
}
function displayForecast(response) {
  let weeklyWeather = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");
  let forecastHTML = "";
  weeklyWeather.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `
     <div class="col-sm-9">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title"><strong>${formatDay(
          forecastDay.time
        )}</strong></h5>
        <p class="card-text">${Math.round(forecastDay.temperature.day)}℉;

        <i class="fa-solid fa-cloud"></i></p>
        </div>
        </div>
       </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
  console.log(response.data.daily);
}

displayForecast();
function showTemp(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#dummy-temp");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let speed = Math.round(response.data.wind.speed);
  temperatureElement.innerHTML = `<strong>°${temperature}</strong>`;
  let h2 = document.querySelector("h2");
  let icon = document.querySelector("#icon-weather");
  h2.innerHTML = `<i class="fa-solid fa-house-chimney"></i>Currently in <strong>${response.data.city}</strong>`;
  description.innerHTML = `${response.data.condition.description}`;
  humidity.innerHTML = `${response.data.temperature.humidity}`;
  wind.innerHTML = `${speed} Km/H`;

  getForecast(response.data.coordinates);
}

function locationNow(position) {
  let lat = position.coordinates.latitude;
  let long = position.coordinates.longitude;
  let apiKey = "827f9a01625aeb3o0572et3c741df379";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}`;
  axios.get(url).then(showTemp);
}
