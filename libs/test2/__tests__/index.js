const test2 = require("../src/index")

describe("test2", () => {
  let library

  beforeEach(() => {
    // Initialize the library or create a new instance for each test
    library = new test2()
  })

  describe("sampleMethod", () => {
    it("should return a concatenated string", () => {
      const result = library.sampleMethod("Hello", 42)
      expect(result).toBe("Hello 42")
    })
  })

  describe("anotherMethod", () => {
    it("should return an object with the provided data", () => {
      const data = "Test Data"
      const result = library.anotherMethod(data)
      expect(result).toEqual({ result: data })
    })
  })
})
