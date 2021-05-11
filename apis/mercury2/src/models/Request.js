// External Dependancies
const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
})

module.exports = mongoose.model("Request", requestSchema)
