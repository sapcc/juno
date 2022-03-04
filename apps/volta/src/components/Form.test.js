import { validateForm } from "./Form"

describe("Form", () => {
  describe("validateForm", () => {
    describe("mandatory fields", () => {
      test("returns error for each field if not set", () => {
        expect(validateForm({})).toEqual({
          name: ["Name can't be blank"],
          csr: ["Certificate signing request can't be blank"],
        })
      })
      test("returns no errors if set", () => {
        expect(validateForm({ name: "arturo", csr: "blabla" })).toEqual({})
      })
    })
  })
})
