require("dotenv").config()

const { createServer } = require("./server")

const mongoHost = process.env.MONGO_HOST
const port = process.env.PORT
const identityHost = process.env.IDENTITY_HOST

createServer({
  mongoHost,
  dbName: "mercury",
  identityHost,
  useAuthentication: process.env.NODE_ENV === "production",
})
  .then((server) => server.listen({ port }))
  .then(({ url }) => console.log(`Server is running on ${url}`))
