const db = require("../../../src/db/models")
const resolvers = require("../../../src/graphql/resolvers")
const policyEngine = require("policy-engine")(
  require("../../../config/policy.json")
)
const { Op } = require("sequelize")

describe("graphql resolvers", () => {
  describe("user is processor", () => {
    let policy, currentUser, context
    beforeAll(async () => {
      policy = policyEngine.policy({
        user: { name: "RESOLVERS_TEST" },
        roles: [{ name: "resource_admin" }],
      })
      currentUser = await db.User.createOrUpdate({ name: "RESOLVERS_TEST" })
      context = { policy, currentUser }
    })

    describe("profile", () => {
      it("returns current user's infos", async () => {
        const profile = await resolvers.Query.profile(null, {}, context)
        expect(profile.name).toEqual("RESOLVERS_TEST")
      })
    })

    describe("processingSteps", () => {
      let findAll
      beforeEach(() => {
        findAll = jest.spyOn(db.ProcessingStep, "findAll")
      })
      afterEach(() => {
        if (findAll) findAll.mockRestore()
      })

      it("returns request steps", async () => {
        await resolvers.Query.processingSteps(null, { requestID: 1 }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { requestID: 1 },
          offset: 0,
          limit: 20,
        })
      })
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
        await resolvers.Query.requests(null, {}, context)

        expect(findAll).toHaveBeenCalledWith({
          where: {},
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
          await resolvers.Query.requests(null, { [prop]: "value" }, context)
          expect(findAll).toHaveBeenCalledWith({
            where: { [prop]: "value" },
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
          await resolvers.Query.requests(
            null,
            { [prop]: ["value1", "value2"] },
            context
          )
          expect(findAll).toHaveBeenCalledWith({
            where: { [prop]: ["value1", "value2"] },
            limit: 20,
            offset: 0,
          })
        })
      })

      it(`returns requests olderThan`, async () => {
        const now = Date.now()
        await resolvers.Query.requests(null, { olderThan: now }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { createdAt: { [Op.lt]: now } },
          limit: 20,
          offset: 0,
        })
      })
      it(`returns requests newerThan`, async () => {
        const now = Date.now()
        await resolvers.Query.requests(null, { newerThan: now }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { createdAt: { [Op.gt]: now } },
          limit: 20,
          offset: 0,
        })
      })
    })
  })

  /***********************USER IS NOT A PROCESSOR  *****************/
  describe("user is requester", () => {
    let policy, currentUser, context
    beforeAll(async () => {
      policy = policyEngine.policy({
        user: { name: "REQUESTER" },
        roles: [{ name: "member" }],
      })
      currentUser = await db.User.createOrUpdate({ name: "REQUESTER" })
      context = { policy, currentUser }
    })

    describe("profile", () => {
      it("returns current user's infos", async () => {
        const profile = await resolvers.Query.profile(null, {}, context)
        expect(profile.name).toEqual("REQUESTER")
      })
    })

    describe("processingSteps", () => {
      let findAll
      beforeEach(() => {
        findAll = jest.spyOn(db.ProcessingStep, "findAll")
      })
      afterEach(() => {
        if (findAll) findAll.mockRestore()
      })

      it("queries processing steps", async () => {
        await resolvers.Query.processingSteps(null, { requestID: 1 }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { requestID: 1, type: "public" },
          offset: 0,
          limit: 20,
        })
      })

      it("returns request steps items", async () => {
        const response = await resolvers.Query.processingSteps(
          null,
          { requestID: 1 },
          context
        )
        expect(response.items).toBeDefined()
      })

      it("returns request paginate infos", async () => {
        const response = await resolvers.Query.processingSteps(
          null,
          { requestID: 1 },
          context
        )
        expect(response.pageInfo).toBeDefined()
      })

      it("requests next page off processing steps", async () => {
        await resolvers.Query.processingSteps(
          null,
          { requestID: 1, page: 2 },
          context
        )
        expect(findAll).toHaveBeenCalledWith({
          where: { requestID: 1, type: "public" },
          offset: 20,
          limit: 20,
        })
      })
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
        await resolvers.Query.requests(null, {}, context)

        expect(findAll).toHaveBeenCalledWith({
          where: { requesterID: currentUser.id },
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
          await resolvers.Query.requests(null, { [prop]: "value" }, context)
          expect(findAll).toHaveBeenCalledWith({
            where: { requesterID: currentUser.id, [prop]: "value" },
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
          await resolvers.Query.requests(
            null,
            { [prop]: ["value1", "value2"] },
            context
          )
          expect(findAll).toHaveBeenCalledWith({
            where: {
              requesterID: currentUser.id,
              [prop]: ["value1", "value2"],
            },
            limit: 20,
            offset: 0,
          })
        })
      })

      it(`returns requests olderThan`, async () => {
        const now = Date.now()
        await resolvers.Query.requests(null, { olderThan: now }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { requesterID: currentUser.id, createdAt: { [Op.lt]: now } },
          limit: 20,
          offset: 0,
        })
      })
      it(`returns requests newerThan`, async () => {
        const now = Date.now()
        await resolvers.Query.requests(null, { newerThan: now }, context)
        expect(findAll).toHaveBeenCalledWith({
          where: { requesterID: currentUser.id, createdAt: { [Op.gt]: now } },
          limit: 20,
          offset: 0,
        })
      })
    })
  })
})
