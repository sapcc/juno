// const TOKEN_PROPERTIES = [
//   "is_admin_project",
//   "is_admin",
//   "domain_id",
//   "domain_name",
//   "project_id",
//   "project_domain_id",
//   "user_id",
// ]

// const evaluateExpression = (expression, rules, context, params) => {
//   let value = expression.value || expression

//   if (/^(true|@)$/i.test(value)) return true
//   if (!value || /^(false|!)$/i.test(value)) return false

//   const rule = value.match(/rule:(.+)/)

//   if (rule) return rules[rule[1]] ? rules[rule[1]]({ rules, context, params }) : false

//   const role = value.match(/role:(.+)/)

//   if (role)
//     return !context.roles
//       ? false
//       : !!context.roles.find((r) => r.name === role[1])

//   const contextValue = value.match(
//     /^(is_admin_project|is_admin|domain_id|domain_name|project_id|project_domain_id|user_id):(.+)$/
//   )

//   if (contextValue) {
//     const paramsValue = contextValue[2].toString().match(/%\((.+)\)s/)
//     let value =
//       params && paramsValue
//         ? params[paramsValue[1]]
//         : contextValue[2].toString()
//     return context[contextValue[1]].toString() === value
//   }

//   throw new Error(`EVALUATOR ERROR: unknown context variable ${value}`)
// }

// function evaluate(expressionNode, rules = {}, context = {}, params = {}) {
//   if (!expressionNode) return false
//   if (expressionNode.type === "expression")
//     return evaluateExpression(expressionNode.value, rules, context, params)
//   if (expressionNode.operator === "or") {
//     return (
//       evaluate(expressionNode.left, rules, context, params) ||
//       evaluate(expressionNode.right, rules, context, params)
//     )
//   }
//   if (expressionNode.operator === "and") {
//     return (
//       evaluate(expressionNode.left, rules, context, params) &&
//       evaluate(expressionNode.right, rules, context, params)
//     )
//   }
//   if (expressionNode.operator === "not") {
//     return !evaluate(expressionNode.right, rules, context, params)
//   }
// }

// module.exports = {
//   evaluate:
//     (ruleTree) =>
//     ({ rules, context, params }) =>
//       evaluate(ruleTree, rules, context, params),
// }

const TOKEN_PROPERTIES = [
  "is_admin_project",
  "is_admin",
  "domain_id",
  "domain_name",
  "project_id",
  "project_domain_id",
  "user_id",
]

const evaluateExpression = (expression) => {
  let value = expression.value || expression

  if (/^(true|@)$/i.test(value)) return () => true
  if (!value || /^(false|!)$/i.test(value)) return () => false

  const ruleMatch = value.match(/rule:(.+)/)

  if (ruleMatch)
    return ({ rules, context, params }) =>
      rules[ruleMatch[1]]
        ? rules[ruleMatch[1]]({ rules, context, params })
        : false

  const roleMatch = value.match(/role:(.+)/)

  if (roleMatch)
    return ({ context }) =>
      !context.roles
        ? false
        : !!context.roles.find((r) => r.name === roleMatch[1])

  let contextMatch = value.match(/^(.+):(.+)$/)

  if (contextMatch) {
    const contextName = contextMatch[1].toString()
    const contextExprectedValue = contextMatch[2].toString()

    return ({ context, params }) => {
      // context value comes from context if TOKEN_PROPERTIES includes the name
      // otherwise it is a constant string, e.g. test:%(server.name)s
      const contextValue = TOKEN_PROPERTIES.includes(contextName)
        ? context[contextName]
        : contextName

      if (contextExprectedValue === "null") {
        return typeof contextValue === "undefined" || contextValue === null
      }

      // try to match right side as param
      const paramsMatch = contextExprectedValue.toString().match(/^%\((.+)\)s$/)
      // compare context value with exprected value if right side isn't a param
      if (!paramsMatch) return contextValue.toString() === contextExprectedValue

      // right side has the format %(name)s or %(name.name2.name3)s
      // handle values from given params
      const paramNameTokens = paramsMatch[1].split(".")
      let paramsValue = params || {}
      while (paramNameTokens.length > 0) {
        paramsValue = paramsValue[paramNameTokens.shift()]
      }

      return contextValue === paramsValue
    }
  }

  throw new Error(`EVALUATOR ERROR: unknown context variable ${value}`)
}

function evaluate(expressionNode) {
  if (!expressionNode) return () => false
  if (expressionNode.type === "expression")
    return evaluateExpression(expressionNode.value)
  if (expressionNode.operator === "or") {
    return (args) =>
      evaluate(expressionNode.left)(args) ||
      evaluate(expressionNode.right)(args)
  }
  if (expressionNode.operator === "and") {
    return (args) =>
      evaluate(expressionNode.left)(args) &&
      evaluate(expressionNode.right)(args)
  }
  if (expressionNode.operator === "not") {
    return !evaluate(expressionNode.right)
  }
}

module.exports = {
  evaluate,
}
