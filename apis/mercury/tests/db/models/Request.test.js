const db = require("../../../src/db/models")
const Request = db.Request

describe("src/db/models/request", () => {
  let request, requester, steps

  beforeAll(async () => {
    // await prepareDB()
    requester = await db.User.findOne()

    request = await Request.create({
      requesterID: requester.id,
      kind: "project",
      priority: 0,
      subject: "test",
      description: "blabla",
      payload: '{"test":"hello"}',
      region: "qa-de-1",
      domainID: "12345",
      domainName: "test",
      projectID: "12345",
      projectName: "test",
      tags: '[{"name":"test", "value":"hello"}]',
      state: "open",
      stateDetails: "open",
    })
  })

  it("id is set", () => {
    expect(request.id).toBeDefined()
  })

  it("createdAt is set", () => {
    expect(request.createdAt).toBeDefined()
  })

  it("updatedAt is set", () => {
    expect(request.updatedAt).toBeDefined()
  })

  it("changes updatedAt", async () => {
    const updatedAt = request.updatedAt
    request.subject = "NEW"
    await request.save()
    expect(request.updatedAt).not.toEqual(updatedAt)
  })

  describe("associations", () => {
    it("has requester association", async () => {
      const requesterAssociation = await request.requester
      expect(requesterAssociation).toBeDefined()
    })

    it("has lastProcessor association", async () => {
      const lastProcessor = await request.lastProcessor
      expect(lastProcessor).toBeDefined()
    })

    it("has processingSteps", async () => {
      const processingSteps = await request.getLastProcessingSteps()
      expect(processingSteps).toBeDefined()
    })

    it("has 0 processingSteps", async () => {
      const processingSteps = await request.getLastProcessingSteps()
      expect(processingSteps.length).toEqual(0)
    })
  })

  describe("toState", () => {
    let newRequest
    beforeAll(async () => {
      newRequest = await Request.create({ state: "open" })
    })

    describe("to open", () => {
      it("should transfer addNote from open to open", () => {
        newRequest.state = "open"
        expect(newRequest.toState("addNote")).toEqual("open")
      })
      it("should transfer reopen from rejected to open", () => {
        newRequest.state = "rejected"
        expect(newRequest.toState("reopen")).toEqual("open")
      })
    })

    describe("to processing", () => {
      it("should transfer startProcessing from open to processing", () => {
        newRequest.state = "open"
        expect(newRequest.toState("startProcessing")).toEqual("processing")
      })

      it("should transfer process from processing to processing", () => {
        newRequest.state = "processing"
        expect(newRequest.toState("process")).toEqual("processing")
      })

      it("should transfer answer from waiting to processing", async () => {
        newRequest.state = "waiting"
        await newRequest.save()
        expect(newRequest.toState("answer")).toEqual("processing")
      })
    })

    describe("to waiting", () => {
      it("should transfer askRequester from open to waiting", async () => {
        newRequest.state = "open"
        await newRequest.save()
        expect(newRequest.toState("askRequester")).toEqual("waiting")
      })

      it("should transfer askRequester from processing to waiting", async () => {
        newRequest.state = "processing"
        await newRequest.save()
        expect(newRequest.toState("askRequester")).toEqual("waiting")
      })
    })

    describe("to approved", () => {
      it("should transfer approve from open to approved", async () => {
        newRequest.state = "open"
        await newRequest.save()
        expect(newRequest.toState("approve")).toEqual("approved")
      })

      it("should transfer approve from processing to approved", async () => {
        newRequest.state = "processing"
        await newRequest.save()
        expect(newRequest.toState("approve")).toEqual("approved")
      })

      it("should transfer approve from waiting to approved", async () => {
        newRequest.state = "waiting"
        await newRequest.save()
        expect(newRequest.toState("approve")).toEqual("approved")
      })
    })

    describe("to rejected", () => {
      it("should transfer reject from open to rejected", async () => {
        newRequest.state = "open"
        await newRequest.save()
        expect(newRequest.toState("reject")).toEqual("rejected")
      })

      it("should transfer reject from processing to rejected", async () => {
        newRequest.state = "processing"
        await newRequest.save()
        expect(newRequest.toState("reject")).toEqual("rejected")
      })

      it("should transfer reject from waiting to rejected", async () => {
        newRequest.state = "waiting"
        await newRequest.save()
        expect(newRequest.toState("reject")).toEqual("rejected")
      })
    })

    describe("to closed", () => {
      it("should transfer close from open to closed", async () => {
        newRequest.state = "open"
        await newRequest.save()
        expect(newRequest.toState("close")).toEqual("closed")
      })

      it("should transfer close from processing to closed", async () => {
        newRequest.state = "processing"
        await newRequest.save()
        expect(newRequest.toState("close")).toEqual("closed")
      })

      it("should transfer close from waiting to closed", async () => {
        newRequest.state = "waiting"
        await newRequest.save()
        expect(newRequest.toState("close")).toEqual("closed")
      })

      it("should transfer close from rejected to closed", async () => {
        newRequest.state = "rejected"
        await newRequest.save()
        expect(newRequest.toState("close")).toEqual("closed")
      })
    })
  })

  describe("performStateTransition", () => {
    let newRequest
    beforeEach(async () => {
      const creator = await db.User.create({ name: "NEW_USER" })
      const processor = await db.User.create({ name: "NEW_USER" })
      newRequest = await Request.create({
        requesterID: creator.id,
        state: "open",
      })
      await newRequest.performStateTransition("addNote", {
        processor,
        kind: "note",
        type: "public",
        comment: "some notes",
      })
    })

    it("changes the state", async () => {
      expect(newRequest.state).toEqual("open")
    })

    it("creates a step", async () => {
      const steps = await newRequest.getLastProcessingSteps()
      expect(steps.length).toEqual(1)
    })

    it("created step kind is note", async () => {
      const steps = await newRequest.getLastProcessingSteps()
      expect(steps[0].kind).toEqual("note")
    })
    it("created step type is public", async () => {
      const steps = await newRequest.getLastProcessingSteps()
      expect(steps[0].type).toEqual("public")
    })
    it("created step comment is some notes", async () => {
      const steps = await newRequest.getLastProcessingSteps()
      expect(steps[0].comment).toEqual("some notes")
    })
    it("created step fromState is open", async () => {
      const steps = await newRequest.getLastProcessingSteps()
      expect(steps[0].fromState).toEqual("open")
    })
    it("created step toState is open", async () => {
      const steps = await newRequest.getLastProcessingSteps()
      expect(steps[0].toState).toEqual("open")
    })
    it("created step transition is addNote", async () => {
      const steps = await newRequest.getLastProcessingSteps()
      expect(steps[0].transition).toEqual("addNote")
    })
    it("created step processor is defined", async () => {
      const steps = await newRequest.getLastProcessingSteps()
      expect(steps[0].processor).toBeDefined()
    })
    it("last processor is defined", async () => {
      const lastProcessor = await newRequest.lastProcessor
      expect(lastProcessor).toBeDefined()
    })
  })
})
