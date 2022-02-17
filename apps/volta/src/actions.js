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
        "Bearer eyJraWQiOiJmanpHcC12Tm5sdFNqb25yVW5rbnNPc082S1kiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJEMDYzMjIyIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm1haWwiOiJhLnJldXNjaGVuYmFjaC5wdW5jZXJuYXVAc2FwLmNvbSIsImlzcyI6Imh0dHBzOlwvXC9hY2NvdW50czQwMC5zYXAuY29tIiwibGFzdF9uYW1lIjoiUmV1c2NoZW5iYWNoIFB1bmNlcm5hdSIsImdpdmVuX25hbWUiOiJBcnR1cm8iLCJhdWQiOiJiM2I0ZTE5Yy04MTVmLTQ4Y2ItYTlhZi1kNzgzOGEwZDg2MTYiLCJ1c2VyX3V1aWQiOiI3OWQ1YjI2Zi1iZGI3LTRlZjgtYTdhNS1kMzA1MWEzY2I2NDQiLCJuYW1lIjoiYXJ0dXJvLnJldXNjaGVuYmFjaHB1bmNlcm5hdTIiLCJleHAiOjE2NDUwMTM5ODQsImlhdCI6MTY0NTAxMDM4NCwiZmlyc3RfbmFtZSI6IkFydHVybyIsImZhbWlseV9uYW1lIjoiUmV1c2NoZW5iYWNoIFB1bmNlcm5hdSIsImp0aSI6IjIxZTJkNjFjLWM2NTEtNDcyZC1hNzlkLTYwNDg1YjM3MThjMCIsImVtYWlsIjoiYS5yZXVzY2hlbmJhY2gucHVuY2VybmF1QHNhcC5jb20ifQ.eZBguIJqiw3LqhTGhlj3jlN0AildaQjpf77fMMfgpdoX5qAJ5XBS7z0nnPMEBuazR28Vl23_y_3ziO0DSCHVdBYfFbfB_P2mPFtnSzL2YvN-977kxfu352KQwQi2--W3lrHDpi-rSszgONkFKZ3TCTrS7fQ28VgTX0-Uj03uz4MAJEbirDrOHpygCM_MyHnoOcEOn66_P45zF-_bprrRWpd8FjtFuYPA2LnKrcG_MuzncvB8TgmP6fkkruxvrYtiAR27g92bkqzyNzObquC7oHdoJiN4gnYNFGSrHUixjK2CS2o3kFQlB-K-YP7hJptIhfaVdndh0rsHW_KGgcyMAg",
    },
  }).then((res) => {
    console.log("res: ", res)
    return res
  })
}

export const kubernikus = () => {
  return fetch(`https://kubernikus.eu-de-1.cloud.sap/api/v1/clusters`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token":
        "gAAAAABiDM2cW68M4D4dlD8Z5kjlLF_fyiHdnPrDKSfjR3VPStdVkV9gz_eGMTIw8FIZb4A7U_aorgdPnFeexepVU8nCEcHwkQSuh64OdeiqJzefUMi-I22w8GT1fMDW7a4lVAhA5jr_DgxrH8qvBtwWcgScqUE2hkChuIi47VA7I0QCO7av66Zvqd2CCYCw6TTcXkd_sU8EGKocyX5JwfcZRiBRH8v90uONtDCBhDHCi0EIWMSVsusngJAfUAuvFAj_s8sG-RLs",
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
