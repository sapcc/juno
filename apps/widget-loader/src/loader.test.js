const loader = require("./loader")

describe("load", () => {
  test("loader is defined", () => {
    expect(loader).toBeDefined()
  })

  test("loader.load is defined", () => {
    expect(loader.load).toBeDefined()
  })

  test("document.getElementsByTagName has been called", () => {
    const spy = jest.spyOn(document, "getElementsByTagName")
    loader.load()
    expect(spy).toHaveBeenCalledWith("script")
  })

  describe("add widget script tag", () => {
    beforeEach(() => {
      jest.clearAllMocks()
      document.getElementsByTagName("html")[0].innerHTML = ""
      const script = document.createElement("script")
      script.defer = true
      script.src = "/app.js"
      script.setAttribute("data-url", "/cdn/auth/0_0_1/remoteEntry.js")
      script.setAttribute("data-name", "auth/widget")
      document.body.appendChild(script)
    })

    test("document.getElementsByTagName has been called", () => {
      const spy = jest.spyOn(document, "getElementsByTagName")
      loader.load()
      expect(spy).toHaveBeenCalledWith("script")
    })

    test("wrapper has been called", () => {
      const spy = jest.spyOn(document, "createElement")
      loader.load()
      expect(spy).toHaveBeenCalledWith("div")
    })

    test("document contains added widget script", () => {
      const scripts = document.getElementsByTagName("script")
      let currentScript
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === "http://localhost/app.js")
          currentScript = scripts[i]
      }
      expect(currentScript).toBeDefined()
    })

    test("widget script was replaced with wrapper", () => {
      loader.load()
      const scripts = document.getElementsByTagName("script")
      let currentScript
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === "http://localhost/app.js")
          currentScript = scripts[i]
      }
      expect(currentScript).not.toBeDefined()
    })

    test("app script was added", () => {
      loader.load()
      const scripts = document.getElementsByTagName("script")
      let currentScript
      for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src === "http://localhost/cdn/auth/0_0_1/remoteEntry.js")
          currentScript = scripts[i]
      }
      expect(currentScript).toBeDefined()
    })
  })
})
