const db = require("../../src/db/models")
const UsersController = require("../../src/controllers/users")
const policyEngine = require("policy-engine").default(
  require("../../config/policy.json")
)

describe("graphql resolvers", () => {
  let policy, currentUser, context
  beforeAll(async () => {
    policy = policyEngine.policy({
      user: { name: "RESOLVERS_TEST" },
    })
    currentUser = await db.User.createOrUpdate({ name: "RESOLVERS_TEST" })
    context = { policy, currentUser }
  })

  describe("show", () => {
    it("returns current user's infos", async () => {
      const profile = await UsersController.show({}, context)
      expect(profile.name).toEqual("RESOLVERS_TEST")
    })
  })

  describe("update", () => {
    it("updates email", async () => {
      const profile = await UsersController.update(
        { email: "test@test.com" },
        context
      )
      expect(profile.email).toEqual("test@test.com")
    })
  })
})
