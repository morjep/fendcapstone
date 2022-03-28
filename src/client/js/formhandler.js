import { getData, postData, serverLog } from "./data_util";

function updateCountryList(event) {
  event.preventDefault();

  getData("/countries").then((countries) => {
    // Update data list
    const datalistElem = document.getElementById("country-list");
    countries.forEach((c) => {
      const op = document.createElement("option");
      op.setAttribute("label", c);
      op.setAttribute("value", c);
      datalistElem.appendChild(op);
    });
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  updateCountryList(event);
  serverLog("Datalist updated");
});

function handleSubmit(event) {
  event.preventDefault();

  postData("/city", {
    city: document.getElementById("city").value,
  });

  postData("/country", {
    country: document.getElementById("country-choice").value,
  });

  postData("/traveldate", {
    travelDate: document.getElementById("travel-date").value,
  });
}

export default handleSubmit;
