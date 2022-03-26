import handleSubmit from "./js/formhandler";
import updateList from "./js/countryhandler";
import generateForecastTable from "./js/generateforecasttable";
import { serverLog } from "./js/data_util";
import "./styles/styles.scss";

const submitButton = document.getElementById("destSubmit");
submitButton.addEventListener("click", (event) => {
  serverLog("Updating travel page");

  handleSubmit(event); // New name!

  // Should check if country is null, i.e. raise alert and exit
  generateForecastTable(document.getElementById("forecast-table"));

  // addPicture();
});

export { handleSubmit, updateList, generateForecastTable };
