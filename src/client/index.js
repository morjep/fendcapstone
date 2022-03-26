import handleSubmit from "./js/formhandler";
import updateList from "./js/countryhandler";
import generateForecastTable from "./js/generateforecasttable";
import updateCountdown from "./js/countdown";
import { serverLog } from "./js/data_util";
import "./styles/styles.scss";

const submitButton = document.getElementById("destSubmit");
submitButton.addEventListener("click", (event) => {
  serverLog("Updating travel page");

  handleSubmit(event); // New name!

  // Should check if country is null, i.e. raise alert and exit
  document.getElementById("forecast").innerHTML = '<table id="forecast-table"></table>';
  generateForecastTable(document.getElementById("forecast-table"));

  updateCountdown();

  // addPicture();
});

export { handleSubmit, updateList, generateForecastTable };
