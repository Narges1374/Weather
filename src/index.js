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
  let currentDay = days[date.getDay()];
  let currentHours = date.getHours();
  if (currentHours < 10) {
    currentHours = `0${currentHours}`;
  }
  let currentMinutes = date.getMinutes();
  if (currentMinutes < 10) {
    currentMinutes = `0${currentMinutes}`;
  }
  return `${currentDay} ${currentHours}:${currentMinutes}`;
}

function showTemp(response) {
  document.querySelector("h1").innerHTML = response.data.city;
  document.querySelector("#day-hour").innerHTML = formatdate(
    response.data.time * 1000
  );
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
  document.querySelector("#degree").innerHTML = Math.round(
    response.data.temperature.current
  );
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
  console.log(response)
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

searchCity("Tehran");
