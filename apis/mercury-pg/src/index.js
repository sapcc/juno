require("dotenv").config()

// Import Server
const createServer = require("./server.js")

// Create and run the server!
createServer({
  logger: true,
  graphiql: true,
  identityHost: process.env.IDENTITY_HOST,
  useAuthentication: true,
}).then((server) => {
  server
    .listen(process.env.PORT, "0.0.0.0")
    .then((url) => server.log.info(`server listening on ${url}`))
    .catch((error) => {
      server.log.error(error)
      process.exit(1)
    })
})
