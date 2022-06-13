Promise.all([import("./bootstrap"), import("./DevEnv")]).then(([app]) =>
  app.init(document.getElementById("root"), {
    endpoint: process.env.ENDPOINT,
    theme: process.env.THEME,
  })
)
