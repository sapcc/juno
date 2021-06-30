const db = require("../../../src/db/models")
const ProcessingStep = db.ProcessingStep
// const prepareDB = require("../../fixtures")

describe("src/db/models/processingstep", () => {
  let step, request, user, refStep
  beforeAll(async () => {
    // await prepareDB()
    request = await db.Request.findOne()
    user = await db.User.findOne()
    refStep = await ProcessingStep.findOne()

    step = await ProcessingStep.create({
      requestID: request.id,
      processorID: user.id,
      type: "public",
      kind: "solution",
      comment: "TEST",
      referenceStepID: refStep.id,
      fromState: "open",
      toState: "open",
      transition: "open",
    })
  })

  it("id is set", () => {
    expect(step.id).toBeDefined()
  })

  it("createdAt is set", () => {
    expect(step.createdAt).toBeDefined()
  })

  it("updatedAt is set", () => {
    expect(step.updatedAt).toBeDefined()
  })

  it("changes updatedAt", async () => {
    const updatedAt = step.updatedAt
    step.comment = "NEW"
    await step.save()
    expect(step.updatedAt).not.toEqual(updatedAt)
  })

  describe("associations", () => {
    it("has referenceStep association", async () => {
      const refStep = await step.referenceStep
      expect(refStep).toBeDefined()
    })

    it("has processor association", async () => {
      const processor = await step.processor
      expect(processor).toBeDefined()
    })

    it("processor is user", async () => {
      const processor = await step.processor
      expect(processor.id).toEqual(user.id)
    })

    it("has request association", async () => {
      const request = await step.request
      expect(request).toBeDefined()
    })

    it("request exists", async () => {
      const r = await step.request
      expect(r.id).toEqual(request.id)
    })
  })
})
