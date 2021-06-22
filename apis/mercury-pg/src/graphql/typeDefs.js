module.exports = `
  type Query {
    requests: [Request!]!
    request(id: ID!): Request
  }

  type Mutation {
    createRequest(
      kind: String!,
      priority: String,
      description: String,
      subject: String!,
      region: String!,
      payload: String!,
      tags: [TagInput!],
    ): Request!

    updateRequest(
      id: ID!
      priority: String,
      description: String,
      subject: String,
      tags: [TagInput!],
    ): Request
    
    approveRequest(id: ID!): Request
    rejectRequest(id: ID!): Request
    closeRequest(id: ID!): Request
    deleteRequest(id: ID!): Request
  }

  type Request {
    id: ID!
    kind: String!,
    priority: String!,
    description: String,
    subject: String!,
    region: String!,
    isDomainScoped: Boolean,
    isProjectScoped: Boolean,
    domainID: String,
    projectID: String,
    domainName: String,
    projectName: String,
    requesterID: Int!,
    processorsIDs: [Int!],
    tags: [Tag!],
    state: RequestState!,
    payload: String!,
    createdAt: String!,
    updatedAt: String!,
  }

  type Tag {
    name: String!,
    value: String!
  }
  input TagInput {
    name: String!,
    value: String!
  }

  enum RequestState {
    open
    processing
    rejected
    approved
    closed
  }
`
