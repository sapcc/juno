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

// Policy engine
const policyEngine = require("policy-engine")(require("../config/policy.json"))

// User
const { User } = require("./db/models")

const { HTTPError } = require("./errors")

const getIdentityHost = (region) => {
  if (region === "qa.global") return "https://identity-3-qa.global.cloud.sap"
  return process.env.IDENTITY_HOST.replace("%REGION%", region)
}

// create server function
module.exports = async (options) => {
  const { graphiql, ...serverOptions } = options

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
      data.authToken = request.headers["x-auth-token"]
      if (!data.authToken)
        throw new HTTPError(400, `X-Auth-Token header is required!`)

      if (!request.headers["x-auth-region"])
        throw new HTTPError(400, `X-Auth-Region header is required!`)

      data.region = request.headers["x-auth-region"]

      // add token payload to context
      data.tokenPayload = await verifyAuthToken(
        getIdentityHost(data.region),
        data.authToken
      ).catch(({ statusCode, message }) => {
        throw new HTTPError(
          statusCode,
          `Identity provider: ${message}. Make sure the token comes from the region: ${data.region}`
        )
      })

      // create or load current user from db and save it in context
      data.currentUser = await User.createOrUpdate({
        name: data.tokenPayload.user.name,
      })
      // create user policy based on token payload
      data.policy = policyEngine.policy(data.tokenPayload, {
        debug: process.env.NODE_ENV === "development",
      })

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
