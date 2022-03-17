Promise.all([import("./bootstrap")]).then(([app]) =>
  app.init(document.getElementById("root"), {
    issuerurl: process.env.OIDC_ISSUER_URL,
    clientid: process.env.OIDC_CLIENTID,
  })
)
