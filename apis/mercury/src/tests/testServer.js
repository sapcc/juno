require("dotenv").config()
const Fixtures = require("node-mongodb-fixtures")
const { createServer } = require("../server")
const { mongoURL } = require("../dataStore")

const options = {
  mongoHost: process.env.MONGO_HOST,
  useAuthentication: false,
  dbName: "mercury-test",
}

const fixtures = new Fixtures({ dir: "src/tests/fixtures" })

module.exports = {
  createTestServer: async () => {
    await fixtures
      .connect(`${mongoURL(options.mongoHost)}/${options.dbName}`)
      .then(() => fixtures.unload())
      .then(() => fixtures.load())
      .then(() => fixtures.disconnect())
    return createServer(options)
  },
}
