class HTTPError extends Error {
  constructor(code, message) {
    super(message || code)
    this.name = "HTTPError"
    this.statusCode = code
  }
}

export const encodeUrlParamsFromObject = (options) => {
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

//
// SERVICES
//

export const services = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  return fetchFromAPI(endpoint, "/services", options)
}

export const service = ({ queryKey }) => {
  const [_key, endpoint, serviceId] = queryKey
  return fetchFromAPI(endpoint, `/services/${serviceId}`)
}

export const serviceFilters = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  return fetchFromAPI(endpoint, "/services/filters", options)
}

//
// COMPONENTS
//

export const components = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  return fetchFromAPI(endpoint, "/components", options)
}

export const component = ({ queryKey }) => {
  const [_key, endpoint, componentId] = queryKey
  return fetchFromAPI(endpoint, `/components/${componentId}`)
}

export const componentFilters = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  return fetchFromAPI(endpoint, "/components/filters", options)
}

//
// VULNERABILITIES
//

export const vulnerabilities = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  return fetchFromAPI(endpoint, "/vulnerabilities", options)
}

export const vulnerabilityFilters = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  return fetchFromAPI(endpoint, "/vulnerabilities/filters", options)
}

//
// USERS
//

export const users = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  return fetchFromAPI(endpoint, "/users", options)
}

export const user = ({ queryKey }) => {
  const [_key, endpoint, userId] = queryKey
  return fetchFromAPI(endpoint, `/users/${userId}`)
}

export const userFilters = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  return fetchFromAPI(endpoint, "/users/filters", options)
}

//
// COMMONS
//

const fetchFromAPI = (endpoint, path, options) => {
  const query = encodeUrlParamsFromObject(options)
  return fetch(`${endpoint}${path}?${query}`, {
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
