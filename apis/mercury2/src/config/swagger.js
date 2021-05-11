exports.options = {
  routePrefix: "/",
  exposeRoute: true,
  swagger: {
    info: {
      title: "Mercury API",
      description: "An API to create and manage requests.",
      version: "0.1.0",
    },
    externalDocs: {
      url: "https://swagger.io",
      description: "Find more info here",
    },
    host: "juno.ap.workspaces-staging.eu-nl-1.cloud.sap/",
    schemes: ["https"],
    consumes: ["application/json"],
    produces: ["application/json"],
  },
}
