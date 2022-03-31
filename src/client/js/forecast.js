import { getData } from "./data_util";

/**
 * It creates a table with the forecast data.
 * @param element - The element to which the forecast will be added.
 */
const addForecast = () => {
  const div = document.createElement("div");
  div.className = "forecast";
  div.innerHTML = "<h1> Current forecast for destination </h1>";
  const table = document.createElement("table");
  table.className = "forecast";
  const thead = table.createTHead();
  const rowHead = thead.insertRow();

  getData("/forecast").then((forecast) => {
    const keys = Object.keys(forecast[0]);
    keys.forEach((key) => {
      const th = document.createElement("th");
      const text = document.createTextNode(key.toUpperCase());
      th.appendChild(text);
      rowHead.appendChild(th);
    });

    forecast.forEach((elem) => {
      const row = table.insertRow();

      keys.forEach((key) => {
        const cell = row.insertCell();
        const text = document.createTextNode(elem[key]);
        cell.appendChild(text);
      });
    });
  });
  div.append(table);
  return div;
};

export default addForecast;
