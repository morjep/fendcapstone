import { getData, postData, serverLog } from "./data_util";

function updateList(event) {
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
  // console.log("DOM fully loaded and parsed");
  updateList(event);
  serverLog("Datalist updated");
});

document.getElementById("country-choice").addEventListener("change", () => {
  const country = {
    country: document.getElementById("country-choice").value,
  };
  postData("/country", country);
});

export default updateList;
