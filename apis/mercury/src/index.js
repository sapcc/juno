require("dotenv").config()

const { createServer } = require("./server")

const mongoHost = process.env.MONGO_HOST
const port = process.env.PORT
const identityHost = process.env.IDENTITY_HOST

createServer({ mongoHost, dbName: "mercury", identityHost })
  .then((server) => server.listen({ port }))
  .then(({ url }) => console.log(`Server is running on ${url}`))
