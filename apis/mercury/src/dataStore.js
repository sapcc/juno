const { MongoClient } = require("mongodb")

// Connection URL
const url = process.env.MONGO_ENDPOINT_URL
// Create the client
const client = new MongoClient(url, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})

// Database Name
const dbName = process.env.NODE_ENV === "test" ? "test" : "mercury"

// cache reference to database
let _db

// Connect to the database and cache the pointer to database.
const connect = async () => {
  if (!_db) {
    await client.connect()
    _db = client.db(dbName)
  }
  return _db
}

// Try to close connection
const close = () => client.close()

module.exports = { connect, close }
