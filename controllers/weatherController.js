const https = require("https");

const getWeather = (req, res) => {
  return new Promise((resolve, reject) => {
    https.get("https://api.myip.com/", function (response) {
      response.on("data", function (data) {
        const ipData = JSON.parse(data);
        const ip = ipData.ip;
        https.get(`https://ipwhois.app/json/${ip}`, (ipResponse) => {
          ipResponse.on("data", (locData) => {
            const resp = JSON.parse(locData);
            const location = resp.city;
            const query = location;
            const apiKey = process.env.WEATHER_API_KEY;
            const units = "metric";
            const url =
              "https://api.openweathermap.org/data/2.5/weather?q=" +
              query +
              "&appid=" +
              apiKey +
              "&units=" +
              units;

            https.get(url, function (response) {
              response.on("data", function (data) {
                const weatherData = JSON.parse(data);
                resolve(weatherData);
              });
            });
          });
        });
      });
    });
  });
};

module.exports = { getWeather };
