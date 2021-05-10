require("dotenv").config()
const { gql } = require("apollo-server")
const { createTestClient } = require("apollo-server-testing")
const { createTestServer } = require("./testServer")

describe("requests", () => {
  let client
  beforeEach(async () => {
    const server = await createTestServer()
    client = createTestClient(server)
  })

  it("returns all requests", async () => {
    const res = await client.query({ query: "{requests {id}}" })
    console.log(res.data.requests)
    expect(res.data.requests.length).toEqual(4)
  })

  it("returns request by id", async () => {
    const res = await client.query({ query: "{request(id: 1) {id}" })
    console.log(res)
    expect(res.data.length).toEqual(1)
  })
})
