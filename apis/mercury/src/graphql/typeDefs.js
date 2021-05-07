const { gql } = require("apollo-server")

module.exports = gql`
  type Query {
    requests: [Request!]!
    request(id: ID!): Request
  }

  type Mutation {
    createRequest(name: String!, description: String!): Request!
    updateRequest(
      id: ID!
      name: String
      description: String
      status: String
    ): Request
    deleteRequest(id: ID!): Request
  }

  type Request {
    id: ID!
    name: String!
    description: String!
    status: String!
  }
`
