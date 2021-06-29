//resolvers.js
const { Request, ProcessingStep } = require("../db/models")
const { GraphQLJSON } = require("graphql-scalars")
const { Op } = require("sequelize")
const { AuthorizationError, HTTPError } = require("../errors")

const loadRequest = async (id) => {
  const request = await Request.findByPk(requestID)
  if (!request) throw new HTTPError(404, `Request not found`)
  return request
}

module.exports = {
  JSON: GraphQLJSON,

  Query: {
    async profile(root, args, context) {
      return context.currentUser
    },

    async requests(root, args, context) {
      const where = {}

      // load requests created by current user if current is is a requester
      if (context.policy.check("requester")) {
        where.requesterID = context.currentUser.id
      }

      if (args.id) where.id = args.id
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
      const where = { requestID: args.requestID }

      // load only public steps if current is is a requester
      // type is an enum of public, internal
      if (context.policy.check("requester")) {
        where.type = "public"
      }

      return ProcessingStep.findAll({ where })
    },
  },

  Mutation: {
    async createRequest(root, args, context) {
      if (!context.policy.check("can-create")) {
        throw new AuthorizationError("User is not allowed to create a request")
      }

      const { project, domain } = context.tokenPayload
      const requestData = {
        ...args,
        projectID: project?.id,
        projectName: project?.name,
        domainID: project?.domain?.id || domain?.id,
        domainName: project?.domain?.name || domain?.name,
        requesterID: context.currentUser.id,
        state: "open",
      }

      return await Request.create(requestData)
    },

    async updateRequest(root, { id, ...args }, context) {
      const request = await loadRequest(id)

      if (
        !(
          context.policy.check("can-update", { request }) &&
          request.requesterID === context.currentUser.id
        )
      ) {
        throw new AuthorizationError(
          "User is not allowed to update this request"
        )
      }
      return request.update(args)
    },

    async deleteRequests(root, { id }, context) {
      const requests = await Request.findAll({ where: { id } })

      for (let request of requests) {
        if (!context.policy.check("can-delete", { request })) {
          throw new AuthorizationError(
            "User is not allowed to delete this request"
          )
        }
        if (!(await request.destroy())) return false
      }

      return true
    },

    async startProcessing(root, { requestID, comment, type, kind }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-start-processing", { request })) {
        throw new AuthorizationError(
          "User is not allowed to start processing on this request"
        )
      }

      return request.performStateTransition("startProcessing", {
        processor: context.currentUser,
        kind: kind || "note",
        type,
        comment,
      })
    },

    async addNote(root, { requestID, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-add-note", { request })) {
        throw new AuthorizationError(
          "User is not allowed to add a note to this request"
        )
      }

      return request.performStateTransition("addNote", {
        processor: context.currentUser,
        kind: "note",
        type: "public",
        comment,
      })
    },

    async process(root, { requestID, comment, kind, type }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-process", { request })) {
        throw new AuthorizationError(
          "User is not allowed to process on this request"
        )
      }

      return request.performStateTransition("process", {
        processor: context.currentUser,
        kind: kind || "note",
        type: type || "public",
        comment,
      })
    },

    async askRequester(root, { requestID, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-ask", { request })) {
        throw new AuthorizationError("User is not allowed to ask requester")
      }

      return request.performStateTransition("askRequester", {
        processor: context.currentUser,
        kind: "question",
        type: "public",
        comment,
      })
    },

    async answer(root, { requestID, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-ask", { request })) {
        throw new AuthorizationError("User is not allowed to answer")
      }

      return request.performStateTransition("answer", {
        processor: context.currentUser,
        kind: "answer",
        type: "public",
        comment,
      })
    },
    async approve(root, { requestID, kind, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-approve", { request })) {
        throw new AuthorizationError(
          "User is not allowed to approve this request"
        )
      }

      return request.performStateTransition("approve", {
        processor: context.currentUser,
        kind: kind || "note",
        type: "public",
        comment,
      })
    },
    async reject(root, { requestID, kind, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-reject", { request })) {
        throw new AuthorizationError(
          "User is not allowed to reject this request"
        )
      }

      return request.performStateTransition("reject", {
        processor: context.currentUser,
        kind: kind || "note",
        type: "public",
        comment,
      })
    },
    async close(root, { requestID, kind, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-close", { request })) {
        throw new AuthorizationError(
          "User is not allowed to close this request"
        )
      }

      return request.performStateTransition("close", {
        processor: context.currentUser,
        kind: kind || "note",
        type: "public",
        comment,
      })
    },
    async reopen(root, { requestID, ...args }) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-reopen", { request })) {
        throw new AuthorizationError(
          "User is not allowed to re-open this request"
        )
      }

      return request.performStateTransition("reopen", {
        processor: context.currentUser,
        kind: kind || "note",
        type: "public",
        comment,
      })
    },

    async updateProfile(root, { email, fullName, settings }, context) {
      if (email) context.currentUser.email = email
      if (fullName) context.currentUser.fullName = fullName
      if (settings) context.currentUser.settings = settings
      return context.currentUser.save()
    },
  },
}
