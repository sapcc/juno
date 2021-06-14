// Policy engine inspired by openstack
const { tokenize } = require("./lexer")
const { parse } = require("./parser")
const { evaluate } = require("./evaluator")

const isObject = (v) => v && typeof v === "object" && v.constructor === Object

const parseRule = (rule) => evaluate(parse(tokenize(rule)))
const context = (tokenPayload) => {
  return {
    is_admin_project: tokenPayload.is_admin_project,
    is_admin: tokenPayload.is_admin,
    domain_id: tokenPayload.domain?.id,
    domain_name: tokenPayload.domain?.name,
    project_id: tokenPayload.project?.id,
    project_domain_id: tokenPayload.project?.domain?.id,
    user_id: tokenPayload.user?.id,
    roles: tokenPayload.roles || [],
  }
}

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

  /**
   * initialize policy for given token payload
   * @param {object} tokenPayload openstack token
   * @returns {object} {check: function(ruleName,params)}
   */
  policy(tokenPayload) {
    if (!tokenPayload)
      throw new Error("ENGINE ERROR: token payload is missing!")

    return {
      check: (ruleName, params = {}) => {
        let rule = this.rules[ruleName]
        if (!rule) {
          console.info(`rule ${ruleName} not found, looking for _default rule`)
          rule = this.rules["_default"]
          if (!rule)
            throw new Error(`POLICY ERROR: could not find rule ${ruleName}`)
        }

        return rule({
          rules: this.rules,
          context: context(tokenPayload),
          params,
        })
      },
    }
  }
}

module.exports = PloicyEngine
