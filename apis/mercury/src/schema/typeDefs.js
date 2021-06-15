module.exports = `
  type Query {
    requests: [Request!]!
    request(id: ID!): Request
  }

  type Mutation {
    createRequest(title: String!, description: String!): Request!
    updateRequest(
      id: ID
      name: String
      description: String
    ): Request
    approveRequest(
      id: ID
    ): Request
    rejectRequest(
      id: ID
    ): Request
    deleteRequest(id: ID!): Request
  }

  type Request {
    id: ID!
    title: String!
    description: String!
    status: String!
  }

`
