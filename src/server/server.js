const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

const travelObject = {
  geoNamesObject: {},
  city: "None",
  country: "None",
  countryCode: "None",
  lat: "None",
  lon: "None",
  forecast: {},
};

/* Creating an express app. */
const app = express();

/* It loads the .env file into process.env. */
dotenv.config();
console.log(`Your Pixabay API key is ${process.env.PIXABAY_API_KEY}`);
console.log(`Your Weatherbit API key is ${process.env.WEATHERBIT_API_KEY}`);
console.log(`Your Geonames username is ${process.env.GEONAMES_USERNAME}`);

// Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

console.log(__dirname);

// designates what port the app will listen to for incoming requests
app.listen(8081, () => {
  console.log("Example app listening on port 8081!");
});

/**
 * Logs the request method and url to the console.
 * @param req - the request object
 */
function logRequest(req) {
  const date = new Date();
  const timestamp = date.toUTCString();
  console.log(`${timestamp} ::: ${req.method} request on ${req.url}`);
}

/* Serving the index.html file from the dist folder. */
app.get("/", (req, res) => {
  logRequest(req);
  res.sendFile("./dist/index.html");
});

app.post("/name", (req, res) => {
  logRequest(req);
  const json = {
    message: `Server: Hello, ${req.body.name}`,
  };
  res.send(JSON.stringify(json));
});

app.post("/log", (req, res) => {
  logRequest(req);
  const date = new Date();
  const timestamp = date.toUTCString();
  console.log(`${timestamp} ::: CLIENT-LOG(${req.body.log})`);
  const json = {
    message: "ok",
  };
  res.send(JSON.stringify(json));
});

app.post("/city", (req, res) => {
  logRequest(req);
  travelObject.city = req.body.city;
  res.send("ok");
});

app.get("/city", (req, res) => {
  logRequest(req);
  const data = {
    city: travelObject.city,
  };
  res.send(JSON.stringify(data));
});

const lookup = require("country-code-lookup");

app.get("/countries", (req, res) => {
  logRequest(req);
  const { countries } = lookup;
  const countryNames = countries.map((country) => country.country);
  res.send(JSON.stringify(countryNames));
});

app.post("/country", (req, res) => {
  logRequest(req);
  travelObject.country = req.body.country;
  const data = lookup.byCountry(req.body.country);
  travelObject.countryCode = data.iso2;
  res.send("ok");
});

app.get("/country", (req, res) => {
  logRequest(req);
  const data = {
    country: travelObject.country,
    countryCode: travelObject.countryCode,
  };
  res.send(JSON.stringify(data));
});

const getForecast = async () => {
  const url = new URL("http://api.weatherbit.io/v2.0/forecast/daily");

  url.searchParams.append("lat", travelObject.lat);
  url.searchParams.append("lon", travelObject.lon);
  url.searchParams.append("key", process.env.WEATHERBIT_API_KEY);
  console.log(url.href);
  const response = await fetch(url);
  const data = await response.json(); // parse JSON
  return data;
};

const getCoord = async () => {
  const url = new URL("http://api.geonames.org/searchJSON");

  url.searchParams.append("q", travelObject.city);
  url.searchParams.append("country", travelObject.countryCode);
  url.searchParams.append("maxRows", "10");
  url.searchParams.append("username", process.env.GEONAMES_USERNAME);

  console.log(url.href);
  const response = await fetch(url);
  const data = await response.json(); // parse JSON
  return data;
};

app.get("/forecast", (req, res) => {
  logRequest(req);
  getCoord().then((coord) => {
    console.log(coord.geonames[0].lat);
    console.log(coord.geonames[0].lng);
    travelObject.lat = coord.geonames[0].lat;
    travelObject.lon = coord.geonames[0].lng;
    getForecast().then((forecast) => {
      // console.log(forecast);
      const simpleForecast = forecast.data.map((day) => ({
        date: day.datetime,
        high: day.max_temp,
        low: day.low_temp,
      }));
      console.log(simpleForecast);
      travelObject.forecast = simpleForecast;
      res.send(JSON.stringify(travelObject.forecast));
    });
  });
});
