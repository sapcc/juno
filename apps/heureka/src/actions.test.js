import { encodeUrlParamsFromObject } from "./actions"

describe("Actions", () => {
  describe("encodeUrlParamsFromObject", () => {
    test("return empty string if no object given", () => {
      expect(encodeUrlParamsFromObject()).toEqual("")
    })
    test("return url params when object given", () => {
      expect(encodeUrlParamsFromObject({ limit: 10, offset: 0 })).toEqual(
        "&limit=10&offset=0"
      )
    })
  })
})
