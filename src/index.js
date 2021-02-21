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


function showCityValue(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input");
  let city = document.querySelector("h1");
  city.innerHTML = cityInput.value;
  searchCity(cityInput.value);
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", showCityValue);


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

  celsiusTemperature = response.data.main.temp;

  let currentWeatherIcon=document.querySelector("#current-icon");
  if (response.data.weather[0].icon === "01d"){
    currentWeatherIcon.setAttribute ("class", "fas fa-sun");
  } else if (response.data.weather[0].icon === "01n"){
    currentWeatherIcon.setAttribute("class","fas fa-moon");
  } else if (response.data.weather[0].icon === "02d"){
    currentWeatherIcon.setAttribute("class","fas fa-cloud-sun");
  } else if (response.data.weather[0].icon === "02n"){
    currentWeatherIcon.setAttribute("class","fas fa-cloud-moon");
  }else if (response.data.weather[0].icon ==="03d" || response.data.weather[0].icon === "03n"){
    currentWeatherIcon.setAttribute("class", "fas fa-cloud");
  } else if (response.data.weather[0].icon === "04d" || response.data.weather[0].icon === "04n"){
    currentWeatherIcon.setAttribute("class", "fas fa-cloud");
  } else if (response.data.weather[0].icon === "09d" || response.data.weather[0].icon === "09n"){
    currentWeatherIcon.setAttribute("class", "fas fa-cloud-rain");
  } else if (response.data.weather[0].icon ==="10d"){
    currentWeatherIcon.setAttribute("class","fa-cloud-sun-rain");
  } else if (response.data.weather[0].icon ==="10n"){
    currentWeatherIcon.setAttribute("class", "fas fa-cloud-moon-rain");
  } else if (response.data.weather[0].icon ==="11d" || response.data.weather[0].icon === "11n"){
    currentWeatherIcon.setAttribute("class","fas fa-bolt");
  } else if (response.data.weather[0].icon ==="13d" || response.data.weather[0].icon === "13n"){
    currentWeatherIcon.setAttribute("class","far fa-snowflake");
  } else if (response.data.weather [0].icon ==="50d" || response.data.weather[0].icon ==="50n"){
    currentWeatherIcon.setAttribute("class","fas fa-smong");
  }
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
  let units = "imperial";

  let apiPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiPositionUrl).then(showLocationTemp);
}

navigator.geolocation.getCurrentPosition(showPosition);

function displayFahrenheitTemperature(event){
  event.preventDefault();
  let temperatureElement = document.querySelector ("#current-temperature");

  celsiusLink.classList.remove ("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature *9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature (event){
  event.preventDefault();
  celsiusLink.classList.add ("active");
  fahrenheitLink.classList.remove ("active");
  let temperatureElement =document.querySelector("#current-temperature");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink= document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener ("click", displayCelsiusTemperature);

