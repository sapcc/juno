require("dotenv").config()

const createServer = require("../server")
const mongoURL = `${process.env.MONGO_URL}-test`

describe("auth", () => {
  let server
  beforeEach(async () => {
    server = await createServer({
      mongoURL,
      identityHost: process.env.IDENTITY_HOST,
      useAuthentication: true,
      logger: false,
    })
  })

  describe("no authToken", () => {
    it("should respond to requests", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/graphql",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": "TOKEN",
        },
        payload: '{"query": "{ requests { title } }"}',
      })
      expect(response.statusCode).toEqual(200)
      console.log("status code: ", response.statusCode)
      console.log("body: ", response.body)
    })
  })
})
