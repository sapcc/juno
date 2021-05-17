const PolicyEngine = require("./policyEngine")

describe("policy engine", () => {
  let engine

  it('replaces %(var)s with params["var"]', () => {
    engine = new PolicyEngine({ rule: '%(var)s="test"' })
    expect(engine.rules["rule"].parsedRule).toBe('params["var"] === "test"')
  })

  it('replaces "(" and ")" with " ( " and " ) "', () => {
    engine = new PolicyEngine({
      rule: "true and (1==1 or 0 == 0)",
    })
    expect(engine.rules["rule"].parsedRule).toBe(
      "true && ( 1 === 1 || 0 === 0 ) "
    )
  })

  it('removes spaces betwenn ":" and text and replaces with locals[expression] === ', () => {
    engine = new PolicyEngine({
      rule: "expression1   : expression2",
    })
    expect(engine.rules["rule"].parsedRule).toBe(
      'locals["expression1"] === expression2'
    )
  })

  it('replaces params["param1.param2.param3"] with params["param1"].param2.param3', () => {
    engine = new PolicyEngine({
      rule: 'params["param1.param2.param3"]',
    })
    expect(engine.rules["rule"].parsedRule).toBe(
      'params["param1"].param2.param3'
    )
  })

  it("replaces True and @ with true", () => {
    engine = new PolicyEngine({
      rule: "expression1 == True and expression2 = @",
    })
    expect(engine.rules["rule"].parsedRule).toBe(
      "expression1 === true && expression2 === true"
    )
  })

  it("replaces False and ! with false", () => {
    engine = new PolicyEngine({
      rule: "expression1 == False or expression2 = !",
    })
    expect(engine.rules["rule"].parsedRule).toBe(
      "expression1 === false || expression2 === false"
    )
  })

  it('replaces rule:part1:part2:part3 with this.rules["part1:part2:part3"]({rules,locals,params})', () => {
    engine = new PolicyEngine({
      rule: "rule:part1:part2:part3",
    })
    expect(engine.rules["rule"].parsedRule).toBe(
      'rules["part1:part2:part3"]({rules,locals,params})'
    )
  })

  it('replaces role:admin with this.locals["roles"].indexOf("admin")>=0', () => {
    engine = new PolicyEngine({
      rule: "role:admin",
    })
    expect(engine.rules["rule"].parsedRule).toBe(
      'locals["roles"].indexOf("admin") >= 0'
    )
  })

  it("replaces var1:var2 with locals[var1] === var2", () => {
    engine = new PolicyEngine({
      rule: "var1:var2",
    })
    expect(engine.rules["rule"].parsedRule).toBe('locals["var1"] === var2')
  })

  it('replaces "not" with "!"', () => {
    engine = new PolicyEngine({
      rule: " not (0 == 1)",
    })

    expect(engine.rules["rule"]).toBe(function(){return !( 0 === 1 ))
  })
})
