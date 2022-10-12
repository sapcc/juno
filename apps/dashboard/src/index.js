Promise.all([import("./bootstrap")]).then(([app]) =>
  app.init(document.getElementById("root"), {
    region: process.env.PRESELECTED_REGION,
    domain: process.env.PRESELECTED_DOMAIN,
    prodmode: process.env.PROD_MODE
  })
)
