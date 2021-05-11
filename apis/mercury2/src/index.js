// Require external modules
const mongoose = require("mongoose")
// Require the framework and instantiate it
const fastify = require("fastify")({
  logger: true,
})

// Import Swagger Options
const swagger = require("./config/swagger")
// Register Swagger
fastify.register(require("fastify-swagger"), swagger.options)

fastify.register(require("fastify-cors"), {
  origin: true,
})

// Connect to DB
mongoose
  .connect("mongodb://localhost:27017/mercury")
  .then(() => console.log("MongoDB connected..."))
  .catch((err) => console.log(err))

const routes = require("./routes")

routes.forEach((route, index) => {
  fastify.route(route)
})

// Run the server!
const start = async () => {
  try {
    await fastify.listen(process.env.PORT, "0.0.0.0")
    fastify.swagger()
    fastify.log.info(`server listening on ${fastify.server.address().port}`)
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()
