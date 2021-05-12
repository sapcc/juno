// Policy engine inspired by openstack

const DEFAULT_RULE_NAME = 'default'

function locals(user) {
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

class PloicyEngine {
  constructor(policyJson) {
    this.rules = {}
    for(let name in policyJson) {
      this.rules[name] = policyJson[name]
    }

  }
}

class Policy {
  constructor({ rules, user }) {
    this.rules = rules
    this.user = user
    this.locals = locals(user)
  }
}

class Rule {
  constructor({ policyJson, allRules, name, rule, parsedRule }) {
    this.policyJson = policyJson
    this.name = name
    this.rules = allRules
    this.rule = rule
    this.parsedRule = parsedRule
    // this.resolvedRule = resolve_rule_dependencies(name)
    // this.involvedRoles = @resolved_rule.scan(/role:([^\s]+)/).uniq rescue []
    // this.requiredLocals = extract_required_locals
    // this.requiredParams = extract_required_params
    //@executable = eval("lambda {|locals={},params={},trace=nil| #{@parsed_rule} }")
  }

  static parse({policyJson,allRules,name,rule}) {

    // ########### normalize rule ############
    // replace %(text)s with params["text"]
    let parsedRule = rule.replace(/%\(/, 'params["').replace(/\)s/, '"]')

    // replace "(" and ")" with " ( " and " ) "
    parsedRule = parsedRule.replace(/\s*(?<bracket>\(|\))\s*/, ' \k<bracket> ')
    // replace "or" and "and" with " or " and " and "
    parsedRule = parsedRule.replace(/\s+(?<operator>or|\bor\b|and|\band\b)\s+/i, ' \k<operator> ')
    // remove spaces betwenn ":" and text
    parsedRule = parsedRule.replace(/\s*(?<colon>:)\s*/, '\k<colon>')
    // ############ end #############

    // replace params["param1.param2.param3"] with (params["param1"].param2.param3 rescue false)
    parsedRule = parsedRule.replace(/params\["(?<param>[^\.|\]]+)(?<attributes>(\.[^\]]+)+)"\]/, 'params["\k<param>"]\k<attributes>')
    // replace params["param"] with params["param".to_sym]
    parsedRule = parsedRule.replace(/params\["(?<param>[^\]]+)"\]/, 'params["\k<param>".to_sym]')
    // replace "True" and "@" and empty rule with "true"
    parsedRule = parsedRule.replace(/^$/, 'true')
    parsedRule = parsedRule.replace(/True|@/i, 'true')
    // replace "False" and "!" with "false"
    parsedRule = parsedRule.replace(/False|!/i, 'false')

    // ********* save rules which name's contain ":"
    // replace rule:part1:part2:partn with rule:part1<->part2<->part3
    parsedRule = parsedRule.replace(/rule:([^\s]+)/) { |m| "rule:#{$1.gsub(/\:/, '<->')}" }

    // replace rule:name with @rules["name"].execute(locals,params)
    parsedRule = parsedRule.replace(/rule:(?<rule>[^\s]+)/, '@rules.get("\k<rule>").execute(locals,params,trace)')
    // replace role:name with locals["roles"].include?("name")
    parsedRule = parsedRule.replace(/role:(?<role>[^\s]+)/, 'locals["roles"].include?("\k<role>")')
    // replace name:value with (locals["name"]=="value" rescue false)
    parsedRule = parsedRule.replace(/(?<key>[^\s|:]+):(?<value>[^\s]+)/, '(begin; locals["\k<key>"]==\k<value>; rescue; false; end)')

    // ********* recover rules
    // replace <-> with :
    parsedRule = parsedRule.replace("<->", ":")

    js_parsedRule = parse_js(parsedRule)

    self.new(policy_hash,all_rules, name, rule, parsedRule, js_parsed_rule)

  }
}
