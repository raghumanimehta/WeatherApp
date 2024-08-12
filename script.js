import * as Api from './handle_api.js'


const cityInput = document.getElementById('city-input'); // get the value of the input field/trim the value/remove any white spaces/to lower case
const getWeatherButton = document.getElementById('get-weather-button'); // get the button element
const temperatureDisplay = document.getElementById('temperature-display');
const feelsLikeDisplay = document.getElementById('feels-like-display');
const highLowDisplay = document.getElementById('high-low-display');
const humidityDisplay = document.getElementById('humidity-display');
const windSpeedDisplay = document.getElementById('wind-speed-display');
const windDirectionDisplay = document.getElementById('wind-direction-display');
const windGustDisplay = document.getElementById('wind-gust-display');
const hourlyForecast = document.getElementById('hourly-forecast');
const dailyForecast = document.getElementById('daily-forecast');



document.getElementById('search-form').addEventListener('submit', async (event) => {
    event.preventDefault();
    
    const weatherInfoSection = document.getElementById('weather-info');
    const weatherInfoDisplay = document.getElementById('weather-info-display');
    weatherInfoSection.style.display = 'block';
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
            weatherInfoDisplay.textContent = 'Showing weather results for: ' + cityInput.value;
            temperatureDisplay.textContent = `Temperature: ${weatherData.main.temp}°C`;
            feelsLikeDisplay.textContent = `Feels like: ${weatherData.main.feels_like}°C`;
            highLowDisplay.textContent = `High: ${weatherData.main.temp_max}°C,  Low: ${weatherData.main.temp_min}°C`;
            humidityDisplay.textContent = `Humidity: ${weatherData.main.humidity}%`;
            windSpeedDisplay.textContent = `Wind Speed: ${weatherData.wind.speed} m/s`;
            windDirectionDisplay.textContent = `Wind Direction: ${weatherData.wind.deg}°`;
            windGustDisplay.textContent = `Wind Gust: ${weatherData.wind.gust ? weatherData.wind.gust + ' m/s' : 'N/A'}`;
            
            document.getElementById('current-weather').style.display = 'block';
            document.getElementById('weather-forecast').style.display = 'block';
        } catch (error) {
            weatherInfoDisplay.textContent = 'Error in fetching weather data. Please check the city name and the format and try again';
            console.error('Error in getWeatherData:', error.message);
        }
    }
});


// Api.getForecastData('Vancouver', 'CA'); // For testing
// getWeatherData('Mohali', 'IND'); // For testing