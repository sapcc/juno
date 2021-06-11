const { evaluate } = require("./evaluator")

describe("evaluate", () => {
  it("returns a function", () => {
    const func = evaluate({
      left: { type: "expression", value: "A" },
      operator: "and",
      right: { type: "expression", value: "B" },
    })
    expect(typeof func).toEqual("function")
  })

  it("true and false", () => {
    const rule = evaluate({
      left: { type: "expression", value: "true" },
      operator: "and",
      right: { type: "expression", value: "false" },
    })
    expect(rule({})).toEqual(false)
  })

  it("true or false", () => {
    const rule = evaluate({
      left: { type: "expression", value: "true" },
      operator: "or",
      right: { type: "expression", value: "false" },
    })
    expect(rule({})).toEqual(true)
  })

  it("false or (true and false) or true", () => {
    const rule = evaluate({
      left: { type: "expression", value: "false" },
      operator: "or",
      right: {
        left: {
          left: { type: "expression", value: "true" },
          operator: "and",
          right: { type: "expression", value: "false" },
        },
        operator: "or",
        right: { type: "expression", value: "true" },
      },
    })
    expect(rule({})).toEqual(true)
  })

  describe("rules", () => {
    it("rule:admin or @", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "@" },
      })
      expect(rule({ rules: { admin: () => true } })).toEqual(true)
    })
  })
  describe("roles", () => {
    it("rule:admin or role:superadmin", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "role:superadmin" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { roles: [{ name: "superadmin" }] },
        })
      ).toEqual(true)
    })
  })

  describe("is_admin_project", () => {
    it("rule:admin or is_admin_project:true", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "is_admin_project:true" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { is_admin_project: true },
        })
      ).toEqual(true)
    })

    it("rule:admin or is_admin_project:false", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "is_admin_project:false" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { is_admin_project: false },
        })
      ).toEqual(true)
    })
  })

  describe("is_admin", () => {
    it("rule:admin or is_admin:1", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "is_admin:1" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { is_admin: 1 },
        })
      ).toEqual(true)
    })

    it("rule:admin or is_admin:false", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "is_admin:false" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { is_admin: 1 },
        })
      ).toEqual(false)
    })
  })

  describe("domain_id", () => {
    it("rule:admin or domain_id:12345", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "domain_id:12345" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { domain_id: "12345" },
        })
      ).toEqual(true)
    })

    it("rule:admin or domain_id:54321", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "domain_id:54321" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { domain_id: "12345" },
        })
      ).toEqual(false)
    })
  })
  describe("domain_name", () => {
    it("rule:admin or domain_name:test", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "domain_name:test" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { domain_name: "test" },
        })
      ).toEqual(true)
    })

    it("rule:admin or domain_name:test3", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "domain_name:test3" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { domain_name: "12345" },
        })
      ).toEqual(false)
    })
  })

  describe("project_id", () => {
    it("rule:admin or project_id:12345", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "project_id:12345" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { project_id: "12345" },
        })
      ).toEqual(true)
    })

    it("rule:admin or project_id:54321", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "project_id:54321" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { project_id: "12345" },
        })
      ).toEqual(false)
    })
  })

  describe("project_domain_id", () => {
    it("rule:admin or project_domain_id:12345", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "project_domain_id:12345" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { project_domain_id: "12345" },
        })
      ).toEqual(true)
    })

    it("rule:admin or project_domain_id:test3", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "project_domain_id:test3" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { project_domain_id: "12345" },
        })
      ).toEqual(false)
    })
  })

  describe("user_id", () => {
    it("rule:admin or user_id:12345", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "user_id:12345" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { user_id: "12345" },
        })
      ).toEqual(true)
    })

    it("rule:admin or user_id:test3", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "user_id:test3" },
      })
      expect(
        rule({
          rules: { admin: () => false },
          context: { user_id: "12345" },
        })
      ).toEqual(false)
    })
  })

  describe("unsupported context value", () => {
    it("rule:admin or unsupported:12345", () => {
      const rule = evaluate({
        left: { type: "expression", value: "rule:admin" },
        operator: "or",
        right: { type: "expression", value: "unsupported:12345" },
      })
      expect(() => {
        rule({
          rules: { admin: () => false },
          context: { unsupported: "12345" },
        })
      }).toThrow()
    })
  })
})
