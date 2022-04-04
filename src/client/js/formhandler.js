import { getData, postData, serverLog } from "./data_util";

const updateCountryList = (event) => {
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
};

document.addEventListener("DOMContentLoaded", (event) => {
  updateCountryList(event);
  serverLog("Datalist updated");
});

const handleSubmit = (event) => {
  event.preventDefault();

  const country = document.getElementById("country-choice").value;
  const city = document.getElementById("city").value;
  const travelDate = document.getElementById("travel-date").value;

  if (country === "") {
    alert("Please select country");
    return false;
  }

  if (city === "") {
    alert("Please enter city");
    return false;
  }

  if (travelDate === "") {
    alert("Please enter date");
    return false;
  }

  postData("/country", {
    country,
  });

  postData("/city", {
    city,
  });

  postData("/traveldate", {
    travelDate,
  });

  return true;
};

export default handleSubmit;
