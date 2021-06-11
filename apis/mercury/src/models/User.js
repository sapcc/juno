const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  fullName: String,
  status: String,
})

module.exports = mongoose.model("User", userSchema)
