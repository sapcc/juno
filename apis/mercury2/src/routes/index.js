// Import our Controllers
const requestsController = require("../controllers/requestsController")

const routes = [
  {
    method: "GET",
    url: "/api/requests",
    handler: requestsController.getRequests,
  },
  {
    method: "GET",
    url: "/api/requests/:id",
    handler: requestsController.getRequestByID,
  },
  {
    method: "POST",
    url: "/api/requests",
    handler: requestsController.addRequest,
    // schema: documentation.addRequestSchema,
  },
  {
    method: "PUT",
    url: "/api/requests/:id",
    handler: requestsController.updateRequest,
  },
  {
    method: "DELETE",
    url: "/api/requests/:id",
    handler: requestsController.deleteRequest,
  },
]

module.exports = routes
