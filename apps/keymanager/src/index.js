Promise.all([import("./DevEnv"), import("./bootstrap")]).then(
  ([{ registerAuthListener }, app]) => {
    registerAuthListener(({ token, authToken }) => {
      app.init(document.getElementById("root"), {
        endpoint: process.env.ENDPOINT,
        theme: process.env.THEME,
        embedded: process.env.EMBEDDED,
        authToken,
      })
    })
  }
)
