// Policy engine inspired by openstack

const isObject = (v) => v && typeof v === "object" && v.constructor === Object

class PloicyEngine {
  constructor(policyJson) {
    if (!policyJson || !isObject(policyJson)) {
      throw new Error("Policy config is missing or is not of type JSON!")
    }

    this.rules = {}

    for (let name in policyJson) {
      this.rules[name] = PolicyEngine.parseRule(policyJson[name])
    }
  }
}

module.exports = PloicyEngine
