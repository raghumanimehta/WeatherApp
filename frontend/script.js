const cityInput = document.getElementById('city-input'); // get the value of the input field/trim the value/remove any white spaces/to lower cas
const temperatureDisplay = document.getElementById('temperature-display');
const feelsLikeDisplay = document.getElementById('feels-like-display');const highLowDisplay = document.getElementById('high-low-display');
const humidityDisplay = document.getElementById('humidity-display');
const windSpeedDisplay = document.getElementById('wind-speed-display');
const windDirectionDisplay = document.getElementById('wind-direction-display');
const weatehrDescriptionDisplay = document.getElementById('weather-description-display');
const localTimeDisplay = document.getElementById('localTimeDisplay');

const weatherIconDisplay = document.getElementById('weather-icon-display');
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('weather-icon-display').style.display = 'none';
});


document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    const weatherInfoDisplay = document.getElementById('weather-info-display');
    await showWeatherData(weatherInfoDisplay);
});

async function showWeatherData(weatherInfoDisplay) {
    weatherInfoDisplay.style.display = 'block';

    if (cityInput == '') {
        weatherInfoDisplay.textContent = 'Please enter a valid city name along with the country code';
    } else {
        try {
            const [city, country] = cityInput.value.split(',').map(item => item.trim()); 
            if (!city || !country) {
                throw new Error('Invalid city name or country code');
            }
            

            console.log(`Fetching weather data for city: ${city}, country: ${country}`);
            const response = await fetch(`http://localhost:8000/weather?city=${city}&country=${country}`);


            if (!response.ok) {
                throw new Error('Failed to fetch weather data');
            }
        
            const combinedData = await response.json();
            const weatherData = combinedData.weather;
            const iconData = combinedData.icon;
            const forecastData = combinedData.forecast;
        
            weatherInfoDisplay.textContent = `${city}, ${country}`;
        
        
            weatehrDescriptionDisplay.textContent = weatherData.current.weather[0].description.charAt(0).toUpperCase() + weatherData.current.weather[0].description.slice(1);
            temperatureDisplay.textContent = `Temperature: ${weatherData.current.temp}°C`;
            feelsLikeDisplay.textContent = `Feels like: ${weatherData.current.feels_like}°C`;
            humidityDisplay.textContent = `Humidity: ${weatherData.current.humidity}%`;
            windSpeedDisplay.textContent = `Wind Speed: ${weatherData.current.wind_speed} m/s`;
            windDirectionDisplay.textContent = `Wind Direction: ${weatherData.current.wind_deg}°`;
            weatherIconDisplay.style.display = 'block';
            weatherIconDisplay.src = iconData;
            addForecastEntries(forecastData.hourly);
        } catch (error) {
            console.error('Error:', error.message);
            weatherInfoDisplay.textContent = 'Error in fetching weather data. Please check the city name and the format and try again';
        }
    }
}

function addForecastEntries(forecastData) {
    const forecastSection = document.getElementById('forecast-entries');
    // forecastSection.innerHTML = '';
    let count = 0;
    forecastData.forEach((entry) => {
        const forecastEntry = document.createElement('div');
        forecastEntry.className = 'forecast-entry';
        forecastEntry.innerHTML = `
            <h3> ${3 * ++count} hours from now</h3>
            <p>${entry.weather[0].description.charAt(0).toUpperCase() + entry.weather[0].description.slice(1)}</p>
            <p>${entry.temp}°C</p>`;
        forecastSection.appendChild(forecastEntry);
    });
}