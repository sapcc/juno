import "./index.js"

const script = document.createElement("script")
script.setAttribute("data-url", "https://localhost")
script.src = "https://test.com"

delete document.currentScript
Object.defineProperty(document, "currentScript", {
  value: script,
})
// const warn = jest.spyOn(global.console, "warn")
global.console.warn = jest.fn()

describe("window.__junoWidgetLoader", () => {
  test("window.__junoWidgetLoader is defined", async () => {
    expect(window.__junoWidgetLoader).toBeDefined()
    expect(console.warn).toHaveBeenCalledWith(
      expect.stringContaining("Cannot find module 'https://localhost")
    )
  })
})
