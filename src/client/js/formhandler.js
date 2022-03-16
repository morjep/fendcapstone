import postData from "./data_util";

const serverUrl = "http://localhost:8081";

function handleSubmit(event) {
  event.preventDefault();

  /* Getting the value of the input field with the id of `name` */
  const formText = document.getElementById("name").value;

  const json = {
    name: formText,
  };

  postData(`${serverUrl}/name`, json).then((res) => {
    document.getElementById("serverresponse").innerHTML = res.message;
  });
}

const submitButton = document.getElementById("nameSubmit");
submitButton.addEventListener("click", (event) => {
  console.log("Submit clicked");
  handleSubmit(event);
});

export default handleSubmit;
