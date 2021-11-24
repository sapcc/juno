const parseParams = (params) => {
  if (!params) return ""
  const paramsString = Object.keys(params)
    .map((key) => `${key}: ${JSON.stringify(params[key])}`)
    .join(", ")

  return `( ${paramsString} )`
}

const catchErrors = (response) => {
  if (response.status < 400) {
    return response
  } else {
    return response.text().then((message) => {
      var error = new Error(message || response.statusText || response.status)
      error.statusCode = response.status
      // throw error
      throw error
    })
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

  graphqlRequest(body, options) {
    body = body || {}
    options = options || {}
    const requestOptions = Object.assign({}, this.defaultOptions, options)
    body = JSON.stringify(body)

    return fetch(`${this.endpoint}/graphql`, {
      ...requestOptions,
      method: "POST",
      body, //: JSON.stringify(body),
    })
      .then(catchErrors)
      .then((response) => response.json())
  }

  listRequests(options) {
    options = options || {}
    let fields = options.fields || "items {id} "
    let filter = parseParams(options.filter)

    return this.graphqlRequest({
      operationName: "listRequests",
      // variables: {},
      query: `query listRequests { requests${filter} { ${fields} } }`,
    })
  }

  createRequest(params, options) {
    options = options || {}
    params = parseParams(params)
    let fields = options.fields || "id"

    return this.graphqlRequest({
      operationName: "createRequest",
      // variables: {},
      query: `mutation createRequest { createRequest${params} { ${fields} } }`,
    })
  }

  listProcessingSteps(requestID, options) {
    options = options || {}
    let fields = options.fields || "items {id} "
    let filter = parseParams({ requestID, ...options.filter })

    return this.graphqlRequest({
      operationName: "listProcessingSteps",
      // variables: {},
      query: `query listProcessingSteps { processingSteps${filter} { ${fields} } }`,
    })
  }

  getPolicyRules() {
    return fetch(`${this.endpoint}/policy`, {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(catchErrors)
      .then((response) => response.json())
  }

  /************* STEP ACTIONS ********************/
  listProcessingSteps(requestID, options) {
    options = options || {}
    let fields = options.fields || "items {id} "
    let filter = parseParams({ requestID, ...options.filter })

    return this.graphqlRequest({
      operationName: "listProcessingSteps",
      // variables: {},
      query: `query listProcessingSteps { processingSteps${filter} { ${fields} } }`,
    })
  }

  createRequestStep(actionName, requestID, params, options) {
    options = options || {}
    let fields = options.fields || "id"
    params = parseParams({ requestID, ...params })

    return this.graphqlRequest({
      operationName: "createStep",
      // variables: {},
      query: `mutation createStep { ${actionName}${params} { ${fields} } }`,
    })
  }

  startProcessing(requestID, params, options) {
    return this.createRequestStep("startProcessing", requestID, params, options)
  }

  addNote(requestID, params, options) {
    return this.createRequestStep("addNote", requestID, params, options)
  }

  process(requestID, params, options) {
    return this.createRequestStep("process", requestID, params, options)
  }

  askRequester(requestID, params, options) {
    return this.createRequestStep("askRequester", requestID, params, options)
  }

  answer(requestID, params, options) {
    return this.createRequestStep("answer", requestID, params, options)
  }
  approve(requestID, params, options) {
    return this.createRequestStep("approve", requestID, params, options)
  }
  reject(requestID, params, options) {
    return this.createRequestStep("reject", requestID, params, options)
  }
  close(requestID, params, options) {
    return this.createRequestStep("close", requestID, params, options)
  }
  reopen(requestID, params, options) {
    return this.createRequestStep("reopen", requestID, params, options)
  }
}

export default Client
