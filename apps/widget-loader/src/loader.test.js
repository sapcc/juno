const loader = require("./loader")

describe("load", () => {
  test("loader is defined", () => {
    expect(loader).toBeDefined()
  })

  test("loader.load is defined", () => {
    expect(loader.load).toBeDefined()
  })

  describe("add widget script tag", () => {
    let currentScript
    beforeEach(() => {
      jest.clearAllMocks()
      document.getElementsByTagName("html")[0].innerHTML = ""
      currentScript = document.createElement("script")
      currentScript.defer = true
      currentScript.src = "/app.js"
      currentScript.setAttribute("data-url", "/auth/0_0_1/remoteEntry.js")
      currentScript.setAttribute("data-name", "auth/widget")
      document.body.appendChild(currentScript)
    })

    test("wrapper has been called", () => {
      const spy = jest.spyOn(document, "createElement")
      loader.load(currentScript)
      expect(spy).toHaveBeenCalledWith("div")
    })

    test("document contains added widget script", () => {
      const scripts = document.getElementsByTagName("script")
      let script
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === "http://localhost/app.js") script = scripts[i]
      }
      expect(script).toBeDefined()
    })

    test("widget script was replaced with wrapper", () => {
      loader.load(currentScript)
      const scripts = document.getElementsByTagName("script")
      let script
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === "http://localhost/app.js") script = scripts[i]
      }
      expect(script).not.toBeDefined()
    })

    test("app script was added", () => {
      loader.load(currentScript)
      const scripts = document.getElementsByTagName("script")
      let script
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === "http://localhost/auth/0_0_1/remoteEntry.js")
          script = scripts[i]
      }
      expect(script).toBeDefined()
    })
  })
})
