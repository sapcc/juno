const db = require("../../src/db/models")
const resolvers = require("../../src/graphql/resolvers")
const policyEngine = require("policy-engine")(
  require("../../config/policy.json")
)

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

    describe("queries", () => {
      it("requests", async () => {
        const result = await resolvers.Query.requests(null, {}, context)
        expect(Array.isArray(result)).toEqual(true)
      })
    })
  })
})
