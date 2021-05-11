//resolvers.js
const Request = require("../models/Request")

module.exports = {
  Query: {
    async requests() {
      return await Request.find()
    },
  },
  Mutation: {
    async createRequest(root, args) {
      return await Request.create(args)
    },
    async updateRequest(root, { id, ...args }) {
      return await Request.update({ _id: id }, args)
    },
    async deleteRequest(root, { id }) {
      return await Request.findOneAndRemove({ _id: id })
    },
    async rejectRequest(root, { id, ...args }) {
      return await Request.update({ _id: id }, { status: "rejected" })
    },
    async approveRequest(root, { id, ...args }) {
      return await Request.update({ _id: id }, { status: "approved" })
    },
  },
}
