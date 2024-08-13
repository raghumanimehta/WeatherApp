import * as Api from './handle_api.js'


const cityInput = document.getElementById('city-input'); // get the value of the input field/trim the value/remove any white spaces/to lower cas
const temperatureDisplay = document.getElementById('temperature-display');
const feelsLikeDisplay = document.getElementById('feels-like-display');
const highLowDisplay = document.getElementById('high-low-display');
const humidityDisplay = document.getElementById('humidity-display');
const windSpeedDisplay = document.getElementById('wind-speed-display');
const windDirectionDisplay = document.getElementById('wind-direction-display');
const windGustDisplay = document.getElementById('wind-gust-display');
const weatehrDescriptionDisplay = document.getElementById('weather-description-display');
const localTimeDisplay = document.getElementById('local-time-display');

const weatherIconDisplay = document.getElementById('weather-icon-display');



document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const weatherInfoDisplay = document.getElementById('weather-info-display');


    await showWeatherData(weatherInfoDisplay);
    // await showForecastData(weatherInfoSection, weatherInfoDisplay);
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
            const weatherData = await Api.getWeatherData(city, country);
            weatherInfoDisplay.textContent = city + ', ' + country;
            // localTimeDisplay.textContent = 
            weatehrDescriptionDisplay.textContent = weatherData.weather[0].description.charAt(0).toUpperCase() + weatherData.weather[0].description.slice(1);
            temperatureDisplay.textContent = `Temperature: ${weatherData.main.temp}°C`;
            feelsLikeDisplay.textContent = `Feels like: ${weatherData.main.feels_like}°C`;
            highLowDisplay.textContent = `High: ${weatherData.main.temp_max}°C,  Low: ${weatherData.main.temp_min}°C`;
            humidityDisplay.textContent = `Humidity: ${weatherData.main.humidity}%`;
            windSpeedDisplay.textContent = `Wind Speed: ${weatherData.wind.speed} m/s`;
            windDirectionDisplay.textContent = `Wind Direction: ${weatherData.wind.deg}°`;
            windGustDisplay.textContent = `Wind Gust: ${weatherData.wind.gust ? weatherData.wind.gust + ' m/s' : 'N/A'}`;

        } catch (error) {
            weatherInfoDisplay.textContent = 'Error in fetching weather data. Please check the city name and the format and try again';
            console.error('Error in getWeatherData:', error.message);
        }
    }
}

// async function showForecastData(weatherInfoSection) {

// }
// Api.getForecastData('Vancouver', 'CA'); // For testing
// getWeatherData('Mohali', 'IND'); // For testing