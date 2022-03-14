const serverUrl = "http://localhost:8081";

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  /* The try...catch block is used to catch any errors that may occur while parsing
    the JSON data. */
  try {
    const apiData = await response.json();
    return apiData;
  } catch (error) {
    console.log("error", error);
  }
};

function handleSubmit(event) {
  event.preventDefault();

  /* Getting the value of the input field with the id of `name` */
  const formText = document.getElementById("name").value;

  const json = {
    name: formText,
  };

  /* Sending a POST request to the server with the text that the user entered. */
  postData(`${serverUrl}/name`, json).then((res) => {
    document.getElementById("serverresponse").innerHTML = res.message;
  });
}

export default handleSubmit;
