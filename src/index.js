function formatdate(timestamp) {
  let date = new Date(timestamp);
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
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp){
  let date = new Date(timestamp * 1000)
  let day = date.getDay()
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return days[day]
}

function displayForecast(response) {
  let forecast = response.data.daily
  
  let forecastElement = document.querySelector("#weather-forecast");
  
  
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6){
    forecastHTML =
      forecastHTML +
      `
      <div class="col-2">
        <div class="forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${forecastDay.condition.icon}.png"
          alt=""
          width="42"
        />

        <div class="forecast-temperature">
          <span class="max-temp"> ${Math.round(forecastDay.temperature.maximum)}°</span>
          <span class="min-temp"> ${Math.round(forecastDay.temperature.minimum)}°</span>
        </div>
      </div>
      `;}
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5205d0cd1111be04odfa3bb3834ad0t0";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function showTemp(response) {
  document.querySelector("h1").innerHTML = response.data.city;
  document.querySelector("#day-hour").innerHTML = formatdate(
    response.data.time * 1000
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  celesiusTemp = response.data.temperature.current;
  document.querySelector("#degree").innerHTML = Math.round(celesiusTemp);
  document.querySelector("#Humidity").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#Wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  iconElement.setAttribute("alt", response.data.condition.description);

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let apiKey = "5205d0cd1111be04odfa3bb3834ad0t0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-city").value;
  searchCity(city);
}
document.querySelector("#search-form").addEventListener("submit", showCity);

function searchLocation(position) {
  let apiKey = "5205d0cd1111be04odfa3bb3834ad0t0";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}
let currentLocationButton = document.querySelector("#current-location");
currentLocationButton.addEventListener("click", getCurrentLocation);

function displaycelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#degree");
  temperatureElement.innerHTML = Math.round(celesiusTemp);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#degree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celesiusTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp);
}

let celesiusTemp = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displaycelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);

searchCity("Tehran");
