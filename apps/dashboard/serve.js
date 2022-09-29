const express = require("express")
const path = require("path")
const app = express()

app.use(express.static(path.join(__dirname, "build")))

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"))
})

const port = process.env.APP_PORT || process.env.PORT
// const server = app.listen(port, () => console.log(`Listening on port ${port}`))

const server = require("http").createServer(app)
server.keepAliveTimeout = 61 * 1000
server.headersTimeout = 65 * 1000 // This should be bigger than `keepAliveTimeout + your server's expected response time`

server.listen(port, () => console.log(`Listening on port ${port}`))
