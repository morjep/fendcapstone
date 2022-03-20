const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

const travelObject = {
  geoNamesObject: {},
  cityName: "None",
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

const getCoord = async (cityname) => {
  const url = new URL("http://api.geonames.org/searchJSON");

  url.searchParams.append("q", cityname);
  url.searchParams.append("maxRows", "10");
  url.searchParams.append("username", "mortenjep");

  // console.log(url.href);
  const response = await fetch(url);
  const coord = await response.json(); // parse JSON
  return coord;
};

app.post("/cityname", (req, res) => {
  logRequest(req);
  getCoord(req.body.city).then((coord) => {
    res.send(JSON.stringify(coord));
    travelObject.geoNamesObject = coord;
    return true;
  });
  travelObject.cityName = req.body.city;
});

app.get("/cityname", (req, res) => {
  logRequest(req);
  const data = {
    cityName: travelObject.cityName,
  };
  res.send(JSON.stringify(data));
});
