const apiKey = 'd41b73ff94ff43d76516e8e8fa3cf175';
const weatherForm = document.getElementById('weatherForm');
const cityInput = document.getElementById('city');
const weatherInfo = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('windSpeed');
const errorMessage = document.getElementById('errorMessage');

weatherForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const city = cityInput.value.trim();

  if (!city) {
    errorMessage.textContent = 'Please enter a city name.';
    return;
  }

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error('City not found.');
    }

    const data = await response.json();
    displayWeather(data);
    errorMessage.textContent = '';
  } catch (error) {
    errorMessage.textContent = error.message;
    weatherInfo.classList.add('hidden');
  }
});

function displayWeather(data) {
  weatherInfo.classList.remove('hidden');
  cityName.textContent = `Weather in ${data.name}`;
  temperature.textContent = `Temperature: ${data.main.temp}°C`;
  description.textContent = `Condition: ${data.weather[0].description}`;
  humidity.textContent = `Humidity: ${data.main.humidity}%`;
  windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}