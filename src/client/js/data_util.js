const serverUrl = "http://localhost:8081";

const serverData = async (url = "", options = {}) => {
  const srvUrl = serverUrl + url;
  const response = await fetch(srvUrl, options);

  try {
    const srvData = await response.json();
    return srvData;
  } catch (error) {
    console.error("error", error);
    return false;
  }
};

export const getData = (url = "") => {
  const options = {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  };
  const srvData = serverData(url, options);
  return srvData;
};

export const postData = async (url = "", data = {}) => {
  const options = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  const srvData = serverData(url, options);
  return srvData;
};

export const serverLog = async (data = {}) => {
  const logData = {
    log: data,
  };
  const options = {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logData), // body data type must match "Content-Type" header
  };
  const srvData = serverData("/log", options);
  return srvData;
};

// module.exports = postData;
