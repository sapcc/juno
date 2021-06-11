// /**
//  * This module implements the parser for an array of tokens.
//  * A token is an object with two properties "type" and "value".
//  * "type" is one of "expression" or "operator". Value of operator
//  * can have one of "and", "or", "not", "(" or ")".
//  * @module
//  */
// // define operator predences
// const OPERATORS_PRECEDENCE = {
//   and: 1,
//   not: 2,
//   or: 0,
//   "(": 3,
// }

// /**
//  * Returns precedence of the operator
//  * @param {object} operator
//  * @returns
//  */
// function precedenceOf(operator) {
//   return OPERATORS_PRECEDENCE[operator.value]
// }

// /**
//  * This function converts recursively a given array of tokens into a tree of nodes.
//  * Example:
//  *   [ { type: "expression", value: "A" }, { type: "operator", value: "and" }, { type: "expression", value: "B" }]
//  *   will be converted into
//  *   {
//  *     operator: "and",
//  *     left: { type: "expression", value: "A" },
//  *     right: { type: "expression", value: "B" }
//  *   }
//  * @param {array} tokens
//  * @param {object} expressionNode contains the left side from last run of parse or is empty
//  * @returns {object} a tree of nodes
//  */
// function parse(tokens, expressionNode = {}) {
//   // tokens is empty -> return results from last run
//   if (!tokens || tokens.length === 0) return expressionNode

//   // get first token and removes it from the array
//   let currentToken = tokens.shift()

//   // current token is an expression -> call parse with the rest of tokens
//   // and pass the expression as expressionNode to it (the left side of expression)
//   if (currentToken.type === "expression") {
//     if (tokens.length === 0) return currentToken
//     return parse(tokens, { left: currentToken })
//   } else if (currentToken.type === "operator") {
//     // current token is an operator

//     // operator is a closing bracket => return expressionNode from the last parse step
//     // return only the left part of the expressionNode if it does not contain the operator field
//     if (currentToken.value === ")")
//       return !!expressionNode.type
//         ? expressionNode
//         : expressionNode.left || expressionNode.right
//     // open bracket => build subtree and pass it as expressionNode to the next run of parse
//     if (currentToken.value === "(") {
//       console.log("=================start building subtree", tokens)
//       const subtree = parse(tokens)
//       console.log("==============subtree", subtree, tokens)
//       const tree = parse(tokens, subtree)
//       console.log("============tree", tree)
//       return tree
//     } else {
//       const nextOperator = tokens.find((t) => t.type === "operator")

//       if (
//         nextOperator &&
//         precedenceOf(currentToken) > precedenceOf(nextOperator)
//       ) {
//         console.log("higher precendece")
//         // higher precedence -> swap right with left
//         const nextExpression = tokens.shift()
//         const tree = parse(tokens, {
//           left: {
//             type: currentToken.value,
//             left: expressionNode.left,
//             right: nextExpression,
//           },
//         })
//         console.log(">>>>>>>>>>>>>>>>>>>>>>tree", tree)
//         return tree
//       } else {
//         console.log("lower precedence")
//         // build the right part of the node
//         console.log("==================expressionNode", expressionNode)
//         if (expressionNode.type) {
//           return {
//             left: expressionNode,
//             type: currentToken.value,
//             right: parse(tokens),
//           }
//         } else {
//           expressionNode.type = currentToken.value
//           expressionNode.right = parse(tokens)
//           return expressionNode
//         }
//       }
//     }
//   }
// }

// module.exports = {
//   parse: (tokens) => parse(tokens.slice()),
// }

/**
 * This module implements the parser for an array of tokens.
 * A token is an object with two properties "type" and "value".
 * "type" is one of "expression" or "operator". Value of operator
 * can have one of "and", "or", "not", "(" or ")".
 * @module
 */
// define operator predences
const OPERATORS_PRECEDENCE = {
  and: 1,
  not: 2,
  or: 0,
}

/**
 * Returns precedence of the operator
 * @param {object} operator
 * @returns
 */
function precedenceOf(operator) {
  return OPERATORS_PRECEDENCE[operator.value]
}

