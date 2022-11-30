/*
Add following handlers to the webpack config in the devServer section.
This allows us to serve handlers for a local api server on localhost
where the app runs.

const apiServer = require("./apiserver.config")
  ...
  devServer: {
    onBeforeSetupMiddleware: apiServer.getHandlers(),
    ...
  }
*/

let peaksData = require("./public/peaks.json")
const bodyParser = require("body-parser")

module.exports = {
  getHandlers: () => {
    return (devServer) => {
      devServer.app.get("/peaks", function (req, res) {
        res.json(peaksData)
      })
      devServer.app.get("/peaks/:id", function (req, res) {
        const index = peaksData.findIndex((item) => item.id == req.params.id)
        if (index !== -1) {
          return res.json(peaksData[index])
        }
        res.status(404)
        res.json({ error: "404" })
      })
      devServer.app.post("/peaks", bodyParser.json(), function (req, res) {
        const lastItemId = peaksData[peaksData.length - 1]?.id + 1 || 1
        peaksData.push({ ...req.body, id: lastItemId })
        res.send(req.body)
      })
      devServer.app.put("/peaks/:id", bodyParser.json(), function (req, res) {
        const index = peaksData.findIndex((item) => item.id == req.params.id)
        if (index !== -1) {
          peaksData[index] = req.body
          return res.json(peaksData[index])
        }
        res.status(404)
        res.json({ error: "404" })
      })
      devServer.app.delete("/peaks/:id", function (req, res) {
        const index = peaksData.findIndex((item) => item.id == req.params.id)
        if (index !== -1) {
          peaksData.splice(index, 1)
        }
        res.send({ info: `DELETED element with id ${req.params.id}` })
      })
    }
  },
}
