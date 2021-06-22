// load package.json
const packageJson = require("../package.json")

const fastify = require("fastify")
// Import external dependancies
const gql = require("mercurius")

// Import CORS
const cors = require("fastify-cors")

// Import GraphQL Schema
const schema = require("./graphql/schema")

// Identity provider
const { verifyAuthToken } = require("./lib/identityProvider")

class HTTPError extends Error {
  constructor(statusCode, message) {
    super(message)
    // Ensure the name of this error is the same as the class name
    this.name = this.constructor.name
    this.statusCode = statusCode
    // This clips the constructor invocation from the stack trace.
    // It's not absolutely essential, but it does make the stack trace a little nicer.
    //  @see Node.js reference (bottom)
    Error.captureStackTrace(this, this.constructor)
  }
}

// create server function
module.exports = async (options) => {
  const { graphiql, identityHost, useAuthentication, ...serverOptions } =
    options

  const server = fastify(serverOptions)

  server.register(gql, {
    schema,
    graphiql: graphiql !== false && "playground",
    playgroundSettings: {
      "editor.fontFamily": "'Operator Mono', 'Monaco', monospace",
    },
    context: async (request, reply) => {
      const data = {}

      // use authentication
      if (useAuthentication !== false) {
        data.authToken = request.headers["x-auth-token"]
        if (!data.authToken)
          throw new HTTPError(400, `X-Auth-Token header is undefined!`)

        // TODO: init policy
        data.tokenPayload = await verifyAuthToken(
          identityHost,
          data.authToken
        ).catch(({ statusCode, message }) => {
          throw new HTTPError(statusCode, `Identity provider: ${message}`)
        })
      }

      // initialize permissions from token payload provided by data

      return data
    },
  })

  server.register(cors, {
    // allow cors for all subdomains of cloud.sap
    origin: /\.*cloud\.sap$/,
  })

  server.get("/", (request, reply) => {
    reply.send(
      JSON.stringify({
        name: packageJson.name,
        description: packageJson.description,
        version: packageJson.version,
        graphqlEndpoint: "/graphql",
        playgroundEndpoint: "/playground",
      })
    )
  })

  return server
}
