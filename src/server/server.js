const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

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
