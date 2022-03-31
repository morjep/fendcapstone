import { getData } from "./data_util";

/**
 * It gets the countdown data from the server and then creates a div with the data.
 * @param element - The element to which the countdown will be appended.
 */
const addTripSummary = () => {
  const div = document.createElement("div");

  getData("/all").then((res) => {
    div.className = "summary";
    div.innerHTML = `<h2>Destination: ${res.city}, ${res.country} - Traveldate: ${res.travelDate}</h2>`;
  });
  return div;
};

export default addTripSummary;
