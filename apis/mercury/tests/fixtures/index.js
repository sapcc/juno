const usersFixtures = require("./users.json")
const requestsFixtures = require("./requests.json")
const processingSteps = require("./processingSteps.json")
const db = require("../../src/db/models")

module.exports = async () => {
  await db.sequelize.sync({ force: true })

  await db.User.bulkCreate(usersFixtures)
  await db.Request.bulkCreate(requestsFixtures)
  await db.ProcessingStep.bulkCreate(processingSteps)
}
