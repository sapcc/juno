require("dotenv").config()

const DB_HOST = process.env.JUNO_MERCURY_POSTGRESQL_SERVICE_HOST || "localhost"
const DB_PORT = process.env.JUNO_MERCURY_POSTGRESQL_SERVICE_PORT || 5432

module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./sqlite-dev.db",
  },
  test: {
    dialect: "sqlite",
    storage: "./sqlite-test.db",
    logging: false,
  },
  production: {
    //url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${process.env.DB_NAME}?schema=public`, //process.env.DATABASE_URL,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: DB_HOST,
    port: DB_PORT,
    dialect: "postgres",
  },
}
