import { postData, serverLog } from "./data_util";

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

const submitButton = document.getElementById("destSubmit");
submitButton.addEventListener("click", (event) => {
  serverLog("Submit-button clicked");
  handleSubmit(event);
});

export default handleSubmit;
