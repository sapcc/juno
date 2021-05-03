require("dotenv").config()
const { ApolloServer } = require("apollo-server")
const fs = require("fs")
const path = require("path")
const { connect, close } = require("./dataStore")

// connect()
//   .then((db) => db.collection("documents"))
//   .then((collection) => {
//     collection.insertMany([{ a: 1 }, { a: 2 }, { a: 3 }])
//     return collection
//   })
//   .then((collection) => collection.find({}).toArray())
//   .then((items) => {
//     console.log("================ALL ITEMS", items)
//   })
//   .finally(close)

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL",
  },
]

// 1
let idCount = links.length
const resolvers = {
  Query: {
    info: () => `I am an info`,
    // feed: () => links,
    feed: async () => connect().then((db) => db.collection("links")),
  },
  Mutation: {
    // 2
    createLink: (parent, args) => {
      const link = {
        id: `link-${idCount++}`,
        description: args.description,
        url: args.url,
      }
      links.push(link)
      throw new Error("sadasdsad")
      return link
    },
    updateLink: (parent, args) => {
      const link = links.find((l) => l.id === args.id)
      if (link) {
        link.description = args.description
        link.url = args.url
        return link
      }
    },
    deleteLink: (parent, args) => {
      const index = links.findIndex((l) => l.id === args.id)
      if (index >= 0) {
        return links.splice(index, 1)
      }
    },
  },
}

const server = new ApolloServer({
  typeDefs: fs.readFileSync(path.join(__dirname, "schema.graphql"), "utf8"),
  resolvers,
  context: async ({ req }) => {
    await connect()
    // Note: This example uses the `req` argument to access headers,
    // but the arguments received by `context` vary by integration.
    // This means they vary for Express, Koa, Lambda, etc.
    //
    // To find out the correct arguments for a specific integration,
    // see https://www.apollographql.com/docs/apollo-server/api/apollo-server/#middleware-specific-context-fields

    // Get the user token from the headers.
    const token = req.headers.authorization || ""

    console.log("======TOKEN", token)
  },
})

server
  .listen({ port: process.env.PORT })
  .then(({ url }) => console.log(`Server is running on ${url}`))
