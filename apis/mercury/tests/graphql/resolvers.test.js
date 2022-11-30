const db = require("../../src/db/models")
const resolvers = require("../../src/graphql/resolvers")
const policyEngine = require("policy-engine").default(
  require("../../config/policy.json")
)

describe("graphql resolvers", () => {
  let policy, currentUser, context, pubsub
  beforeAll(async () => {
    const tokenPayload = {
      user: { name: "TEST_USER" },
    }
    policy = policyEngine.policy(tokenPayload)
    currentUser = await db.User.createOrUpdate({ name: "TEST_USER" })
    pubsub = jest.fn()

    context = { tokenPayload, policy, currentUser, pubsub }
  })

  beforeEach(() => {
    pubsub.publish = jest.fn()
  })

  describe("profile", () => {
    it("returns current user's infos", async () => {
      const profile = await resolvers.Query.profile(null, {}, context)
      expect(profile.name).toEqual("TEST_USER")
    })
  })

  describe("processingSteps", () => {
    it("returns step items and pagination", async () => {
      let steps = await resolvers.Query.processingSteps(
        null,
        { requestID: 1 },
        context
      )
      expect(steps.items).toBeDefined()
      expect(steps.pageInfo).toBeDefined()
    })

    it("items is an array", async () => {
      let steps = await resolvers.Query.processingSteps(
        null,
        { requestID: 1 },
        context
      )
      expect(Array.isArray(steps.items)).toEqual(true)
    })
  })

  describe("requests", () => {
    it("returns request items and pagination", async () => {
      let requests = await resolvers.Query.requests(null, {}, context)
      expect(requests.items).toBeDefined()
      expect(requests.pageInfo).toBeDefined()
    })

    it("items is an array", async () => {
      let requests = await resolvers.Query.requests(
        null,
        { requestID: 1 },
        context
      )
      expect(Array.isArray(requests.items)).toEqual(true)
    })
  })

  describe("regions", () => {
    it("returns all known regions", async () => {
      const regions = await resolvers.Query.regions(null, {}, context)
      expect(Array.isArray(regions)).toEqual(true)
    })
  })

  describe("createRequest", () => {
    it("creates a new request", async () => {
      const request = await resolvers.Mutation.createRequest(
        null,
        { kind: "project" },
        context
      )
      expect(request).toBeDefined()
      expect(pubsub.publish).toHaveBeenCalledWith({
        topic: "REQUEST_ADDED",
        payload: { requestAdded: request },
      })
      expect(pubsub.publish).toHaveBeenCalledWith({
        topic: `REQUEST_ADDED_${currentUser.id}`,
        payload: { requestAdded: request },
      })
    })
  })

  describe("updateRequest", () => {
    it("updates a request", async () => {
      let request = await db.Request.create({
        requesterID: currentUser.id,
        kind: "project",
      })

      request = await resolvers.Mutation.updateRequest(
        null,
        {
          id: request.id,
          kind: "zone",
        },
        context
      )

      expect(request.kind).toEqual("zone")

      expect(pubsub.publish).toHaveBeenCalledWith({
        topic: "REQUEST_UPDATED",
        payload: { requestUpdated: request },
      })
      expect(pubsub.publish).toHaveBeenCalledWith({
        topic: `REQUEST_UPDATED_${currentUser.id}`,
        payload: { requestUpdated: request },
      })
    })
  })

  describe("updateProcessingStep", () => {
    it("updates a step", async () => {
      let step = await db.ProcessingStep.create({
        requestID: 1,
        processorID: currentUser.id,
        kind: "note",
      })

      step = await resolvers.Mutation.updateProcessingStep(
        null,
        {
          id: step.id,
          kind: "answer",
        },
        context
      )

      expect(step.kind).toEqual("answer")
      expect(pubsub.publish).toHaveBeenCalledWith({
        topic: `PROCESSING_STEP_UPDATED`,
        payload: { processingStepUpdated: step },
      })
      expect(pubsub.publish).toHaveBeenCalledWith({
        topic: `PROCESSING_STEP_UPDATED_REQUEST:1`,
        payload: { processingStepUpdated: step },
      })
      expect(pubsub.publish).toHaveBeenCalledWith({
        topic: `PROCESSING_STEP_UPDATED_PROCESSOR:${currentUser.id}`,
        payload: { processingStepUpdated: step },
      })
      expect(pubsub.publish).toHaveBeenCalledWith({
        topic: `PROCESSING_STEP_UPDATED_REQUEST:1_PROCESSOR:${currentUser.id}`,
        payload: { processingStepUpdated: step },
      })
    })
  })

  describe("user is processor", () => {
    beforeAll(async () => {
      const tokenPayload = {
        user: { name: "TEST_USER" },
        roles: [{ name: "resource_admin" }],
      }
      policy = policyEngine.policy(tokenPayload, { debug: false })
      context = { tokenPayload, policy, currentUser, pubsub }
    })

    describe("processingSteps", () => {
      it("includes internal steps", async () => {
        const step = await db.ProcessingStep.create({
          requestID: 1,
          type: "internal",
        })

        let steps = await resolvers.Query.processingSteps(
          null,
          { requestID: 1 },
          context
        )

        expect(steps.items.find((i) => i.id === step.id)).toBeDefined()
      })
    })

    describe("requests", () => {
      it("includes requests created by other users", async () => {
        const request = await db.Request.create({
          requesterID: currentUser.id + 10,
        })

        let requests = await resolvers.Query.requests(null, {}, context)
        expect(requests.items.find((i) => i.id === request.id)).toBeDefined()
      })
    })

    describe("deleteRequests", () => {
      it("destroys requests", async () => {
        const request1 = await db.Request.create({
          requesterID: currentUser.id + 1,
        })
        const request2 = await db.Request.create({
          requesterID: currentUser.id + 1,
        })

        await request1.performStateTransition("close", {
          processor: currentUser,
        })
        await request2.performStateTransition("close", {
          processor: currentUser,
        })

        const count = await resolvers.Mutation.deleteRequests(
          null,
          { id: [request1.id, request2.id] },
          context
        )
        expect(count).toEqual(2)
        expect(pubsub.publish).toHaveBeenCalledWith({
          topic: "REQUESTS_DELETED",
          payload: { requestsDeleted: [request1.id, request2.id] },
        })
      })
    })

    const transitions = [
      { name: "startProcessing", from: "open", to: "processing" },
      { name: "addNote", from: "open", to: "open" },
      { name: "process", from: "processing", to: "processing" },
      { name: "askRequester", from: "open", to: "waiting" },
      { name: "answer", from: "waiting", to: "processing" },
      { name: "approve", from: "open", to: "approved" },
      { name: "reject", from: "open", to: "rejected" },
      { name: "close", from: "open", to: "closed" },
      { name: "reopen", from: "rejected", to: "open" },
    ]
    transitions.forEach((t) => {
      describe(t.name, () => {
        let request
        beforeEach(async () => {
          request = await db.Request.create({ requesterID: currentUser.id })
          request.state = t.from
          await request.save()
          await request.reload()
        })

        it(`changes the state to ${t.to}`, async () => {
          request = await resolvers.Mutation[t.name](
            null,
            { requestID: request.id },
            context
          )
          let step = request.lastProcessingSteps[0]

          expect(request.state).toEqual(t.to)
          expect(pubsub.publish).toHaveBeenCalledWith({
            topic: "REQUEST_UPDATED",
            payload: { requestUpdated: request },
          })
          expect(pubsub.publish).toHaveBeenCalledWith({
            topic: `REQUEST_UPDATED_${currentUser.id}`,
            payload: { requestUpdated: request },
          })

          expect(pubsub.publish).toHaveBeenCalledWith({
            topic: `PROCESSING_STEP_ADDED`,
            payload: { processingStepAdded: step },
          })
          expect(pubsub.publish).toHaveBeenCalledWith({
            topic: `PROCESSING_STEP_ADDED_REQUEST:${request.id}`,
            payload: { processingStepAdded: step },
          })
          expect(pubsub.publish).toHaveBeenCalledWith({
            topic: `PROCESSING_STEP_ADDED_PROCESSOR:${currentUser.id}`,
            payload: { processingStepAdded: step },
          })
          expect(pubsub.publish).toHaveBeenCalledWith({
            topic: `PROCESSING_STEP_ADDED_REQUEST:${request.id}_PROCESSOR:${currentUser.id}`,
            payload: { processingStepAdded: step },
          })
        })
      })
    })
  })

  describe("user is not a processor", () => {
    beforeAll(async () => {
      const tokenPayload = {
        user: { name: "TEST_USER" },
        roles: [{ name: "member" }],
      }
      policy = policyEngine.policy(tokenPayload)
      context = { tokenPayload, policy, currentUser, pubsub }
    })

    describe("processingSteps", () => {
      it("does not include internal steps", async () => {
        const step = await db.ProcessingStep.create({
          requestID: 1,
          type: "internal",
        })

        let steps = await resolvers.Query.processingSteps(
          null,
          { requestID: 1 },
          context
        )

        expect(steps.items.find((i) => i.id === step.id)).not.toBeDefined()
      })
    })

    describe("requests", () => {
      it("does not include requests created by other users", async () => {
        const request = await db.Request.create({
          requesterID: currentUser.id + 10,
        })

        let requests = await resolvers.Query.requests(null, {}, context)
        expect(
          requests.items.find((i) => i.id === request.id)
        ).not.toBeDefined()
      })
    })

    describe("deleteRequests", () => {
      it("destroys requests", async () => {
        const request1 = await db.Request.create({
          requesterID: currentUser.id + 1,
        })
        const request2 = await db.Request.create({
          requesterID: currentUser.id + 1,
        })

        await request1.performStateTransition("close", {
          processor: currentUser,
        })
        await request2.performStateTransition("close", {
          processor: currentUser,
        })

        await expect(
          resolvers.Mutation.deleteRequests(
            null,
            { id: [request1.id, request2.id] },
            context
          )
        ).rejects.toThrowError()
      })
    })

    describe("startProcessing", () => {
      let request
      beforeEach(async () => {
        request = await db.Request.create({ requesterID: currentUser.id })
      })

      it("should not change the state", async () => {
        await expect(
          resolvers.Mutation.startProcessing(
            null,
            { requestID: request.id },
            context
          )
        ).rejects.toThrowError()
      })
    })
  })
})
