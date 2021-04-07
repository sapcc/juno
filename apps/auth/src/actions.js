// Check response status
const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText || response.status)
    error.response = response
    throw error
  }
}

const identityEndpoint = (region) =>
  `https://identity-3.${region}.cloud.sap/v3/auth/tokens`

export const loginWithPassword = ({ region, domain, user, password }) =>
  fetch(identityEndpoint(region), {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth: {
        identity: {
          methods: ["password"],
          password: {
            user: {
              name: user,
              domain: {
                name: domain,
              },
              password: password,
            },
          },
        },
      },
    }),
  })
    .then(checkStatus)
    .then((response) => {
      const authToken = response.headers.get("x-subject-token")
      return Promise.all([authToken, response.json()])
    })

export const loginWithSSO = ({ region, domain }) =>
  fetch(identityEndpoint(region), {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      "X-User-Domain-Name": domain,
    },
    body: JSON.stringify({
      auth: {
        identity: {
          methods: ["external"],
          external: {},
        },
      },
    }),
  })
    .then(checkStatus)
    .then((response) => {
      const authToken = response.headers.get("x-subject-token")
      return Promise.all([authToken, response.json()])
    })

export const rescopeToken = ({ token, scope }) =>
  fetch(identityEndpoint(region), {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      auth: {
        identity: {
          methods: ["token"],
          token: {
            id: token,
          },
        },
        scope,
      },
    }),
  })
    .then(checkStatus)
    .then((response) => {
      const authToken = response.headers.get("x-subject-token")
      return Promise.all([authToken, response.json()])
    })
