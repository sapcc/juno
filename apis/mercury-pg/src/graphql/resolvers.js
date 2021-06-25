//resolvers.js
const { Request, User, ProcessingStep } = require("../db/models")
const { GraphQLJSON } = require("graphql-scalars")
const { Op } = require("sequelize")

const currentUser = async (tokenPayload) => {
  const { user } = tokenPayload
  if (!user) throw new Error("Unknown user")
  return await User.createOrUpdate({ name: user.name })
}

module.exports = {
  JSON: GraphQLJSON,

  Query: {
    async profile(root, args, context) {
      return currentUser(context.tokenPayload)
    },

    async requests(root, args, context) {
      const where = {}
      if (args.state) where.state = args.state
      if (args.priority) where.priority = args.priority
      if (args.kind) where.kind = args.kind
      if (args.region) where.region = args.region
      if (args.domainID) where.domainID = args.domainID
      if (args.projectID) where.projectID = args.projectID
      if (args.olderThan) where.createdAt = { [Op.lt]: args.olderThan }
      if (args.newerThan) where.createdAt = { [Op.gt]: args.newerThan }

      return await Request.findAll({
        where: Object.keys(where).length > 0 ? where : undefined,
      })
    },

    async processingSteps(root, args, context) {
      return ProcessingStep.findAll({ where: { requestID: args.requestID } })
    },
  },

  Mutation: {
    async createRequest(root, args, context) {
      const { user, project, domain } = context.tokenPayload
      if (!user) throw new Error("Unknown user")

      const requester = await User.createOrUpdate({ name: user.name })

      const requestData = {
        ...args,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        projectID: project?.id,
        projectName: project?.name,
        domainID: project?.domain?.id || domain?.id,
        domainName: project?.domain?.name || domain?.name,
        requesterID: requester.id,
        state: "open",
      }

      return await Request.create(requestData)
    },

    async updateRequest(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, args)
    },
    async deleteRequests(root, { id }) {
      return {} //await Request.findOneAndRemove({ _id: id })
    },
    async startProcessing(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, { status: "rejected" })
    },
    async addComment(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, { status: "approved" })
    },

    async askRequester(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, args)
    },
    async answer(root, { id }) {
      return {} //await Request.findOneAndRemove({ _id: id })
    },
    async approve(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, { status: "rejected" })
    },
    async reject(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, { status: "approved" })
    },
    async close(root, { id }) {
      return {} //await Request.findOneAndRemove({ _id: id })
    },
    async reopen(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, { status: "rejected" })
    },
    async updateProfile(root, { id, ...args }) {
      return {} //await Request.update({ _id: id }, { status: "approved" })
    },
  },
}
