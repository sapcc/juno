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

const buildContext = async ({ authToken, region }) => {
  const data = { authToken, region }

  // use authentication
  if (!data.authToken)
    throw new HTTPError(400, `X-Auth-Token header is required!`)

  if (!data.region)
    throw new HTTPError(400, `X-Auth-Region header is required!`)

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
    subscription: {
      onConnect: async (connectionParams) => {
        const headers = {}
        const payload = connectionParams.payload || {}
        // keys to lower case
        for (let key in payload) headers[key.toLowerCase()] = payload[key]
        // build and return context variables
        return await buildContext({
          authToken: headers["x-auth-token"],
          region: headers["x-auth-region"],
        })
      },
    },
    context: async (request, _reply) => {
      return await buildContext({
        authToken: request.headers["x-auth-token"],
        region: request.headers["x-auth-region"],
      })
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
