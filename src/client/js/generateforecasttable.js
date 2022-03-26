import { getData } from "./data_util";

function generateForecastTable(table) {
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
}

export default generateForecastTable;
