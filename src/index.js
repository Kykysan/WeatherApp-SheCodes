//Feature #1 Display time
function formatDate(now) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let currentDay = days[now.getDay()];
  let currentMonth = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${currentDay}, ${currentMonth} ${date}, ${hours}:${minutes}`;
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

//Feature #2 Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
function showCityValue(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let city = document.querySelector("h1");
  city.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", showCityValue);

//Week 5 C HW C1 On your project, when a user searches for a city (example: New York), it should display the name of the city on the result page and the current temperature of the city.
function searchCity(city) {
  let apiKey = "75d7bfe843745f5a8219306b602ef7d5";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "metric";
  let apiUrl = `${endPoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentConditions);
}

function showCurrentConditions(response) {
  console.log(response.data);
  let temperature = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#current-temperature");
  currentTemp.innerHTML = `${temperature}`;

  let description = response.data.weather[0].main;
  let currentDescription = document.querySelector("#description");
  currentDescription.innerHTML = description;

  let humidity = response.data.main.humidity;
  let currentHumidity = document.querySelector("#humidity");
  currentHumidity.innerHTML = humidity;

  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind-speed");
  wind.innerHTML = windSpeed;
}

function showLocationTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.main.location;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;
  let currentTemperature = document.querySelector("#current-temperature");
  currentTemperature.innerHTML = `${temperature}`;
}

function showPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "75d7bfe843745f5a8219306b602ef7d5";
  let units = "metric";

  let apiPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiPositionUrl).then(showLocationTemp);
}

navigator.geolocation.getCurrentPosition(showPosition);
