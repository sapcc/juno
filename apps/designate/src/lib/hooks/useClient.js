import React from "react"

class Client {
  constructor(endpoint, authToken) {
    this.endpoint = endpoint
    this.authToken = authToken
    this.defaultParams = {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        "X-Auth-Token": authToken,
      },
    }
  }

  request(path, options = {}) {
    const params = Object.assign({}, this.defaultOptions, options)
    if (params.body) params.body = JSON.stringify(params.body)

    return fetch(`${this.endpoint}${path}`, params)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          return response
        } else {
          return response.text().then((message) => {
            var error = new Error(
              message || response.statusText || response.status
            )
            error.statusCode = response.status
            // throw error
            return Promise.reject(error)
          })
        }
      })
      .then((response) => response.json())
  }

  getZones(options) {
    return this.request("/v2/zones", { options, method: "GET" })
  }
}

export const useClient = (endpoint, authToken) => {
  return React.useMemo(() => {
    if (!endpoint || !authToken) return null
    return new Client(endpoint, authToken)
  }, [endpoint, authToken])
}
