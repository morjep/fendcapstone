import { postData, serverLog } from "./data_util";

function handleSubmit(event) {
  event.preventDefault();

  /* Getting the value of the input field with the id of `name` */
  const formText = document.getElementById("name").value;

  const json = {
    name: formText,
  };

  postData("/name", json).then((res) => {
    document.getElementById("serverresponse").innerHTML = res.message;
  });
}

const submitButton = document.getElementById("nameSubmit");
submitButton.addEventListener("click", (event) => {
  serverLog("Submit-button clicked");
  handleSubmit(event);
});

export default handleSubmit;
