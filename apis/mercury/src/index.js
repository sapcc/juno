require("dotenv").config()
const { ApolloServer } = require("apollo-server")
const fs = require("fs")
const path = require("path")
const resolvers = require("./resolvers")
const { connect, close, db } = require("./dataStore")
const { validateToken } = require("./tokenHandler")

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  cors: {
    origin: /.*\.cloud\.sap$/,
  },
  context: async ({ req, res }) => {
    // Get the user token from the headers.
    // TODO: validate token against keystone and cache the verification if possible.
    const token = req.headers["x-auth-token"] || ""
    if (!token) {
      return res
        .status(401)
        .send("No token provided. Could not find x-auth-token header!")
    }
    console.log("Token is presented!")

    const tokenPayload = await validateToken(token).catch((e) => {
      console.log("ERROR:", e)
      res.status(403).send("Could not validate token.")
    })
    if (!tokenPayload) return res.status(403).send("Could not validate token.")
    console.log("Token is valid!")

    return { db: db(), user: tokenPayload ? tokenPayload.user : null }
  },
})

server
  .listen({ port: process.env.PORT })
  .then(({ url }) => console.log(`Server is running on ${url}`))
  .then(() => {
    console.log("Connect to database...")
    connect()
  })
  .then(() => console.log("connected!"))

// close database connection on exit
process.on("exit", close)
