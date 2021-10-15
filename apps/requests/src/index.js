Promise.all([import("./bootstrap"), import("./DevEnv")]).then(([app]) => {
  app.init(document.getElementById("root"), { stateID: "requests1" })
  // app.init(document.getElementById("root2"), { stateID: "requests2" })
})
