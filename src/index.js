function formatDate(timestamp) {
  let date = new Date(timestamp);
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
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${day} ${hours}:${minutes}`;
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
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<i class="fa-solid fa-house-chimney"></i>Currently in <strong>${cityLocation}</strong>`;
  let apiKey = `827f9a01625aeb3o0572et3c741df379`;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${cityLocation}&key=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let temperature = Math.round(response.data.temperature.current);
  let temperatureElement = document.querySelector("#dummy-temp");
  let description = document.querySelector("#description");
  let iconElement = document.querySelector("#icon");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#wind");
  let speed = Math.round(response.data.wind.speed);
  temperatureElement.innerHTML = `<strong>°${temperature}</strong>`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<i class="fa-solid fa-house-chimney"></i>Currently in <strong>${response.data.city}</strong>`;
  description.innerHTML = `${response.data.condition.description}`;
  humidity.innerHTML = `${response.data.temperature.humidity}`;
  wind.innerHTML = `${speed} Km/H`;
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
}

function locationNow(position) {
  let lat = position.coordinates.latitude;
  let long = position.coordinates.longitude;
  let apiKey = "827f9a01625aeb3o0572et3c741df379";
  let url = `https://api.shecodes.io/weather/v1/current?lon=${long}&lat=${lat}&key=${apiKey}`;
  axios.get(url).then(showTemp);
}
