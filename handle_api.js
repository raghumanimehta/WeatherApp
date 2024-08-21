const api = `https://api.openweathermap.org/data/3.0/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}&units=metric`; // API URL
const geoCodingApi = 'http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}'
const forecastApi = 'http://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}';
const weatherIconApi = 'http://openweathermap.org/img/wn/{icon}@2x.png';
const apiKey = '4ef937ebe114082fbc231c86a691a5fb'; // API key



// Effect: get the geo location data from the given country and city name, will default to the first option if there are multiple options
export async function getGeoLocationData(cityName, countryName) {
    let api = geoCodingApi.replace('{city name}', cityName).replace('{country code}', countryName).replace('{API key}', apiKey).replace('{limit}', 1).replace(',{state code}', '');
    const response = await fetch(api);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    } 

    const data = await response.json();

    if (!data || data.length == 0) {
        throw new Error('No data found');
    }

    let geoData = {lat: data[0].lat, lon: data[0].lon}; 
    return geoData;
}

// Effect: get the weather data from the API throws error for the caller to handle in case weather data can't be retrieved
export async function getWeatherData(cityName, countryName) {
    const geoData = await getGeoLocationData(cityName, countryName, apiKey);
    if (!geoData || !geoData.lat || !geoData.lon) {
        throw new Error('Invalid geolocation data');
    }

    let apiUrl = api.replace('{lat}', geoData.lat).replace('{lon}', geoData.lon).replace('{part}', 'minutely,hourly,daily')
                    .replace('{API key}', apiKey);
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data.current.weather);  // testing remove later
    console.log(data);  // testing remove later 
    return data;  
}

export async function getForecastData(cityName, countryName) {
    const geoData = await getGeoLocationData(cityName, countryName, apiKey);
    if (!geoData || !geoData.lat || !geoData.lon) {
        throw new Error('Invalid geolocation data');
    }

    let apiUrl = forecastApi.replace('{lat}', geoData.lat).replace('{lon}', geoData.lon).replace('{API key}', apiKey);
    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);  
    return data;  
}

export async function getWeatherIcon(id) {
    let iconUrl = weatherIconApi.replace('{icon}', id);
    console.log(iconUrl);  // testing remove later
    return iconUrl;
}
// getWeatherData('Vancouver', 'CA'); // For testing
// getWeatherIcon('10d'); // For testing
