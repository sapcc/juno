const { MongoClient } = require("mongodb")

// Create the client
const clientOptions = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
}

// Connection URL
const mongoURL = (host) => {
  let url = host
  // add default port if not poresent
  if (url.indexOf("mongodb://") < 0) url = `mongodb://${url}`
  if (url.indexOf(":") < 8) url = `${url}:27017`
  return url
}

// db reference
let db

/**
 * This function connects to the mongo database.
 * Once connected it stores the reference to database in _db.
 */
async function connect(host, dbName) {
  if (!db) {
    console.log("Connect to the database...", host, dbName)
    db = await MongoClient.connect(mongoURL(host), clientOptions).then(
      (client) => {
        console.log("Connected!")

        // Create a function to terminate your app gracefully:
        const gracefulShutdown = () => {
          console.log("Close database connection...")
          client.close(false, console.log("database connection closed!"))
        }

        // This will handle kill commands, such as CTRL+C:
        process.on("SIGINT", gracefulShutdown)
        process.on("SIGTERM", gracefulShutdown)

        // This will prevent dirty exit on code-fault crashes:
        process.on("uncaughtException", gracefulShutdown)
        return client.db(dbName)
      }
    )
  }

  return db
}

// exports connect, getDB and close
module.exports = {
  connect,
  mongoURL,
}
