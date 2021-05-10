const { gql } = require("apollo-server")

module.exports = gql`
  extend type Query {
    users: [User!]!
    user(id: ID!): User
  }

  extend type Mutation {
    createUser(
      name: String!
      email: String!
      fullName: String
      status: String
    ): User!
    deleteUser(id: ID!): User
  }

  type User {
    id: ID!
    name: String!
    fullName: String
    email: String!
    status: String
  }
`
