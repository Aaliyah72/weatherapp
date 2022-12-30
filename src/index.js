let now = new Date();
let h2 = document.querySelector("h2");
let min = now.getMinutes();
let hours = now.getHours();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

h2.innerHTML = `⌛${day} ${hours}:${min}`;

let form = document.querySelector("#weather-city");
form.addEventListener("submit", newCity);

function newCity(event) {
  event.preventDefault();
  let city = document.querySelector("#city-search");
  let cityLocation = `${city.value}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<i class="fa-solid fa-house-chimney"></i>Currently in <strong>${cityLocation}</strong>`;
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityLocation}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(showTemp);
}

function showTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#dummy-temp");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  temperatureElement.innerHTML = `<strong>°${temperature}</strong>`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `<i class="fa-solid fa-house-chimney"></i>Currently in <strong>${response.data.name}</strong>`;
  description.innerHTML = `${response.data.weather[0].description}`;
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  console.log(response.data);
}

function locationNow(position) {
  let lat = position.coords.latitude;
  let long = position.coords.longitude;
  let apiKey = "93d43dfe3b4a950e5b187e5dc313705e";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=${apiKey}`;
  axios.get(url).then(showTemp);
}
function weatherDescription(response) {
  l;
}
