
function setBackground(condition) {
    document.body.className = condition;
}
setBackground('sunny');


const cityInput = document.getElementById('city-input'); // get the value of the input field/trim the value/remove any white spaces/to lower cas
const temperatureDisplay = document.getElementById('temperature-display');
const feelsLikeDisplay = document.getElementById('feels-like-display');const highLowDisplay = document.getElementById('high-low-display');
const humidityDisplay = document.getElementById('humidity-display');
const windSpeedDisplay = document.getElementById('wind-speed-display');
const windDirectionDisplay = document.getElementById('wind-direction-display');
const weatehrDescriptionDisplay = document.getElementById('weather-description-display');
const localTimeDisplay = document.getElementById('localTimeDisplay');

const weatherIconDisplay = document.getElementById('weather-icon-display');

weatherIconDisplay.style.display = 'block';

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
        
            const timezoneOffsetSeconds = weatherData.timezone_offset;
            const utcTime = new Date().getTime();
            const localTime = new Date(utcTime + timezoneOffsetSeconds * 1000);
            localTimeDisplay.textContent = `Local Time: ${localTime.toLocaleTimeString('en-US', { hour12: false })}`;
        
            weatehrDescriptionDisplay.textContent = weatherData.current.weather[0].description.charAt(0).toUpperCase() + weatherData.current.weather[0].description.slice(1);
            temperatureDisplay.textContent = `Temperature: ${weatherData.current.temp}°C`;
            feelsLikeDisplay.textContent = `Feels like: ${weatherData.current.feels_like}°C`;
            humidityDisplay.textContent = `Humidity: ${weatherData.current.humidity}%`;
            windSpeedDisplay.textContent = `Wind Speed: ${weatherData.current.wind_speed} m/s`;
            windDirectionDisplay.textContent = `Wind Direction: ${weatherData.current.wind_deg}°`;
            weatherIconDisplay.src = iconData;
        } catch (error) {
            console.error('Error:', error.message);
            weatherInfoDisplay.textContent = 'Error in fetching weather data. Please check the city name and the format and try again';
        }
    }
}



// async function showForecastData(weatherInfoSection) {

// }
// Api.getForecastData('Vancouver', 'CA'); // For testing