function bracketsToSubarrays(tokens) {
  let index = 0

  const recursively = () => {
    let result = []

    while (index < tokens.length) {
      let token = tokens[index]
      index++
      if (token.type === "operator" && token.value === ")") {
        // done
        return result
      }
      if (token.type === "operator" && token.value === "(") {
        result.push(recursively())
      } else {
        result.push(token)
      }
    }
    return result
  }

  return recursively()
}

function notOperatorsToSubarrays(tokens) {
  let index = 0

  const recursively = () => {
    let notExpression = [{ type: "operator", value: "not" }]
    let token = tokens[index]
    index++
    if (token.type === "operator" && token.value === "not") {
      notExpression.push(recursively())
    } else {
      notExpression.push(token)
    }
    return notExpression
  }

  let result = []
  while (index < tokens.length) {
    let token = tokens[index]
    index++
    if (token.type === "operator" && token.value === "not") {
      result.push(recursively())
    } else {
      result.push(token)
    }
  }
  return result
}

let count = 0
/**
 * This function converts recursively a given array of tokens into a tree of nodes.
 * Example:
 *   [ { type: "expression", value: "A" }, { type: "operator", value: "and" }, { type: "expression", value: "B" }]
 *   will be converted into
 *   {
 *     operator: "and",
 *     left: { type: "expression", value: "A" },
 *     right: { type: "expression", value: "B" }
 *   }
 * @param {array} tokens
 * @param {object} expressionNode contains the left side from last run of parse or is empty
 * @returns {object} a tree of nodes
 */
