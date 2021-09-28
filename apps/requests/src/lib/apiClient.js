import React from "react"

const parseFields = (fields) => {
  if (!fields) return result

  if (Array.isArray(fields)) return ` { ${fields.join(" ")} } `

  if (typeof fields === "object") {
    let result = ""
    Object.keys(fields).forEach((key) => {
      result += ` { ${key} ${parseFields(fields[key])} } `
    })
    return result
  }
}

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
    options.fields = options.fields || { items: ["id"] }
    let fields = parseFields(options.fields)
    console.log("===================FIELDS", fields)
    return this.request({
      operationName: "listRequests",
      // variables: {},
      query: `query listRequests { requests ${fields} }`,
    })
  }
}

export default Client
