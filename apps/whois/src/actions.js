const ENDPOINT = "https://whois-dev.global.cloud.sap/v1"

// Check response status
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    return response.text().then((message) => {
      var error = new Error(message || response.statusText || response.status)
      error.statusCode = response.status
      // throw error
      return Promise.reject(error)
    })
  }
}

export const search = (input) => {
  return fetch(`${ENDPOINT}/query?input=${input}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkStatus)
    .then((response) => response.json())
}
