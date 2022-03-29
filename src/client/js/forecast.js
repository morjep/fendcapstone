import { getData } from "./data_util";

function addForecast(element) {
  const div = document.createElement("div");
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
  element.appendChild(div);
}

export default addForecast;