function parse(tokens, expressionNode, level = 0) {
  console.log("===========LEVEL ", level)
  console.log(
    count++,
    "<<<<<<<<<<<<<<<<<<<<<<<<<<<",
    JSON.stringify(tokens, null, 2),
    expressionNode
  )
  // tokens is empty -> return results from last run
  if (!tokens || tokens.length === 0) return {}

  // get first token and removes it from the array
  let currentToken = tokens.shift()
  console.log("==================== CURRENT TOKEN", currentToken)
  if (tokens.length === 0) {
    // last token (right side)
    const expression = Array.isArray(currentToken)
      ? parse(currentToken, null, level)
      : { ...currentToken }
    return expression
  }

  let tree = {}
  if (currentToken.type === "expression" || Array.isArray(currentToken)) {
    if (expressionNode && expressionNode.type) {
      console.log(
        "==================== expression and expressionNode is not empty",
        expressionNode
      )
      expressionNode.right = parse(tokens, null, level + 1)
      tree = { ...expressionNode }
    } else {
      console.log("==================== expression and expressionNode is empty")
      if (Array.isArray(currentToken))
        console.log("==================== expression is an array")
      const expression = Array.isArray(currentToken)
        ? parse(currentToken, null, level)
        : { ...currentToken }

      console.log("==================== PARSED EXPRESSION", expression)
      tree = { left: expression }
      tree = parse(tokens, { left: expression }, level + 1)
    }
  } else if (currentToken.type === "operator") {
    const nextOperator = tokens.find((t) => t.type === "operator")
    console.log("==================== operator", currentToken.value)

    if (
      nextOperator &&
      precedenceOf(currentToken) > precedenceOf(nextOperator)
    ) {
      console.log("higher precendece")
      // higher precedence -> swap right with left
      const nextExpression = tokens.shift()

      tree = parse(tokens, {
        left: {
          left: expressionNode?.left,
          type: currentToken.value,
          right: Array.isArray(nextExpression)
            ? parse(nextExpression)
            : nextExpression,
        },
      })
      console.log(">>>>>>>>>>>>>>>>>>>>>>tree", tree)
      return tree
    } else {
      tree = {
        left: expressionNode?.left,
        type: currentToken.value,
        right: parse(tokens, null, level + 1),
      }
    }
  } else {
    throw new Error(
      `PARSE ERROR: unknown token type. Only expressions and operators are allowed.`
    )
  }

  try {
    console.log(
      count,
      ">>>>>>>>>>>>>>>>>>>>>>>>> tree",
      JSON.stringify(tree, null, 2)
    )
  } catch (e) {
    console.log(e)
  }
  return tree

  // example not A and B:
  //   1) parse(["not","A","and","B"])
  //      expressionNode.operator = "not"
  //      return parse(["A","and","B"],{operator: "not"})
  //
  //   2) parse(["A","and","B"],{operator: "not"})
  //      expressionNode.left = {
  //        operator: "not", right: "A"
  //      }
  //      return parse(["and","B"],nodeExpression)
  //
  //   3) parse(["and","B"], {left: {operator: "not", right: "A"}})
  //      return {
  //        operator: "and",
  //        left: {operator: "not", right: "A"},
  //        right: parse(["B"])
  //      }
  //   4) parse(["B"])
  //      return "B"
  // => {operator: "and", left: {operator: "not", right: "A"}, right: "B"}

  // example not not not A and B:
  //   1) parse(["not","not","not","A","and","B"])
  //      expressionNode.operator = "not"
  //      return parse(["not","not","A","and","B"],{operator: "not"})
  //
  //   2) parse(["not","not","A","and","B"],{operator: "not"})
  //      expressionNode.left = {
  //        operator: "not", right: "A"
  //      }
  //      return parse(["and","B"],nodeExpression)
  //
  //   3) parse(["and","B"], {left: {operator: "not", right: "A"}})
  //      return {
  //        operator: "and",
  //        left: {operator: "not", right: "A"},
  //        right: parse(["B"])
  //      }
  //   4) parse(["B"])
  //      return "B"
  // => {operator: "and", left: {operator: "not", right: "A"}, right: "B"}

  // 3 possible situations
  // 1. expressionNode is empty -> start building expressionNode
  //    a) currentToken is an expression -> expressionNode.left = currentToken
  //    b) currentToken is an array (brackets) -> expressionNode.left = parse(currentToken)
  //    c) currentToken is an operator ->
  //       right binding operator like "not" (not A and B) ->
  //       expressionNode.operator = currentToken.value
  //       expressionNode.right = parse(tokens)
  // 2. expressionNode.operator is not empty -> build right side
  //    a) expressionNode.left is empty (right binding operator like "not") ->
  //
  // 3. expressionNode.left is not empty ->

  console.log(">>>>>>>><currentToken", currentToken)
  if (Array.isArray(currentToken)) {
    const subNode = parse(currentToken)
    console.log("=======================subnode", subNode)
    return subNode
  }

  // current token is an expression -> call parse with the rest of tokens
  // and pass the expression as expressionNode to it (the left side of expression)

  // else if (currentToken.type === "expression") {
  //   if (tokens.length === 0) return currentToken
  //   return parse(tokens, { left: currentToken })
  // } else if (currentToken.type === "operator") {
  //   // current token is an operator

  //   const nextOperator = tokens.find((t) => t.type === "operator")

  //   if (
  //     nextOperator &&
  //     precedenceOf(currentToken) > precedenceOf(nextOperator)
  //   ) {
  //     // console.log("higher precendece")
  //     // higher precedence -> swap right with left
  //     const nextExpression = tokens.shift()
  //     const tree = parse(tokens, {
  //       left: {
  //         type: currentToken.value,
  //         left: expressionNode.left,
  //         right: Array.isArray(nextExpression)
  //           ? parse(nextExpression)
  //           : nextExpression,
  //       },
  //     })
  //     // console.log(">>>>>>>>>>>>>>>>>>>>>>tree", tree)
  //     return tree
  //   } else {
  //     // console.log("lower precedence")
  //     // build the right part of the node
  //     // console.log("==================expressionNode", expressionNode)
  //     if (expressionNode.type) {
  //       return {
  //         left: expressionNode,
  //         type: currentToken.value,
  //         right: parse(tokens),
  //       }
  //     } else {
  //       expressionNode.type = currentToken.value
  //       expressionNode.right = parse(tokens)
  //       return expressionNode
  //     }
  //   }
  // }
}

module.exports = {
  parse: (tokens) =>
    parse(notOperatorsToSubarrays(bracketsToSubarrays(tokens.slice()))),
}
