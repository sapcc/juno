// External Dependancies
const mongoose = require("mongoose")

const requestSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
  creator_id: mongoose.Schema.Types.ObjectId,
})

module.exports = mongoose.model("Request", requestSchema)
