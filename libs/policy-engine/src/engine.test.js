const PolicyEngine = require("./engine")

describe("policy engine", () => {
  it("requires a paramater", () => {
    expect(() => {
      new PolicyEngine()
    }).toThrowError()
  })

  it("ensures the parameter is a json", () => {
    expect(() => {
      new PolicyEngine("NOT_A_JSON")
    }).toThrowError()
  })
})
