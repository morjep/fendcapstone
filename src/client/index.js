import handleSubmit from "./js/formhandler";
import addForecast from "./js/forecast";
import addCountdown from "./js/countdown";
import { serverLog } from "./js/data_util";
import addPicture from "./js/picture";
import addTripSummary from "./js/tripsummary";
import "./styles/base.scss";
import "./styles/forecast.scss";
import "./styles/form.scss";
import "./styles/summary.scss";
import "./styles/picture.scss";
import "./styles/countdown.scss";

const submitButton = document.getElementById("destSubmit");

submitButton.addEventListener("click", (event) => {
  serverLog("Updating travel page");

  handleSubmit(event);

  const newTrip = document.createElement("div");
  newTrip.className = "trip";

  newTrip.append(addTripSummary(), addCountdown(), addPicture(), addForecast());

  // addForecast(newTrip);

  // addCountdown(newTrip);

  // addPicture(newTrip);

  document.getElementById("trips").prepend(newTrip);

  document.getElementById("userform").reset();
});

export { handleSubmit, addForecast };
