const DB_HOST =
  process.env.POSTGRES_PORT_5432_TCP_ADDR ||
  process.env.JUNO_MERCURY_POSTGRESQL_SERVICE_HOST ||
  process.env.POSTGRES_JUNO_MERCURY_SERVICE_HOST ||
  process.env.POSTGRES_SERVICE_HOST ||
  "localhost"

const DB_PORT =
  process.env.POSTGRES_PORT_5432_TCP_PORT ||
  process.env.JUNO_MERCURY_POSTGRESQL_SERVICE_PORT ||
  process.env.POSTGRES_JUNO_MERCURY_SERVICE_PORT ||
  process.env.POSTGRES_SERVICE_PORT ||
  5432

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
    url: `postgresql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${process.env.DB_NAME}?schema=public`, //process.env.DATABASE_URL,
    dialect: "postgres",
  },
}
