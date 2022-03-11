import { isExpired } from "./helpers"

describe("Helpers", () => {
  describe("isExpired", () => {
    test("instance of Date required", () => {
      expect(() => {
        isExpired("December 17, 1995 03:24:00")
      }).toThrow()
      expect(() => {
        isExpired()
      }).toThrow()
    })
    test("date not expired", () => {
      // set 1 hour ago
      const d = new Date()
      d.setHours(d.getHours() - 1)
      expect(isExpired(d)).toBeTruthy()
    })
    test("date is expired", () => {
      // set 1 hour ago
      const d = new Date()
      d.setHours(d.getHours() + 1)
      expect(isExpired(d)).not.toBeTruthy()
    })
  })
})
