module.exports = `
  type Query {
    profile: User! 
    requests(
      id: [ID!],
      state: [String!], 
      priority: [Int!],
      kind: [String!], 
      region: [String!], 
      projectID:[String!],
      domainID: [String!],
      olderThan: String,
      newerThan: String
    ): [Request!]!

    processingSteps(requestID:ID!): [ProcessingStep]
  }

  type Mutation {
    createRequest(
      kind: String!,
      subject: String!,
      description: String,
      priority: Int,
      region: String!,
      payload: String!,
      tags: [TagInput!],
    ): Request!

    updateRequest(
      id: ID!,
      kind: String,
      subject: String,
      description: String,
      priority: Int,
      region: String,
      payload: String,
      tags: [TagInput!],
    ): Request!

    deleteRequests(id:[ID!],olderThan: String, state: String): Boolean

    startProcessing(requestID:ID!, comment: String): ProcessingStep!
    addComment(requestID: ID!, comment: String!, referenceStepID: ID, type:String): ProcessingStep!
    askRequester(requestID: ID!, comment: String!, referenceStepID: ID): ProcessingStep!
    answer(requestID: ID!, comment: String!, referenceStepID: ID!): ProcessingStep!
    approve(requestID: ID!, comment: String, referenceStepID:ID, type:String): ProcessingStep!
    reject(requestID: ID!, comment: String!, referenceStepID:ID): ProcessingStep!
    close(requestID: ID!, comment: String, referenceStepID:ID, type:String): ProcessingStep!
    reopen(requestID: ID!, comment: String!, referenceStepID:ID): ProcessingStep!

    updateProfile(fullName:String,email:String,settings:String): User!
  }

  scalar JSON

  type User {
    id: ID!,
    name: String,
    email: String,
    fullName: String,
    ettings: JSON,
    createdAt: String!,
    updatedAt: String!,
  }

  type ProcessingStep {
    id: ID!
    requestID: Int
    processor: User!
    title: String
    comment: String
    referenceStep: ProcessingStep
    fromState: String
    toState: String
    transition: String
    type: String
    createdAt: String!
    updatedAt: String!
  }

  type Request {
    id: ID!
    requester: User!,
    lastProcessor: User,
    kind: String!,
    priority: Int,
    subject: String!,
    description: String,
    payload: JSON!,
    region: String!,
    scope: Scope,
    processingSteps: [ProcessingStep!],
    tags: [Tag!],
    state: String!,
    stateDetails: String,
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

  type Scope {
    domain: DomainScope
    project: ProjectScope
  }

  type DomainScope {
    name: String!,
    id: String!
  }

  type ProjectScope {
    name: String!
    id: String!
    domain: DomainScope
  }
`
