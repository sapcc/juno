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
      var error = new Error(message || response.statusText || response.status)
      error.statusCode = response.status
      throw error
    })
  }
}

export const services = ({ queryKey }) => {
  const [_key, endpoint, limit, offset] = queryKey
  return fetch(`${endpoint}/services?limit=${limit}&offset=${offset}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkStatus)
    .then((response) => {
      return response.json()
    })
}
