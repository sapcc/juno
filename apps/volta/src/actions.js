import { DateTime } from "luxon"

class HTTPError extends Error {
  constructor(code, message) {
    super(message || code)
    this.name = "HTTPError"
    this.statusCode = code
  }
}

const encodeUrlParamsFromObject = (options) => {
  if (!options) return ""
  let encodedOptions = Object.keys(options)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(options[k])}`)
    .join("&")
  return `&${encodedOptions}`
}

const checkStatus = (response) => {
  if (response.status < 400) {
    return response
  } else {
    return response.text().then((message) => {
      var error = new HTTPError(response.status, message || response.statusText)
      error.statusCode = response.status
      return Promise.reject(error)
    })
  }
}

export const cas = ({ queryKey }) => {
  const [_key, bearerToken, endpoint] = queryKey
  return fetch(`${endpoint}/cas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then(checkStatus)
    .then((response) => {
      return response.json().then((jsonResp) => {
        if (!jsonResp || !Array.isArray(jsonResp)) return []
        // sort entries by name
        return jsonResp.sort((a, b) => a?.name.localeCompare(b?.name))
      })
    })
}

export const certificates = ({ queryKey }) => {
  const [_key, bearerToken, endpoint, ca] = queryKey
  return fetch(`${endpoint}/${ca}/certificate`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  })
    .then(checkStatus)
    .then((response) => {
      return response.json().then((jsonResp) => {
        if (!jsonResp || !Array.isArray(jsonResp)) return []
        // sort entries by expiration date
        return jsonResp
          .sort(
            (a, b) =>
              DateTime.fromISO(a?.not_after).toMillis() -
              DateTime.fromISO(b?.not_after).toMillis()
          )
          .reverse()
      })
    })
}

export const createCertificate = (endpoint, ca, bearerToken, formState) => {
  // Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
  const sendBody = JSON.stringify(formState)
  return fetch(`${endpoint}/${ca}/certificate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
    body: sendBody,
  })
    .then(checkStatus)
    .then((response) => {
      return response.json()
    })
}

export const revokeCertificate = (endpoint, ca, bearerToken, serial) => {
  return fetch(`${endpoint}/${ca}/certificate/${serial}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  }).then(checkStatus)
}
