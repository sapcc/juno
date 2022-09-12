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

export const objectToURLParams = (options) => {
  let params = []
  if (options && typeof options === "object") {
    Object.keys(options).forEach((key) => {
      params.push(`${key}=${options[key]}`)
    })
  }
  return params.join("&")
}

export const services = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  // convert the options to params URL
  const query = objectToURLParams(options)
  return fetch(`${endpoint}/services?${query}`, {
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

export const service = ({ queryKey }) => {
  const [_key, endpoint, serviceId] = queryKey
  return fetch(`${endpoint}/services/${serviceId}`, {
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

export const components = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  // collect the options in query params format
  const query = objectToURLParams(options)
  return fetch(`${endpoint}/components?${query}`, {
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

export const component = ({ queryKey }) => {
  const [_key, endpoint, componentId] = queryKey
  return fetch(`${endpoint}/components/${componentId}`, {
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

export const vulnerabilities = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  // collect the options in query params format
  const query = objectToURLParams(options)
  return fetch(`${endpoint}/vulnerabilities?${query}`, {
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
