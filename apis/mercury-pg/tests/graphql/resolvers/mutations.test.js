const db = require("../../../src/db/models")
const resolvers = require("../../../src/graphql/resolvers")
const policyEngine = require("policy-engine")(
  require("../../../config/policy.json")
)

describe("graphql resolvers", () => {
  describe("user is processor", () => {
    let policy, currentUser, context
    beforeAll(async () => {
      const tokenPayload = {
        user: { name: "PROCESSOR" },
        roles: [{ name: "resource_admin" }],
        project: {
          id: "123456",
          name: "test",
          domain: {
            id: "12345",
            name: "test",
          },
        },
      }
      policy = policyEngine.policy(tokenPayload)
      currentUser = await db.User.createOrUpdate({ name: "PROCESSOR" })
      context = { policy, currentUser, tokenPayload }
    })

    describe("createRequest", () => {
      it("creates a new request", async () => {
        const request = await resolvers.Mutation.createRequest(
          null,
          {},
          context
        )
        expect(request).toBeDefined()
        expect(request.state).toEqual("open")
      })

      it("creates a new request with comment", async () => {
        const request = await resolvers.Mutation.createRequest(
          null,
          { comment: "COMMENT" },
          context
        )
        const processingSteps = await request.getLastProcessingSteps()
        expect(processingSteps.length).toEqual(1)
      })
    })

    describe("updateRequest", () => {
      it("updates a request", async () => {
        const request = await db.Request.create({
          kind: "project",
          state: "open",
          requesterID: currentUser.id,
        })

        await resolvers.Mutation.updateRequest(
          null,
          { id: request.id, kind: "zone" },
          context
        )
        await request.reload()
        expect(request.kind).toEqual("zone")
      })
    })

    describe("deleteRequests", () => {
      it("delete a request", async () => {
        const request = await db.Request.create({
          kind: "project",
          state: "closed",
          requesterID: currentUser.id,
        })

        await request.performStateTransition("close", {
          processor: currentUser,
        })

        const id = request.id

        const result = await resolvers.Mutation.deleteRequests(
          null,
          { id: [request.id] },
          context
        )

        const processingSteps = await db.ProcessingStep.findAll({
          where: { requestID: id },
        })
        expect(result).toEqual(1)
        expect(processingSteps.length).toEqual(0)
      })
    })
  })
})
