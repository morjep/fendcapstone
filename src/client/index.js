import handleSubmit from "./js/formhandler";
import addForecast from "./js/generateforecasttable";
import addCountdown from "./js/countdown";
import { serverLog } from "./js/data_util";
import addPicture from "./js/picture";
import "./styles/styles.scss";

const submitButton = document.getElementById("destSubmit");
submitButton.addEventListener("click", (event) => {
  serverLog("Updating travel page");

  handleSubmit(event);

  const tableHTML = '<table id="forecast-table"></table>';
  document.getElementById("forecast").innerHTML = tableHTML;
  addForecast(document.getElementById("forecast-table"));

  addCountdown();

  addPicture(document.getElementById("picture"));
});

export { handleSubmit, addForecast };
