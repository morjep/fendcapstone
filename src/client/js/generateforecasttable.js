import { getData, serverLog } from "./data_util";

function generateTableHead(table) {
  const thead = table.createTHead();
  const row = thead.insertRow();

  getData("/forecast").then((forecast) => {
    console.log(forecast);
  });
}

export default generateTableHead;
