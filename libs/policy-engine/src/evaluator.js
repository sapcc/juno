const TOKEN_PROPERTIES = [
  "is_admin_project",
  "is_admin",
  "domain_id",
  "domain_name",
  "project_id",
  "project_domain_id",
  "user_id",
]

const evaluateExpression = (expression, rules, context) => {
  let value = expression.value || expression

  if (/^(true|@)$/i.test(value)) return true
  if (!value || /^(false|!)$/i.test(value)) return false

  const rule = value.match(/rule:(.+)/)

  if (rule) return rules[rule[1]] ? rules[rule[1]]({ rules, context }) : false

  const role = value.match(/role:(.+)/)

  if (role)
    return !context.roles
      ? false
      : !!context.roles.find((r) => r.name === role[1])

  const contextValue = value.match(
    /^(is_admin_project|is_admin|domain_id|domain_name|project_id|project_domain_id|user_id):(.+)$/
  )

  if (contextValue) {
    return context[contextValue[1]].toString() === contextValue[2].toString()
  }

  throw new Error(`EVALUATOR ERROR: unknown context variable ${value}`)
}

function evaluate(expressionNode, rules = {}, context = {}) {
  if (!expressionNode) return false
  if (expressionNode.type === "expression")
    return evaluateExpression(expressionNode.value, rules, context)
  if (expressionNode.operator === "or") {
    return (
      evaluate(expressionNode.left) ||
      evaluate(expressionNode.right, rules, context)
    )
  }
  if (expressionNode.operator === "and") {
    return (
      evaluate(expressionNode.left) &&
      evaluate(expressionNode.right, rules, context)
    )
  }
  if (expressionNode.operator === "not") {
    return !evaluate(expressionNode.right, rules, context)
  }
}

module.exports = {
  evaluate:
    (ruleTree) =>
    ({ rules, context }) =>
      evaluate(ruleTree, rules, context),
}
