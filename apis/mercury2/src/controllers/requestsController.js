// External Dependancies
const boom = require("boom")

// Get Data Models
const Request = require("../models/Request")

// Get all requests
exports.getRequests = async (req, reply) => {
  try {
    const requests = await Request.find()
    return requests
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Get single request by ID
exports.getRequestByID = async (req, reply) => {
  try {
    const id = req.params.id
    const request = await Request.findById(id)
    return request
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Add a new request
exports.addRequest = async (req, reply) => {
  try {
    const request = new Request(req.body)
    return request.save()
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Update an existing request
exports.updateRequest = async (req, reply) => {
  try {
    const id = req.params.id
    const request = req.body
    const { ...updateData } = request
    const update = await Request.findByIdAndUpdate(id, updateData, {
      new: true,
    })
    return update
  } catch (err) {
    throw boom.boomify(err)
  }
}

// Delete a request
exports.deleteRequest = async (req, reply) => {
  try {
    const id = req.params.id
    const request = await Request.findByIdAndRemove(id)
    return request
  } catch (err) {
    throw boom.boomify(err)
  }
}
