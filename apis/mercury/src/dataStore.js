const { MongoClient } = require("mongodb")

// Connection URL
let host = process.env.MONGO_HOST
// add default port if not poresent
if (host.indexOf(":") < 0) host = `${host}:27017`
const url = `mongodb://${process.env.MONGO_HOST}`

// Create the client
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

// Database Name
const dbName = process.env.NODE_ENV === "test" ? "test" : "mercury"

// db reference
let _db

const connect = async () => {
  if (!_db) {
    try {
      if (!client.isConnected()) await client.connect()
      _db = client.db(dbName)
    } catch (e) {
      console.log("--->error while connecting with graphql context (db)", e)
    }
  }
}

module.exports = {
  connect,
  close: () => client.close(),
  db: () => ({
    Requests: _db.collection("requests"),
    // Users: _db.collection("users"),
  }),
}
