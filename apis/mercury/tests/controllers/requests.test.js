const db = require("../../src/db/models")
const RequestsController = require("../../src/controllers/requests")
const policyEngine = require("policy-engine")(
  require("../../config/policy.json")
)
const { Op } = require("sequelize")

describe("requests controller", () => {
  describe("user is processor", () => {
    let policy, currentUser, context
    beforeAll(async () => {
      const tokenPayload = {
        user: { name: "RESOLVERS_TEST" },
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
      currentUser = await db.User.createOrUpdate({ name: "RESOLVERS_TEST" })
      context = { policy, currentUser, tokenPayload }
    })

    describe("index", () => {
      let findAll
      beforeEach(() => {
        findAll = jest.spyOn(db.Request, "findAll")
      })
      afterEach(() => {
        if (findAll) findAll.mockRestore()
      })

      it("all requests", async () => {
        await RequestsController.index({}, context)

        expect(findAll).toHaveBeenCalledWith({
          where: {},
          order: [["createdAt", "DESC"]],
          limit: 20,
          offset: 0,
        })
      })

      const filters = [
        "id",
        "state",
        "priority",
        "kind",
        "region",
        "domainID",
        "projectID",
      ]

      filters.forEach((prop) => {
        it(`returns requests by ${prop}`, async () => {
          await RequestsController.index({ [prop]: "value" }, context)
          expect(findAll).toHaveBeenCalledWith({
            where: { [prop]: "value" },
            order: [["createdAt", "DESC"]],
            limit: 20,
            offset: 0,
          })
        })
      })

      filters.forEach((prop) => {
        it(`returns requests by ${prop.replace(
          /^(.+)y$/,
          "$1ie"
        )}s`, async () => {
          await RequestsController.index(
            { [prop]: ["value1", "value2"] },
            context
          )
          expect(findAll).toHaveBeenCalledWith({
            where: { [prop]: ["value1", "value2"] },
            order: [["createdAt", "DESC"]],
            limit: 20,
            offset: 0,
          })
        })
      })

      it(`returns requests olderThan`, async () => {
        const now = Date.now()
        await RequestsController.index({ olderThan: now }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { createdAt: { [Op.lt]: now } },
          order: [["createdAt", "DESC"]],
          limit: 20,
          offset: 0,
        })
      })
      it(`returns requests newerThan`, async () => {
        const now = Date.now()
        await RequestsController.index({ newerThan: now }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { createdAt: { [Op.gt]: now } },
          order: [["createdAt", "DESC"]],
          limit: 20,
          offset: 0,
        })
      })
    })

    describe("create", () => {
      it("creates a new request", async () => {
        const request = await RequestsController.create({}, context)
        expect(request).toBeDefined()
        expect(request.state).toEqual("open")
      })

      it("creates a new request with comment", async () => {
        const request = await RequestsController.create(
          { comment: "COMMENT" },
          context
        )
        const processingSteps = await request.getLastProcessingSteps()
        expect(processingSteps.length).toEqual(1)
      })
    })

    describe("update", () => {
      it("updates a request", async () => {
        const request = await db.Request.create({
          kind: "project",
          state: "open",
          requesterID: currentUser.id,
        })

        await RequestsController.update(
          { id: request.id, kind: "zone" },
          context
        )
        await request.reload()
        expect(request.kind).toEqual("zone")
      })
    })

    describe("destroy", () => {
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

        const result = await RequestsController.destroy(
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

  /***********************USER IS NOT A PROCESSOR  *****************/
  describe("user is requester", () => {
    let policy, currentUser, context
    beforeAll(async () => {
      const tokenPayload = {
        user: { name: "REQUESTER" },
        roles: [{ name: "member" }],
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
      currentUser = await db.User.createOrUpdate({ name: "REQUESTER" })
      context = { policy, currentUser, tokenPayload }
    })

    describe("requests", () => {
      let findAll
      beforeEach(() => {
        findAll = jest.spyOn(db.Request, "findAll")
      })
      afterEach(() => {
        if (findAll) findAll.mockRestore()
      })
      it("all requests", async () => {
        await RequestsController.index({}, context)

        expect(findAll).toHaveBeenCalledWith({
          where: { requesterID: currentUser.id },
          order: [["createdAt", "DESC"]],
          limit: 20,
          offset: 0,
        })
      })

      const filters = [
        "id",
        "state",
        "priority",
        "kind",
        "region",
        "domainID",
        "projectID",
      ]

      filters.forEach((prop) => {
        it(`returns requests by ${prop}`, async () => {
          await RequestsController.index({ [prop]: "value" }, context)
          expect(findAll).toHaveBeenCalledWith({
            where: { requesterID: currentUser.id, [prop]: "value" },
            order: [["createdAt", "DESC"]],
            limit: 20,
            offset: 0,
          })
        })
      })

      filters.forEach((prop) => {
        it(`returns requests by ${prop.replace(
          /^(.+)y$/,
          "$1ie"
        )}s`, async () => {
          await RequestsController.index(
            { [prop]: ["value1", "value2"] },
            context
          )
          expect(findAll).toHaveBeenCalledWith({
            where: {
              requesterID: currentUser.id,
              [prop]: ["value1", "value2"],
            },
            order: [["createdAt", "DESC"]],
            limit: 20,
            offset: 0,
          })
        })
      })

      it(`returns requests olderThan`, async () => {
        const now = Date.now()
        await RequestsController.index({ olderThan: now }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { requesterID: currentUser.id, createdAt: { [Op.lt]: now } },
          order: [["createdAt", "DESC"]],
          limit: 20,
          offset: 0,
        })
      })
      it(`returns requests newerThan`, async () => {
        const now = Date.now()
        await RequestsController.index({ newerThan: now }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { requesterID: currentUser.id, createdAt: { [Op.gt]: now } },
          order: [["createdAt", "DESC"]],
          limit: 20,
          offset: 0,
        })
      })
    })

    describe("create", () => {
      it("creates a new request", async () => {
        const request = await RequestsController.create({}, context)
        expect(request).toBeDefined()
        expect(request.state).toEqual("open")
      })

      it("creates a new request with comment", async () => {
        const request = await RequestsController.create(
          { comment: "COMMENT" },
          context
        )
        const processingSteps = await request.getLastProcessingSteps()
        expect(processingSteps.length).toEqual(1)
      })
    })

    describe("update", () => {
      it("updates a request", async () => {
        const request = await db.Request.create({
          kind: "project",
          state: "open",
          requesterID: currentUser.id,
        })

        await RequestsController.update(
          { id: request.id, kind: "zone" },
          context
        )
        await request.reload()
        expect(request.kind).toEqual("zone")
      })
    })

    describe("destroy", () => {
      it("throws an error", async () => {
        const request = await db.Request.create({
          kind: "project",
          state: "closed",
          requesterID: currentUser.id,
        })

        await request.performStateTransition("close", {
          processor: currentUser,
        })

        await expect(
          RequestsController.destroy({ id: [request.id] }, context)
        ).rejects.toThrowError()
      })
    })
  })
})
