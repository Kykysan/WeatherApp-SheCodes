function formatDate(timestamp) {
  let date = new Date (timestamp);
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
  let currentDay = days[date.getDay()];
  let currentMonth = months[date.getMonth()];

  return `${currentDay}, ${currentMonth}, ${formatHours(timestamp)}`;
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

function formatHours (timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours <10){
    hours =`0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;}
  
  return `${hours}:${minutes}`;
}

function showCurrentConditions(response) {
  console.log(response.data);
  document.querySelector("#current-temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#description").innerHTML = response.data.weather[0].main;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("h1").innerHTML=response.data.name;

  let iconElement = document.querySelector("#current-icon");
  iconElement.setAttribute("class", getIcon(response.data.weather[0].icon));

  celsiusTemperature = response.data.main.temp;
}

function getIcon(icon){
  let iconElement ="";
  if (icon === "01d"){
    iconElement = "fas fa-sun";
  }else if (icon === "01n"){
    iconElement = "fas fa-moon";
  }else if (icon === "02d"){
    iconElement ="fas fa-cloud-sun";
  }else if (icon === "02n"){
    iconElement = "fas fa-clound-moon";
  }else if (icon === "03d" || icon === "03n"){
    iconElement = "fas fa-cloud";
  } else if (icon === "04d" || icon === "04n"){
    iconElement = "fas fa-cloud";
  } else if (icon === "09d" || icon === "09n"){
    iconElement = "fas fa-cloud-rain";
  }else if (icon === "10d"){
    iconElement = "fa-cloud-sun-rain";
  }else if (icon === "10n"){
    iconElement = "fas fa-cloud-moon-rain";
  }else if (icon === "11d" || icon === "11n"){
    iconElement = "fas fa-bolt";
  }else if (icon === "13d" || icon === "13n"){
    iconElement = "far fa-snowflake";
  }else if (icon === "50d" || icon === "50n"){
    iconElement = "fas fa-smog";
  }
  
  return iconElement;
}

function searchLocation(position) {
  let apiKey = "75d7bfe843745f5a8219306b602ef7d5";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;  
  let units = "metric";


  let apiPositionUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiPositionUrl).then(showCurrentConditions);

apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}


function getCurrentLocation (event){
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector(".currentLocationButton");
currentLocationButton.addEventListener("click", getCurrentLocation);

function search(event) {
  event.preventDefault();
  let cityElement = document.querySelector ("h1");
  let cityInput = document.querySelector("#search-input");
  cityElement.innerHTML = cityInput.value;

  let apiKey = "75d7bfe843745f5a8219306b602ef7d5";
  let endPoint = "https://api.openweathermap.org/data/2.5/weather?q=";
  let units = "metric";
  let city = document.querySelector("#search-input").value;
  let apiUrl = `${endPoint}${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showCurrentConditions);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(displayForecast);
}

let searchForm = document.querySelector("#search-engine");
searchForm.addEventListener("submit", search);

function displayForecast(response){
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index <6; index ++){
    forecast = response.data.list [index];
    forecastElement.innerHTML += `
    <div class="col-sm-2">
          <h3>${formatHours(forecast.dt * 1000)}</h3>
          <h4 class="forecastWeatherIcon">
            <i class="${getIcon(forecast.weather[0].icon)}"></i>
            </h4>
          <div class="weatherForecastTemperature">
            <strong>${Math.round(forecast.main.temp_max)}°</strong>${Math.round(forecast.main.temp_min)}°</div>
        </div>`;
  }
}

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

