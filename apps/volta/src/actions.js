const ENDPOINT = "https://volta.qa-de-1.cloud.sap/api/v1"
const TEST_ENDPOINT = "https://api.github.com/repos/tannerlinsley/react-query"

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

// Example fetch call. Adjust as needed for your API
export const exampleFetch = () => {
  return fetch(`${TEST_ENDPOINT}`, {
    method: "GET",
    credentials: "same-origin",
  }).then((data) => {
    return data.json()
  })
}

// https://volta.qa-de-1.cloud.sap/api/v1/${ca}/certificate
export const certificates = () => {
  return fetch(`${ENDPOINT}/galvani-pki/certificate`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJraWQiOiJmanpHcC12Tm5sdFNqb25yVW5rbnNPc082S1kiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJEMDYzMjIyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm1haWwiOiJhLnJldXNjaGVuYmFjaC5wdW5jZXJuYXVAc2FwLmNvbSIsImlzcyI6Imh0dHBzOlwvXC9hY2NvdW50czQwMC5zYXAuY29tIiwibGFzdF9uYW1lIjoiUmV1c2NoZW5iYWNoIFB1bmNlcm5hdSIsImdpdmVuX25hbWUiOiJBcnR1cm8iLCJhdWQiOiJiM2I0ZTE5Yy04MTVmLTQ4Y2ItYTlhZi1kNzgzOGEwZDg2MTYiLCJ1c2VyX3V1aWQiOiI3OWQ1YjI2Zi1iZGI3LTRlZjgtYTdhNS1kMzA1MWEzY2I2NDQiLCJuYW1lIjoiYXJ0dXJvLnJldXNjaGVuYmFjaHB1bmNlcm5hdTIiLCJleHAiOjE2NDQ5MzExMjUsImlhdCI6MTY0NDkyNzUyNSwiZmlyc3RfbmFtZSI6IkFydHVybyIsImZhbWlseV9uYW1lIjoiUmV1c2NoZW5iYWNoIFB1bmNlcm5hdSIsImp0aSI6ImRkYTRiZjBhLWM1OWEtNDMxZi1hYmM5LTkxNWRlMjM5OGQ1MCIsImVtYWlsIjoiYS5yZXVzY2hlbmJhY2gucHVuY2VybmF1QHNhcC5jb20ifQ.eF-OArV5IXAdvUOBAwreeoXaEnN_5nSMWd3sFiAb859rNEj_OolFTXjEqIYY395e8Tfn1W6cZ-o0q-hb3oWaab61SAlUJWwA0OUewaqR5QY_eiFZJmUWKDk99IxLX059SG4w0yVQAcD9uBAGSXAE6-JfuDP1iBsUoFxUvbJ4cPS78Pj1Rq8RORr5XqCiW8J8lPq8EjPJJdYUf3gqp9yMJK0J0KTJHnoycgvJIRgKgE9F51doXzAKSEKecHSaPK_lSWGLtEw3io3emwhoSIfXOJ13dZxMCNpc8f6IIXTrxgjeQ9BeL4thnRVuxrDsQsMB74HgIQ24TBeveOZM-u9FUQ",
    },
  }).then((res) => {
    console.log("res.json(): ", res.json())
    return res.json()
  })
}

export const hermes = () => {
  return fetch(
    `https://hermes.eu-de-1.cloud.sap/v1/events?limit=30&offset=0&time=`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token":
          "gAAAAABiDM2cW68M4D4dlD8Z5kjlLF_fyiHdnPrDKSfjR3VPStdVkV9gz_eGMTIw8FIZb4A7U_aorgdPnFeexepVU8nCEcHwkQSuh64OdeiqJzefUMi-I22w8GT1fMDW7a4lVAhA5jr_DgxrH8qvBtwWcgScqUE2hkChuIi47VA7I0QCO7av66Zvqd2CCYCw6TTcXkd_sU8EGKocyX5JwfcZRiBRH8v90uONtDCBhDHCi0EIWMSVsusngJAfUAuvFAj_s8sG-RLs",
      },
    }
  ).then((res) => {
    console.log("res.json(): ", res.json())
    return res.json()
  })
}
