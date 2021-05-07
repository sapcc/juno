require("dotenv").config()

const {
  ApolloServer,
  AuthenticationError,
  ForbiddenError,
} = require("apollo-server")

const typeDefs = require("./graphql/typeDefs")
const resolvers = require("./graphql/resolvers")

const { connect, getDB, close } = require("./dataStore")
const { verifyAuthToken } = require("./identityProvider.js")

// Create Apollo Server
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cors: {
    origin: /.*\.cloud\.sap$/,
  },
  context: async ({ req }) => {
    // The context function is executed before the Resolvers on each request!

    // get authToken from headers
    const authToken = req.headers["x-auth-token"] || ""
    // ensure authToken is presented
    if (!authToken)
      throw new AuthenticationError(
        "No auth token provided. Could not find x-auth-token header!"
      )
    // verify authToken from the Identity Provider (Keystone)
    const tokenPayload = await verifyAuthToken(authToken).catch((e) => {
      throw new ForbiddenError(e)
    })

    // get database
    const db = getDB()
    // enrich the context with authToken, token payload and database
    return { authToken, tokenPayload, db }
  },
})

server
  .listen({ port: process.env.PORT })
  .then(({ url }) => console.log(`Server is running on ${url}`))
  .then(() => {
    console.log("Connect to the database...")
    return connect()
  })
  .then(() => console.log("Connected!"))

// close database connection on exit
process.on("exit", close)
