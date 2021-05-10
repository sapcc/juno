require("dotenv").config()

const {
  ApolloServer,
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server")

const typeDefs = require("./graphql/typeDefs/index")
const resolvers = require("./graphql/resolvers/index")

const { connect } = require("./dataStore")
const identityProvider = require("./identityProvider.js")

/**
 * Creates a apollo server with database connection.
 * @param {Object} options
 */
const createServer = async ({
  mongoHost,
  dbName,
  identityHost,
  useAuthentication,
}) => {
  // create and cache db connection
  const db = await connect(mongoHost, dbName)
  const { verifyAuthToken } = identityProvider(identityHost)

  // Create Apollo Server
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    cors: {
      origin: /.*\.cloud\.sap$/,
    },
    context: async ({ req }) => {
      // The context function is executed before the Resolvers on each request!
      let data = { db }

      // validate authentication unless deactivated
      if (useAuthentication !== false) {
        // get authToken from headers
        data.authToken = req.headers["x-auth-token"]
        // ensure authToken is presented
        if (!data.authToken)
          throw new AuthenticationError(
            "No auth token provided. Could not find x-auth-token header!"
          )
        // verify authToken from the Identity Provider (Keystone)
        data.tokenPayload = await verifyAuthToken(data.authToken).catch((e) => {
          throw new ForbiddenError(e)
        })
      }

      // enrich the context with authToken, token payload and database
      return data
    },
  })

  return server
}

module.exports = {
  createServer,
}
