import { getData } from "./data_util";

function addPicture(elem) {
  getData("/picture").then((res) => {
    const img = document.createElement("img");
    img.src = res.url;
    img.tag = res.tag;
    elem.appendChild(img);
  });
}

export default addPicture;
