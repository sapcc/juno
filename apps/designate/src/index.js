Promise.all([import("./bootstrap"), import("./DevEnv")]).then(([app]) =>
  app.init(document.getElementById("root"))
)
