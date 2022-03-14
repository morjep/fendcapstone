import handleSubmit from "./js/formhandler";

import "./styles/styles.scss";

const submitButton = document.getElementById("nameSubmit");
submitButton.addEventListener("click", (event) => {
  console.log("Button clicked");
  handleSubmit(event);
});

export { handleSubmit };
