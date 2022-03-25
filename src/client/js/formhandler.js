import { postData } from "./data_util";

function handleSubmit(event) {
  event.preventDefault();

  /* Getting the value of the input field with the id of `name` */
  const formText = document.getElementById("city").value;

  const json = {
    city: formText,
  };

  postData("/city", json).then((res) => {
    document.getElementById("serverresponse").innerHTML = res.message;
  });
}

export default handleSubmit;
