const db = require("../../../src/db/models")
const User = db.User

describe("src/db/models/user", () => {
  let user
  beforeAll(async () => {
    user = await User.create({ name: "TEST" })
  })

  it("id is set", () => {
    expect(user.id).toBeDefined()
  })

  it("createdAt is set", () => {
    expect(user.createdAt).toBeDefined()
  })

  it("updatedAt is set", () => {
    expect(user.updatedAt).toBeDefined()
  })

  it("changes updatedAt", async () => {
    const updatedAt = user.updatedAt
    user.name = "NEW"
    await user.save()
    expect(user.updatedAt).not.toEqual(updatedAt)
  })

  describe("createOrUpdate", () => {
    it("creates a new user entry", async () => {
      const count = await User.count()
      const user = await User.createOrUpdate({
        name: "user1",
        email: "u.t@test.com",
        fullName: "Test User",
      })
      const newCount = await User.count()
      expect(newCount).toBeGreaterThan(count)
    })

    it("updates an existing user entry", async () => {
      const spy = jest.spyOn(User, "create")

      const user = await User.findOne()

      await User.createOrUpdate({
        name: user.name,
        email: "u.t@test.com",
        fullName: "Test User",
      })
      expect(spy).not.toHaveBeenCalled()
      await user.reload()

      expect(user.email).toEqual("u.t@test.com")
      spy.mockRestore()
    })
  })

  describe("associations", () => {
    it("has processingSteps association", async () => {
      const user = await User.findByPk(2)
      const processingSteps = await user.processingSteps
      expect(processingSteps).toBeDefined()
    })

    it("has createdRequests association", async () => {
      const user = await User.findByPk(1)
      const createdRequests = await user.createdRequests
      expect(createdRequests).toBeDefined()
    })
  })
})
