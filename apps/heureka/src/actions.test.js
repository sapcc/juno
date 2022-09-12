import { objectToURLParams } from "./actions"

describe("Actions", () => {
  describe("objectToURLParams", () => {
    test("return empty string if no object given", () => {
      expect(objectToURLParams()).toEqual("")
    })
    test("return url params when object given", () => {
      expect(objectToURLParams({ limit: 10, offset: 0 })).toEqual(
        "limit=10&offset=0"
      )
    })
  })
})
