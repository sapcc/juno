// Policy engine inspired by openstack

const DEFAULT_RULE_NAME = "default"

class Policy {
  constructor({ rules, tokenPayload }) {
    this.rules = rules
    this.userData = Policy.userData(tokenPayload.user)
  }

  static userData(user) {
    return {
      roles: user.role_names,
      domain_id: user.domain_id,
      domain_name: user.domain_name,
      is_admin: false, // we dont support admin tokens that bypass authorization checks
      project_id: user.project_id,
      project_domain_id: user.project_domain_id,
      user_id: user.id,
      "token.is_admin_project": user.is_admin_project_token,
    }
  }

  check(rulesNames, params = {}) {
    if (!rulesNames) return false
    if (!Array.isArray(rulesNames)) rulesNames = [rulesNames]
    let allowed = true
    for (let name of rulesNames) {
      if (!this.rules[name])
        allowed =
          allowed &&
          this.rules[name] &&
          this.rules[name]({
            rules: this.rules,
            userData: this.userData,
            params,
          })
    }
  }
}

class PloicyEngine {
  constructor(policyJson) {
    this.rules = {}

    for (let name in policyJson) {
      this.rules[name] = PolicyEngine.parseRule(policyJson[name])
    }
  }

  static parseRule(rule) {
    // ########### normalize rule ############
    // replace %(text)s with params["text"]
    let parsedRule = rule.replace(/%\(/g, 'params["').replace(/\)s/g, '"]')

    // replace "(" and ")" with " ( " and " ) "
    parsedRule = parsedRule.replace(/\s*(\(|\))\s*/g, " $1 ")

    // remove spaces betwenn ":" and text
    parsedRule = parsedRule.replace(/\s*(:)\s*/g, "$1")
    // ############ end #############

    // replace params["param1.param2.param3"] with (params["param1"].param2.param3 rescue false)
    parsedRule = parsedRule.replace(
      /params\["([^\.|\]]+)((\.[^\]]+)+)"\]/g,
      'params["$1"]$2'
    )

    // replace "True" and "@" and empty rule with "true"
    parsedRule = parsedRule.replace(/^$/g, "true")
    parsedRule = parsedRule.replace(/True|@/gi, "true")
    // replace "False" and "!" with "false"
    parsedRule = parsedRule.replace(/False|!/gi, "false")

    // ********* save rules which name's contain ":"
    // replace rule:part1:part2:partn with rule:part1<->part2<->part3
    parsedRule = parsedRule.replace(/rule:([^\s]+)/, (match, rule) =>
      match ? `rule:${rule.replace(/:/g, "<->")}` : ""
    )

    // // replace rule:name with this.rules["name"].execute(userData,params)
    parsedRule = parsedRule.replace(
      /rule:([^\s]+)/g,
      'rules["$1"]({rules,userData,params})'
    )
    // replace role:name with userData["roles"].include?("name")
    parsedRule = parsedRule.replace(
      /role:([^\s]+)/g,
      'userData["roles"].indexOf("$1") >= 0'
    )
    // replace name:value userData["name"]=="value"
    parsedRule = parsedRule.replace(
      /([^\s|:]+):([^\s]+)/g,
      'userData["$1"]==$2'
    )

    parsedRule = parsedRule
      .replace(/\sor\s/g, " || ")
      .replace(/\and\s/g, " && ")
      .replace(/\snot\s*/g, " !")
      .replace(/={1,2}/g, " === ")
      .replace(/>\s===/g, ">=")
      .replace(/nil/gi, "null")
      .replace(/null/gi, "null || undefined")
      .replace(/\s{2,}/g, " ")

    // ********* recover rules
    // replace <-> with :
    parsedRule = parsedRule.replace(/<->/g, ":")

    return eval(`(function({rules,userData,params}){ return ${parsedRule}})`)
  }

  // returns a policy instance for given (openstack) token payload
  policy(tokePayload) {
    return new Policy({ rules: this.rules, tokenPayload })
  }
}

module.exports = PloicyEngine
