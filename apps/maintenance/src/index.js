Promise.all([import("./bootstrap")]).then(([app]) =>
  app.init(document.getElementById("root"), {
    service: process.env.SERVICE_NAME,
  })
)
