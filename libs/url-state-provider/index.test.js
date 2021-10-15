/**
 * Since we are accessing the window object, we use jsdom,
 * which emulates the browser
 * @jest-environment jsdom
 */

var provider = require("./index")

describe("registerURLStateConsumer", () => {
  it("should be a function", () => {
    expect(typeof provider.registerConsumer === "function").toEqual(true)
  })

  describe("consumer", () => {
    var consumer = provider.registerConsumer("key1")

    it("should return an object", () => {
      expect(typeof consumer === "object").toEqual(true)
    })

    it("responds to currentState", () => {
      expect(typeof consumer.currentState === "function").toEqual(true)
    })

    it("responds to push", () => {
      expect(typeof consumer.push === "function").toEqual(true)
    })

    it("responds to replace", () => {
      expect(typeof consumer.replace === "function").toEqual(true)
    })

    it("responds to onChange", () => {
      expect(typeof consumer.onChange === "function").toEqual(true)
    })
  })
})
