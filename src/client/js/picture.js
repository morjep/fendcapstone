import { getData } from "./data_util";

/**
 * `addPicture` takes a DOM element as
 * an argument and appends a div to it. The div contains an image with the `src`
 * property set to the `url` property of the JSON object returned by `getData`
 * @param element - The element to add the picture to.
 */
const addPicture = (element) => {
  getData("/picture").then((res) => {
    const div = document.createElement("div");
    const img = document.createElement("img");
    img.src = res.url;
    img.tag = res.tag;
    div.appendChild(img);
    element.appendChild(div);
  });
};

export default addPicture;
