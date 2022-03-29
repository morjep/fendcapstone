import handleSubmit from "./js/formhandler";
import addForecast from "./js/forecast";
import addCountdown from "./js/countdown";
import { serverLog } from "./js/data_util";
import addPicture from "./js/picture";
import "./styles/styles.scss";

const submitButton = document.getElementById("destSubmit");
submitButton.addEventListener("click", (event) => {
  serverLog("Updating travel page");

  handleSubmit(event);

  const newTrip = document.createElement("div");
  newTrip.className = "trip";

  addForecast(newTrip);

  addCountdown(newTrip);

  addPicture(newTrip);

  document.getElementById("trips").prepend(newTrip);
});

export { handleSubmit, addForecast };
