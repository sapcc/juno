const { gql } = require("apollo-server")

const requests = require("./requests")
const users = require("./users")

// Note: In the current version of GraphQL, you can’t have an empty type even
// if you intend to extend it later. So we need to make sure the Query type
// has at least one field — in this case we can add a fake _ field.
const linkSchema = gql`
  scalar Date
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`

module.exports = [linkSchema, requests, users]
