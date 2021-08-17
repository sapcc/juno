const ENDPOINT = "https://whois-dev.global.cloud.sap/v1"

class HTTPError extends Error {
  constructor(code, message) {
    super(message || code)
    this.name = "HTTPError"
    this.statusCode = code
  }
}

const encodeUrlParamsFromObject = (options) => {
  if (!options) return ""
  let encodedOptions = Object.keys(options).map(k => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`).join('&')
  return `&${encodedOptions}`
}

// Check response status
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    return response.text().then((message) => {
      var error = new HTTPError(response.status, message || response.statusText)
      error.statusCode = response.status
      // throw error
      return Promise.reject(error)
    })
  }
}

export const search = (input, options) => {
  return fetch(`${ENDPOINT}/query?input=${input}${encodeUrlParamsFromObject(options)}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkStatus)
}
