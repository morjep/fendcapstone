import { postData, serverLog } from "./data_util";

function updateList(event) {
  event.preventDefault();

  // get countries from server
  const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "American Samoa",
    "Andorra",
    "Angola",
    "Anguilla",
    "Antigua and Barbuda",
    "Argentina",
    "Armenia",
    "Aruba",
    "Australia",
    "Austria",
    "Azerbaijan",
  ];
  // Update data list
  const datalistElem = document.getElementById("country-list");
  countries.forEach((c) => {
    const op = document.createElement("option");
    op.setAttribute("label", c);
    op.setAttribute("value", c);
    datalistElem.appendChild(op);
  });
}

document.addEventListener("DOMContentLoaded", (event) => {
  // console.log("DOM fully loaded and parsed");
  updateList(event);
  serverLog("Datalist updated");
});

export default updateList;
