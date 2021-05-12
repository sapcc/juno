const Fixtures = require("node-mongodb-fixtures")
const createServer = require("../server")
const mongoURL = "mongodb://localhost:27017/mercury-test"
const fixtures = new Fixtures({ dir: "src/tests/fixtures", mute: true })

describe("requests", () => {
  let server
  beforeEach(async () => {
    await fixtures
      .connect(mongoURL)
      .then(() => fixtures.unload())
      .then(() => fixtures.load())
      .then(() => fixtures.disconnect())

    server = await createServer({ mongoURL, logger: false })
  })

  describe("all requests", () => {
    let response
    beforeEach(async () => {
      response = await server.inject({
        method: "POST",
        url: "/graphql",
        headers: { "Content-Type": "application/json" },
        payload: '{"query": "{ requests { title } }"}',
      })
    })

    it("should respond to requests", () => {
      expect(response.statusCode).toEqual(200)
      console.log("status code: ", response.statusCode)
      console.log("body: ", response.body)
    })

    it("should return all requests", () => {
      console.log("===============", response.body)
      const body = JSON.parse(response.body)
      expect(body.data.requests.length).toEqual(4)
    })
  })
})
