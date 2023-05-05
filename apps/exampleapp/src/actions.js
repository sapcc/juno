const ENDPOINT = "https://endpoint-url-here.com"

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

// Check response status
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

// Example fetch call. Adjust as needed for your API
export const fetchPeaks = ({ queryKey }) => {
  const [_key, endpoint, options] = queryKey
  const query = encodeUrlParamsFromObject(options)
  return Promise.resolve([
    {
      id: 1,
      name: "Ushba",
      height: "4737m",
      region: "Svanetsia",
      mainrange: "Caucasus",
      countries: "Georgia",
      url: "https://en.wikipedia.org/wiki/Ushba",
    },
    {
      id: 2,
      name: "Ama Dablam",
      height: "6814m",
      region: "Khumbu",
      mainrange: "Himalayas",
      countries: "Nepal",
      url: "https://en.wikipedia.org/wiki/Ama_Dablam",
    },
    {
      id: 3,
      name: "Lhotse",
      height: "8516m",
      region: "Khumbu",
      mainrange: "Himalayas",
      countries: "China, Nepal",
      url: "https://en.wikipedia.org/wiki/Lhotse",
    },
    {
      id: 4,
      name: "Nuptse",
      height: "7861m",
      region: "Khumbu",
      mainrange: "Himalayas",
      countries: "Nepal",
      url: "https://en.wikipedia.org/wiki/Nuptse",
    },
    {
      id: 5,
      name: "Weisshorn",
      height: "4506m",
      region: "Valais",
      mainrange: "Swiss Alps",
      countries: "Switzerland",
      url: "https://en.wikipedia.org/wiki/Weisshorn",
    },
    {
      id: 6,
      name: "Zinalrothorn",
      height: "4221m",
      region: "Valais",
      mainrange: "Swiss Alps",
      countries: "Switzerland",
      url: "https://en.wikipedia.org/wiki/Zinalrothorn",
    },
  ])
}

export const fetchPeak = ({ queryKey }) => {
  const [_key, endpoint, id] = queryKey
  return fetch(`${endpoint}/peaks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then(checkStatus)
    .then((response) => {
      return response.json()
    })
}

export const createPeak = (endpoint, formState) => {
  // Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
  const sendBody = JSON.stringify(formState)
  return fetch(`${endpoint}/peaks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: sendBody,
  })
    .then(checkStatus)
    .then((response) => {
      return response.json()
    })
}

export const updatePeak = (endpoint, id, formState) => {
  // Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
  const sendBody = JSON.stringify(formState)
  return fetch(`${endpoint}/peaks/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: sendBody,
  })
    .then(checkStatus)
    .then((response) => {
      return response.json()
    })
}

export const deletePeak = (endpoint, id) => {
  return fetch(`${endpoint}/peaks/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  })
    .then(checkStatus)
    .then((response) => {
      return response.json()
    })
}
