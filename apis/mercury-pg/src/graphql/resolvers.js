//resolvers.js
const { Request } = require("../db/models")

module.exports = {
  Query: {
    async requests() {
      return await Request.findAll()
    },
  },
  Mutation: {
    async createRequest(root, args, context) {
      console.log("===============================", args, context.tokenPayload)
      const token = context.tokenPayload
      const request = {
        ...args,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        isDomainScoped: !!token.domain,
        isProjectScoped: !!token.project,
        projectID: token.project?.id,
        projectName: token.project?.name,
        domainID: token.project?.domain?.id || token.domain?.id,
        domainName: token.project?.domain?.name || token.domain?.name,
        requesterID: token.user?.id,
        state: "open",
      }
      return await Request.create(request)
    },
    async updateRequest(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, args)
    },
    async deleteRequest(root, { id }) {
      return {} //await Request.findOneAndRemove({ _id: id })
    },
    async rejectRequest(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, { status: "rejected" })
    },
    async approveRequest(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, { status: "approved" })
    },
  },
}
