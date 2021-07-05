require("dotenv").config()

const identity = require("../src/lib/identityProvider")
jest.mock("../src/lib/identityProvider")

const createServer = require("../src/server")

describe("server", () => {
  let server
  beforeAll(async () => {
    server = await createServer({
      identityHost: process.env.IDENTITY_HOST,
      logger: false,
    })
  })

  describe("no auth token provided", () => {
    it("should respond to requests", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/graphql",
        headers: {
          "Content-Type": "application/json",
        },
        payload: '{"query": "{ requests { items { id } } }"}',
      })

      expect(response.statusCode).toEqual(400)
    })
  })

  describe("auth token exists", () => {
    describe("invalid x auth token", () => {
      beforeAll(async () => {
        identity.verifyAuthToken.mockRejectedValue({
          statusCode: 401,
          message: "Not authorized",
        })
      })

      it("should respond to requests", async () => {
        const response = await server.inject({
          method: "POST",
          url: "/graphql",
          headers: {
            "Content-Type": "application/json",
            "X-Auth-Token": "TOKEN",
            "X-Auth-Region": "qa-de-1",
          },
          payload: '{"query": "{ requests { items {id} } }"}',
        })
        expect(response.statusCode).toEqual(401)
      })
    })
  })

  describe("valid auth token", () => {
    beforeAll(async () => {
      identity.verifyAuthToken.mockResolvedValue({
        user: { name: "TEST" },
        roles: [{ name: "admin", id: "12345" }],
      })
    })

    it("should respond to requests", async () => {
      const response = await server.inject({
        method: "POST",
        url: "/graphql",
        headers: {
          "Content-Type": "application/json",
          "X-Auth-Token": "TOKEN",
          "X-Auth-Region": "qa-de-1",
        },
        payload: '{"query": "{ requests { items {id} } }"}',
      })

      expect(response.statusCode).toEqual(200)
    })
  })
})
