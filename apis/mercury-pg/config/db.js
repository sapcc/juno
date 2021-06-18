module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./sqlite-dev.db",
  },
  test: {
    dialect: "sqlite",
    storage: "./sqlite-test.db",
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: "postgres",
  },
}
