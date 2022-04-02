const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

const travelObject = {
  city: null,
  country: null,
  countryCode: null,
  lat: null,
  lon: null,
  forecast: {},
  pictureData: {},
  travelDate: null,
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

app.post("/log", (req, res) => {
  logRequest(req);
  const date = new Date();
  const timestamp = date.toUTCString();
  console.log(`${timestamp} ::: CLIENT-LOG(${req.body.log})`);
  const msg = {
    message: "ok",
  };
  res.send(JSON.stringify(msg));
});

app.post("/city", (req, res) => {
  logRequest(req);
  travelObject.city = req.body.city;
  res.send(JSON.stringify({ travelObject }));
});

app.get("/city", (req, res) => {
  logRequest(req);
  const msg = {
    city: travelObject.city,
  };
  res.send(JSON.stringify(msg));
});

const lookup = require("country-code-lookup");

app.get("/countries", (req, res) => {
  logRequest(req);
  const { countries } = lookup;
  const msg = countries.map((country) => country.country);
  res.send(JSON.stringify(msg));
});

app.post("/country", (req, res) => {
  logRequest(req);
  travelObject.country = req.body.country;
  const data = lookup.byCountry(req.body.country);
  travelObject.countryCode = data.iso2;
  res.send(JSON.stringify({ travelObject }));
});

app.get("/country", (req, res) => {
  logRequest(req);
  const msg = {
    country: travelObject.country,
    countryCode: travelObject.countryCode,
  };
  res.send(JSON.stringify(msg));
});

const getData = async (options) => {
  const url = new URL(options.url);

  Object.entries(options.options).forEach(([key, value]) => {
    url.searchParams.append(key, value);
  });
  console.log(url.href);
  const response = await fetch(url);
  const data = await response.json(); // parse JSON
  return data;
};

app.get("/forecast", (req, res) => {
  logRequest(req);
  const optionsGeo = {
    url: "http://api.geonames.org/searchJSON",
    options: {
      q: travelObject.city,
      country: travelObject.countryCode,
      maxRows: "10",
      username: process.env.GEONAMES_USERNAME,
    },
  };
  getData(optionsGeo).then((coord) => {
    travelObject.lat = coord.geonames[0].lat;
    travelObject.lon = coord.geonames[0].lng;
    const optionsWeather = {
      url: "http://api.weatherbit.io/v2.0/forecast/daily",
      options: {
        lat: travelObject.lat,
        lon: travelObject.lon,
        key: process.env.WEATHERBIT_API_KEY,
      },
    };
    getData(optionsWeather).then((forecast) => {
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

app.get("/picture", (req, res) => {
  logRequest(req);
  const options = {
    url: "https://pixabay.com/api/",
    options: {
      q: `${travelObject.city}+${travelObject.country}`,
      image_type: "photo",
      key: process.env.PIXABAY_API_KEY,
    },
  };
  getData(options).then((picture) => {
    const pictureData = {
      url: picture.hits[0].webformatURL,
      tag: picture.hits[0].tags,
      width: picture.hits[0].webformatWidth,
      heigth: picture.hits[0].webformatHeight,
    };
    travelObject.pictureData = pictureData;
    res.send(JSON.stringify(travelObject.pictureData));
  });
});

app.post("/traveldate", (req, res) => {
  logRequest(req);
  travelObject.travelDate = req.body.travelDate;
  res.send(JSON.stringify({ travelObject }));
});

const util = require("./days_util");

app.get("/countdown", (req, res) => {
  logRequest(req);
  const today = new Date();
  const days = util.getNumberOfDays(today, travelObject.travelDate);
  res.send(JSON.stringify({ timeToTravel: days }));
});

app.get("/all", (req, res) => {
  logRequest(req);
  res.send(JSON.stringify(travelObject));
});
