const db = require("../src/db/models")

module.exports = async () => {
  await db.sequelize.sync({ force: true })
}
