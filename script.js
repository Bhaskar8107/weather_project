// It's best practice to not expose your API key directly in the code.
// Consider using a backend proxy or environment variables in a real-world application.
const apiKey = "e13d4899ca8f1eeecfe549521703aa78"; // 🔑 Replace this with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";

// DOM Element References
const searchForm = document.querySelector(".search");
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherContainer = document.querySelector(".weather");
const errorContainer = document.querySelector(".error");

/**
 * Fetches weather data for a given city.
 * @param {string} city - The name of the city.
 */
async function fetchWeather(city) {
  // Show loading state
  searchForm.classList.add("loading");
  searchButton.disabled = true;
  hideWeather();
  hideError();

  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);

    if (response.status === 404) {
      showError("City not found. Please check the spelling.");
      return;
    }

    if (!response.ok) {
      throw new Error("An error occurred while fetching the data.");
    }

    const data = await response.json();
    updateUI(data);
    showWeather();

  } catch (error) {
    showError(error.message);
  } finally {
    // Hide loading state regardless of success or failure
    searchForm.classList.remove("loading");
    searchButton.disabled = false;
  }
}

/**
 * Updates the UI with the fetched weather data.
 * @param {object} data - The weather data from the API.
 */
function updateUI(data) {
  const { name, main, weather, wind } = data;
  
  document.querySelector(".city").textContent = name;
  document.querySelector(".temp").textContent = `${Math.round(main.temp)}°C`;
  document.querySelector(".humidity").textContent = `${main.humidity}%`;
  document.querySelector(".wind").textContent = `${(wind.speed * 3.6).toFixed(1)} km/h`;
  document.querySelector(".description").textContent = weather[0].description;
  
  const weatherIcon = document.querySelector(".weather-icon");
  weatherIcon.src = getWeatherIcon(weather[0].main);
  weatherIcon.alt = weather[0].description;
}

/**
 * Returns the appropriate icon path based on the weather condition.
 * @param {string} condition - The main weather condition (e.g., "Clouds", "Clear").
 * @returns {string} - The path to the weather icon image.
 */
function getWeatherIcon(condition) {
  switch (condition) {
    case "Clouds":
      return "img/clouds.png";
    case "Clear":
      return "img/clear.png";
    case "Rain":
      return "img/rain.png";
    case "Drizzle":
      return "img/drizzle.png";
    case "Mist":
    case "Haze":
    case "Fog":
      return "img/mist.png";
    case "Snow":
      return "img/snow.png";
    case "Thunderstorm":
      return "img/thunderstorm.png";
    default:
      return "img/clear.png";
  }
}

function showWeather() {
  hideError();
  weatherContainer.classList.add("visible");
}

function hideWeather() {
  weatherContainer.classList.remove("visible");
}

function showError(message) {
  hideWeather();
  errorContainer.querySelector("p").textContent = message;
  errorContainer.classList.add("visible");
}

function hideError() {
  errorContainer.classList.remove("visible");
}

// Event Listener for the form submission
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = searchBox.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Fetch weather for a default city on page load
document.addEventListener("DOMContentLoaded", () => {
  fetchWeather("London");
});
