Promise.all([import("./bootstrap"), import("./DevEnv")]).then(([app]) =>
  app.init(document.getElementById("root"), {
    endpoint: "identity-3.qa-de-1.cloud.sap", //"identity-3-qa.global.cloud.sap",
  })
)
