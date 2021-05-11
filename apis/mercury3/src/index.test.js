const createServer = require("./server")
const serverOptions = {
  mongoURL: "mongodb://localhost:27017/mercury-test",
}

it("should return all requests", async () => {
  const server = await createServer(serverOptions)
  const response = await server.inject({
    method: "POST",
    url: "/graphql",
    body: '{"query": "{ requests { title } }"}',
  })

  console.log("status code: ", response.statusCode)
  console.log("body: ", response.body)
})
