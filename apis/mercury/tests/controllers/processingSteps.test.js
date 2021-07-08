const db = require("../../src/db/models")
const ProcessingStepsController = require("../../src/controllers/processingSteps")
const policyEngine = require("policy-engine")(
  require("../../config/policy.json")
)

describe("processingSteps controller", () => {
  describe("user is processor", () => {
    let findAll, policy, currentUser, context
    beforeAll(async () => {
      policy = policyEngine.policy({
        user: { name: "RESOLVERS_TEST" },
        roles: [{ name: "resource_admin" }],
      })
      currentUser = await db.User.createOrUpdate({ name: "RESOLVERS_TEST" })
      context = { policy, currentUser }
    })

    describe("index", () => {
      beforeEach(() => {
        findAll = jest.spyOn(db.ProcessingStep, "findAll")
      })
      afterEach(() => {
        if (findAll) findAll.mockRestore()
      })

      it("returns request steps", async () => {
        await ProcessingStepsController.index({ requestID: 1 }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { requestID: 1 },
          offset: 0,
          limit: 20,
        })
      })
    })
  })

  /***********************USER IS NOT A PROCESSOR  *****************/
  describe("user is requester", () => {
    let findAll, policy, currentUser, context
    beforeAll(async () => {
      policy = policyEngine.policy({
        user: { name: "REQUESTER" },
        roles: [{ name: "member" }],
      })
      currentUser = await db.User.createOrUpdate({ name: "REQUESTER" })
      context = { policy, currentUser }
    })

    beforeEach(() => {
      findAll = jest.spyOn(db.ProcessingStep, "findAll")
    })
    afterEach(() => {
      if (findAll) findAll.mockRestore()
    })

    it("queries processing steps", async () => {
      await ProcessingStepsController.index({ requestID: 1 }, context)
      expect(findAll).toHaveBeenCalledWith({
        where: { requestID: 1, type: "public" },
        offset: 0,
        limit: 20,
      })
    })

    it("returns request steps items", async () => {
      const response = await ProcessingStepsController.index(
        { requestID: 1 },
        context
      )
      expect(response.items).toBeDefined()
    })

    it("returns request paginate infos", async () => {
      const response = await ProcessingStepsController.index(
        { requestID: 1 },
        context
      )
      expect(response.pageInfo).toBeDefined()
    })

    it("requests next page off processing steps", async () => {
      await ProcessingStepsController.index({ requestID: 1, page: 2 }, context)
      expect(findAll).toHaveBeenCalledWith({
        where: { requestID: 1, type: "public" },
        offset: 20,
        limit: 20,
      })
    })
  })

  describe("update", () => {
    let policy, currentUser, context
    beforeAll(async () => {
      policy = policyEngine.policy({
        user: { name: "TEST" },
        roles: [{ name: "member" }],
      })
      currentUser = await db.User.createOrUpdate({ name: "TEST" })
      context = { policy, currentUser }
    })

    it("updates a step", async () => {
      let step = await db.ProcessingStep.create({
        kind: "note",
        fromState: "open",
        toState: "open",
        transition: "addNote",
        requestID: 1,
        processorID: currentUser.id,
        comment: "TEST",
      })

      step = await ProcessingStepsController.update(
        { id: step.id, kind: "zone" },
        context
      )

      expect(step.kind).toEqual("zone")
    })
  })
})
