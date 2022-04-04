import handleSubmit from "./js/formhandler";
import addForecast from "./js/forecast";
import addCountdown from "./js/countdown";
import { serverLog } from "./js/data_util";
import addPicture from "./js/picture";
import { addTripSummary } from "./js/tripsummary";
import "./styles/base.scss";
import "./styles/forecast.scss";
import "./styles/form.scss";
import "./styles/summary.scss";
import "./styles/picture.scss";
import "./styles/countdown.scss";

const submitButton = document.getElementById("destSubmit");

submitButton.addEventListener("click", (event) => {
  serverLog("Updating travel page");

  if (handleSubmit(event)) {
    const newTrip = document.createElement("div");
    newTrip.className = "trip";
    newTrip.append(addTripSummary(), addCountdown(), addPicture(), addForecast());
    document.getElementById("trips").prepend(newTrip);

    setTimeout(() => {
      document.getElementById("formToReset").reset();
    }, 200);
  }
});

export { handleSubmit, addForecast };
