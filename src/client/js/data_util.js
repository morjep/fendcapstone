const serverData = async (url = "", options = {}) => {
  const response = await fetch(url, options);

  try {
    const srvData = await response.json();
    return srvData;
  } catch (error) {
    console.log("error", error);
    return false;
  }
};

const postData = async (url = "", data = {}) => {
  const options = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  };
  const srvData = serverData(url, options, data);
  return srvData;
};

module.exports = postData;
