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
      newerThan: String,
      lastProcessingSteps: Int,
      orderBy: RequestOrderByInput,
      paginate: PaginateInput
    ): Requests!

    regions: [String]!

    processingSteps(
      requestID:ID!, 
      prderBy: ProcessingStepOrderByInput
      paginate: PaginateInput
    ): ProcessingSteps
  }

  type Mutation {
    createRequest(
      kind: String!,
      subject: String!,
      description: String,
      priority: Int,
      payload: String!,
      tags: [TagInput!],
      comment: String
    ): Request!

    updateRequest(
      id: ID!,
      kind: String,
      subject: String,
      description: String,
      priority: Int,
      payload: String,
      tags: [TagInput!],
    ): Request!

    deleteRequests(id:[ID!],olderThan: String, state: String): Int!

    startProcessing(requestID:ID!, comment: String, type:String, kind:String): Request!
    addNote(requestID: ID!, comment: String!, referenceStepID: ID): Request!
    process(requestID: ID!, comment: String!, referenceStepID: ID, type:String, kind: String): Request!
    askRequester(requestID: ID!, comment: String!, referenceStepID: ID): Request!
    answer(requestID: ID!, comment: String!, referenceStepID: ID!): Request!
    approve(requestID: ID!, comment: String, referenceStepID:ID, kind: String): Request!
    reject(requestID: ID!, comment: String!, referenceStepID:ID, kind: String): Request!
    close(requestID: ID!, comment: String, referenceStepID:ID, kind:String): Request!
    reopen(requestID: ID!, comment: String!, referenceStepID:ID): Request!

    updateProcessingStep(id:ID, comment: String, type: String, kind: String): ProcessingStep!

    updateProfile(fullName:String,email:String,settings:String): User!
  }

  type Subscription {
    requestAdded: Request
    requestUpdated: Request
    requestsDeleted: [ID!]

    processingStepAdded(requestID:ID): ProcessingStep
    processingStepUpdated(requestID:ID): ProcessingStep
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

  type ProcessingSteps {
    items: [ProcessingStep]
    pageInfo: PageInfo
  }

  type ProcessingStep {
    id: ID!
    requestID: Int
    processor: User!
    kind: String
    comment: String
    referenceStep: ProcessingStep
    fromState: String
    toState: String
    transition: String
    type: String
    createdAt: String!
    updatedAt: String!
  }

  type Requests {
    items: [Request]
    pageInfo: PageInfo
  }

  type Request {
    id: ID!
    requester: User!,
    lastProcessor: User,
    lastProcessingSteps: [ProcessingStep!]
    kind: String!,
    priority: Int,
    subject: String!,
    description: String,
    payload: JSON!,
    region: String!,
    scope: Scope,
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

  input RequestOrderByInput {
    createdAt: Sort
    kind: Sort,
    priority: Int,
    region: Sort,
    state: Sort,
  }

  input ProcessingStepOrderByInput {
    createdAt: Sort
    updatedAt: Sort
    kind: Sort,
    type: Sort,
    fromState: Sort,
    toState: Sort,
  }

  input PaginateInput {
    page: Int,
    perPage: Int
  }

  enum Sort {
    ASC
    DESC
  }

  type PageInfo {
    currentPage: Int
    perPage: Int
    itemCount: Int
    pageCount: Int
    hasPreviousPage: Boolean
    hasNextPage: Boolean
  }
`
