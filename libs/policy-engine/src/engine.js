// Policy engine inspired by openstack
const { tokenize } = require("./lexer")
const { parse } = require("./parser")
const { evaluate } = require("./evaluator")

const isObject = (v) => v && typeof v === "object" && v.constructor === Object

const parseRule = (rule) => evaluate(parse(tokenize(rule)))
class PloicyEngine {
  constructor(policyJson) {
    if (!policyJson || !isObject(policyJson)) {
      throw new Error("Policy config is missing or is not of type JSON!")
    }

    this.rules = {}

    for (let name in policyJson) {
      this.rules[name] = parseRule(policyJson[name])
    }
  }

  userPolicy() {}
}

module.exports = PloicyEngine
