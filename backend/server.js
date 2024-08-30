const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();
const handle_api = require('./handle_api'); 

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Weather App API');
});

// Weather route
app.get('/weather', async (req, res) => {
    try {
        const city = req.query.city;
        const country = req.query.country;

        const weatherData = await handle_api.getWeatherData(city, country);
        const forecastData = await handle_api.getForecastData(city, country);
        const iconData = await handle_api.getWeatherIcon(weatherData.current.weather[0].icon);

        const combinedData = {
            weather: weatherData,
            forecast: forecastData,
            icon: iconData
        };

        res.json(combinedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

function shutdown() {
    server.close(() => {
        console.log('Server is shut down');
    });
}
process.on('SIGINT', shutdown);
