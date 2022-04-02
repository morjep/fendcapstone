import { getData } from "./data_util";

/**
 * It gets the countdown data from the server and then creates a div with the data.
 * @param element - The element to which the countdown will be appended.
 */
export const buildInnerHtml = (res) =>
  `<h1>Destination: ${res.city}, ${res.country}</h1><h2>Traveldate: ${res.travelDate} </h2>`;

export const addTripSummary = () => {
  const div = document.createElement("div");

  getData("/all").then((res) => {
    div.className = "summary";
    div.innerHTML = buildInnerHtml(res);
  });
  return div;
};
