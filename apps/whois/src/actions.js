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

export const searchByIPs = (ips) => {
  if (!Array.isArray(ips)) ips = [ips]
  let query = ips.length === 1 ? `ip=${ips[0]}` : `ips=${ips.join("&ips=")}`
  return fetch(`https://whois-dev.global.cloud.sap/v1/query?${query}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkStatus)
    .then((response) => response.json())
}

export const searchByCIDR = (cidr) => {
  return fetch(`https://whois-dev.global.cloud.sap/v1/query?cidr=${cidr}`, {
    method: "GET",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(checkStatus)
    .then((response) => response.json())
}
