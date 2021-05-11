const fastify = require("fastify")
// Import external dependancies
const gql = require("fastify-gql")

// Import GraphQL Schema
const schema = require("./schema")

// Require external modules
const mongoose = require("mongoose")

module.exports = async (options) => {
  const mongoURL = options.mongoURL
  const graphiql = options.graphiql !== false
  delete options.mongoURL
  delete options.graphiql
  const serverOptions = { logger: true, ...options }
  const server = fastify(serverOptions)
  server.register(gql, {
    schema,
    graphiql,
  })

  console.log(":::::::::::::::")
  await mongoose
    .connect(mongoURL)
    .then(() => console.log("MongoDB connected..."))
    .catch((err) => console.log(err))

  console.log("===================")
  return server
}
