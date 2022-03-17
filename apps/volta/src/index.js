Promise.all([import("./bootstrap")]).then(([app]) =>
  app.init(document.getElementById("root"), {
    issuerURL: process.env.OIDC_ISSUER_URL,
    clientID: process.env.OIDC_CLIENTID,
  })
)
