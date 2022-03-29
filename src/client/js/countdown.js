import { getData } from "./data_util";

/**
 * It gets the countdown data from the server and then creates a div with the data.
 * @param element - The element to which the countdown will be appended.
 */
const addCountdown = (element) => {
  getData("/countdown").then((res) => {
    const div = document.createElement("div");
    div.className = "countdown";
    div.innerHTML = `<h2>Countdown</h2> ${res.timeToTravel}`;
    element.appendChild(div);
  });
};

export default addCountdown;
