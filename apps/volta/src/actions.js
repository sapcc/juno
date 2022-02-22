const ENDPOINT = "https://volta.qa-de-1.cloud.sap/api/v1"

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
    console.log("response.status < 400")
    return response
  } else {
    return response.text().then((message) => {
      var error = new Error(message || response.statusText || response.status)
      error.statusCode = response.status
      throw error
    })
  }
}

// https://volta.qa-de-1.cloud.sap/api/v1/${ca}/certificate
export const certificates = (bearerToken) => {
  return fetch(`${ENDPOINT}/galvani-pki/certificate`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer xxx", //eyJraWQiOiJmanpHcC12Tm5sdFNqb25yVW5rbnNPc082S1kiLCJhbGciOiJSUzI1NiJ9.eyJzdWIiOiJEMDYzMjIyIiwiYXVkIjoiYjNiNGUxOWMtODE1Zi00OGNiLWE5YWYtZDc4MzhhMGQ4NjE2IiwidXNlcl91dWlkIjoiNzlkNWIyNmYtYmRiNy00ZWY4LWE3YTUtZDMwNTFhM2NiNjQ0IiwibWFpbCI6ImEucmV1c2NoZW5iYWNoLnB1bmNlcm5hdUBzYXAuY29tIiwiaXNzIjoiaHR0cHM6XC9cL2FjY291bnRzNDAwLnNhcC5jb20iLCJsYXN0X25hbWUiOiJSZXVzY2hlbmJhY2ggUHVuY2VybmF1IiwiZXhwIjoxNjQ1NTM0MDMwLCJpYXQiOjE2NDU1MzA0MzAsIm5vbmNlIjoib3MzejFoaWZ4eWY4cjc1ejB5bGhjIiwiZmlyc3RfbmFtZSI6IkFydHVybyIsImp0aSI6ImQ4N2ZmZGU0LTNjZjEtNGRmOC1hMjNhLTNmYTRhZWU5MTBlNiJ9.cdoto_stso3nJ1bVbisOhoX_Dx-wgTF4QptMtsIacqhX5IqBs_w-lIAjK0wvbu9uBHyroYr8GeSzeAU4gOPj-QtSj5V0Zrz7CmcUvJbycvBGvGHOoTY-wlhAeTwX04lnwc8S377wlgjMezDigyJ72tZZrL3BkzcT82IowO13_nR5dgxS4WSErLqZN4GadDZQIajKLW06u9JDahpvopuXbnWvEveaupo8Hp3y2JGty-jxLUtGioNR8uT9KKDgSLqwtG4v_eD6teAISHQeiXl-4osVImt03Tx01n18MMzniMQvFdT6p0xGzlXBTdAb36rkmQoDNMiHRpMWRpW-lms1lQ
    },
  }).then(checkStatus)
}
