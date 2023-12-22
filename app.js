const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})

app.post('/', (req, res) => {
    const city = req.body.cityName;
    const url = "https://api.openweathermap.org/data/2.5/weather?appid=edbd860d5c3058bd71fd465dcde19488&q=" + city + "&units=metric";
    https.get(url, (response) => {
        response.on('data', (incoming_data) => {
            const weatherData = JSON.parse(incoming_data);
            const temp = weatherData.main.temp;
            const cityName = weatherData.name;
            const weatherDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const iconURL = "https://openweathermap.org/img/wn/" + icon + "@2x.png"

            res.write("<h1>Current temperature in " + cityName + " is " + temp + " deg. celsius</h1>");
            res.write("<p>Current weather in " + cityName + " is " + weatherDesc + "</p>");
            res.write('<img src="' + iconURL + '"></img><br>');
            res.write('<a href="/">Home</a>');
            res.send();
        });
    });
});

app.listen(3000, () => {
    console.log("Server listening at http://localhost:3000");
})