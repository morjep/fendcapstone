import { getData } from "./data_util";

function addCountdown(element) {
  getData("/countdown").then((res) => {
    const div = document.createElement("div");
    div.className = "countdown";
    div.innerHTML = `Countdown: ${res.timeToTravel}`;
    element.appendChild(div);
  });
}

export default addCountdown;
