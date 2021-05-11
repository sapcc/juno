// Import Server
const createServer = require("./server.js")

// Create and run the server!
createServer({
  logger: true,
  graphiql: true,
  mongoURL: "mongodb://localhost:27017/mercury",
}).then((server) => {
  server
    .listen(process.env.PORT, "0.0.0.0")
    .then((url) => server.log.info(`server listening on ${url}`))
    .catch((error) => {
      server.log.error(err)
      process.exit(1)
    })
})
