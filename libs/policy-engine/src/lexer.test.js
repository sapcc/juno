const { tokenize } = require("./lexer")

describe("lexer tokenize", () => {
  let result
  beforeEach(() => {
    result = tokenize(
      "rule:admin_required and (is_admin_project:True or domain_id:'ccadmin' or user_id:%(user_id)s) and not user_id:D064310"
    )
  })

  it("returned value is defined", () => {
    expect(result).toBeDefined()
  })

  it("returned value is an array", () => {
    expect(Array.isArray(result)).toEqual(true)
  })

  it("returns tokens", () => {
    expect(result).toEqual([
      { type: "expression", value: "rule:admin_required" },
      { type: "operator", value: "and" },
      { type: "operator", value: "(" },
      { type: "expression", value: "is_admin_project:True" },
      { type: "operator", value: "or" },
      { type: "expression", value: "domain_id:'ccadmin'" },
      { type: "operator", value: "or" },
      { type: "expression", value: "user_id:%(user_id)s" },
      { type: "operator", value: ")" },
      { type: "operator", value: "and" },
      { type: "operator", value: "not" },
      { type: "expression", value: "user_id:D064310" },
    ])
  })

  it("A and B", () => {
    expect(tokenize("A and B")).toEqual([
      { type: "expression", value: "A" },
      { type: "operator", value: "and" },
      { type: "expression", value: "B" },
    ])
  })

  it("A or B or C", () => {
    expect(tokenize("A or B or C")).toEqual([
      { type: "expression", value: "A" },
      { type: "operator", value: "or" },
      { type: "expression", value: "B" },
      { type: "operator", value: "or" },
      { type: "expression", value: "C" },
    ])
  })

  it("A and B or C", () => {
    expect(tokenize("A and B or C")).toEqual([
      { type: "expression", value: "A" },
      { type: "operator", value: "and" },
      { type: "expression", value: "B" },
      { type: "operator", value: "or" },
      { type: "expression", value: "C" },
    ])
  })

  it("A and ( B or C )", () => {
    expect(tokenize("A and ( B or C )")).toEqual([
      { type: "expression", value: "A" },
      { type: "operator", value: "and" },
      { type: "operator", value: "(" },
      { type: "expression", value: "B" },
      { type: "operator", value: "or" },
      { type: "expression", value: "C" },
      { type: "operator", value: ")" },
    ])
  })

  it("A and not B", () => {
    expect(tokenize("A and not B")).toEqual([
      { type: "expression", value: "A" },
      { type: "operator", value: "and" },
      { type: "operator", value: "not" },
      { type: "expression", value: "B" },
    ])
  })

  it("A and ( B or C  and ( D or E ) )", () => {
    expect(tokenize("A and ( B or C  and ( D or E ) )")).toEqual([
      { type: "expression", value: "A" },
      { type: "operator", value: "and" },
      { type: "operator", value: "(" },
      { type: "expression", value: "B" },
      { type: "operator", value: "or" },
      { type: "expression", value: "C" },
      { type: "operator", value: "and" },
      { type: "operator", value: "(" },
      { type: "expression", value: "D" },
      { type: "operator", value: "or" },
      { type: "expression", value: "E" },
      { type: "operator", value: ")" },
      { type: "operator", value: ")" },
    ])
  })

  it("@", () => {
    expect(tokenize("@")).toEqual([{ type: "expression", value: "@" }])
  })
  it("!", () => {
    expect(tokenize("!")).toEqual([{ type: "expression", value: "!" }])
  })
})
