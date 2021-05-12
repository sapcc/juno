const fastify = require("fastify")
// Import external dependancies
const gql = require("mercurius")

// Import GraphQL Schema
const schema = require("./schema")

// Require external modules
const mongoose = require("mongoose")

module.exports = async (options) => {
  let { mongoURL, graphiql, ...serverOptions } = options
  graphiql = graphiql !== false
  serverOptions = { logger: true, ...serverOptions }

  const server = fastify(serverOptions)
  server.register(gql, {
    schema,
    graphiql,
  })

  await mongoose
    .connect(mongoURL)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err))

  return server
}
