import { getData } from "./data_util";

/**
 * It gets the countdown data from the server and then creates a div with the data.
 * @param element - The element to which the countdown will be appended.
 */
const addCountdown = () => {
  const div = document.createElement("div");
  div.className = "countdown";

  getData("/countdown").then((res) => {
    div.innerHTML = `<h2>Days to trip: ${res.timeToTravel}</h2>`;
  });
  return div;
};

export default addCountdown;
