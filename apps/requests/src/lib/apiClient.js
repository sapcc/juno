class Client {
  constructor(endpoint, authToken, region) {
    this.endpoint = endpoint
    this.authToken = authToken
    this.region = region
    this.defaultOptions = {
      method: "GET",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        "X-Auth-Token": authToken,
        "X-Auth-Region": region,
      },
    }
  }

  request(body, options) {
    body = body || {}
    options = options || {}
    const requestOptions = Object.assign({}, this.defaultOptions, options)
    body = JSON.stringify(body)

    return fetch(this.endpoint, {
      ...requestOptions,
      method: "POST",
      body, //: JSON.stringify(body),
    })
      .then((response) => {
        if (response.status < 400) {
          return response
        } else {
          return response.text().then((message) => {
            var error = new Error(
              message || response.statusText || response.status
            )
            error.statusCode = response.status
            // throw error
            throw error
          })
        }
      })
      .then((response) => response.json())
  }

  listRequests(options) {
    options = options || {}
    let fields = options.fields || "items {id} "

    return this.request({
      operationName: "listRequests",
      // variables: {},
      query: `query listRequests { requests { ${fields} } }`,
    })
  }

  createRequest(params, options) {
    options = options || {}
    params = params || {}
    params = Object.keys(params)
      .map((key) => `${key}: ${JSON.stringify(params[key])}`)
      .join(", ")
    let fields = options.fields || "id"

    return this.request({
      operationName: "createRequest",
      // variables: {},
      query: `mutation createRequest { createRequest(${params}) { ${fields} } }`,
    })
  }
}

export default Client
