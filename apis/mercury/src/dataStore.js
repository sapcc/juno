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

/**
 * This function connects to the mongo database.
 * Once connected it stores the reference to database in _db.
 */
async function connect() {
  if (!_db) {
    // if client was disconnected
    if (!client.isConnected()) await client.connect()
    // get the database by name
    _db = client.db(dbName)
  }

  return _db
}

let _dbCollections
/**
 * This function returns the database collections.
 * The collections are cached for performance reasons!
 */
function getDB() {
  if (!_db)
    throw new Error("database is not connected! Please call connect() first.")
  if (!_dbCollections) {
    _dbCollections = {
      Requests: _db.collection("requests"),
      Users: _db.collection("users"),
    }
  }
  return _dbCollections
}

// exports connect, getDB and close
module.exports = {
  connect,
  getDB,
  close: () => client.close,
}
