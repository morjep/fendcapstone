import { getData } from "./data_util";

function addPicture(element) {
  getData("/picture").then((res) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = res.url;
    img.tag = res.tag;
    div.appendChild(img);
    element.appendChild(div);
  });
}

export default addPicture;
