// const warn = jest.spyOn(global.console, "warn")
global.console.warn = jest.fn()
// global.console.log = jest.fn((t) => console.log("===", t))
global.console.error = jest.fn()

globalThis.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
)

const script = document.createElement("script")
script.setAttribute("data-url", "https://localhost")
script.src = "https://test.com"

delete document.currentScript
Object.defineProperty(document, "currentScript", {
  value: script,
})

require("./index.js")

describe("window.__junoWidgetLoader", () => {
  test("window.__junoWidgetLoader is defined", async () => {
    expect(window.__junoWidgetLoader).toBeDefined()
  })
})
