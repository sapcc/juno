//resolvers.js
const { Request, ProcessingStep } = require("../db/models")
const { GraphQLJSON } = require("graphql-scalars")
const { Op } = require("sequelize")
const { AuthorizationError, HTTPError } = require("../errors")
// const { withFilter } = require("mercurius")

const loadRequest = async (id) => {
  const request = await Request.findByPk(id)
  if (!request) throw new HTTPError(404, `Request not found`)
  return request
}

const requestFilterKeys = [
  "id",
  "state",
  "priority",
  "kind",
  "region",
  "domainID",
  "projectID",
]

const PER_PAGE = 20

const capitalize = (string) =>
  string
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())

const publishRequest = (pubsub, action, request) => {
  if (action === "DELETED") {
    return pubsub.publish({
      topic: "REQUESTS_DELETED",
      payload: { requestsDeleted: request },
    })
  }

  let topic = `REQUEST_${action.toUpperCase()}`
  let payload = { [`request${capitalize(action)}`]: request }

  // publish realtime events for processors
  pubsub.publish({ topic, payload })
  // publish realtime events for creator
  pubsub.publish({
    topic: `${topic}_${request.requesterID}`,
    payload,
  })
}

const publishProcessingStep = (pubsub, action, requesterID, processingStep) => {
  const topic = `PROCESSING_STEP_${action.toUpperCase()}_${
    processingStep.requestID
  }`
  const payload = {
    [`processingStep${capitalize(action)}`]: processingStep,
  }

  pubsub.publish({ topic, payload })
  // publish realtime events for creator
  pubsub.publish({ topic: `${topic}_${requesterID}`, payload })
}

module.exports = {
  JSON: GraphQLJSON,

  Query: {
    async profile(root, args, context) {
      return context.currentUser
    },
    // GET REQUESTS
    async requests(root, args, context) {
      const isProcessor = context.policy.check("processor")
      const where = {}
      let order, include
      const page = args.paginate?.page || 1
      const perPage = args.paginate?.perPage || PER_PAGE

      // load requests created by current user if current is is a requester
      if (!isProcessor) {
        where.requesterID = context.currentUser.id
      }

      requestFilterKeys.forEach((key) => args[key] && (where[key] = args[key]))
      if (args.olderThan) where.createdAt = { [Op.lt]: args.olderThan }
      if (args.newerThan) where.createdAt = { [Op.gt]: args.newerThan }

      if (args.orderBy) {
        order = Object.keys(args.orderBy).map((key) => [key, args.orderBy[key]])
      }

      if (args.lastProcessingSteps) {
        include = {
          model: ProcessingStep,
          as: "lastProcessingSteps",
          limit: args.lastProcessingSteps > 10 ? 10 : args.lastProcessingSteps,
          where: !isProcessor ? undefined : { type: "public" },
          order: [["createdAt", "ASC"]],
        }
      }

      return await Request.paginate({
        where,
        include,
        order,
        page,
        perPage,
      })
    },

    async processingSteps(root, args, context) {
      const where = { requestID: args.requestID }
      const page = args.page || 1
      const perPage = args.perPage || PER_PAGE

      // load only public steps if current is is a requester
      // type is an enum of public, internal
      if (context.policy.check("requester")) {
        where.type = "public"
      }

      return await ProcessingStep.paginate({ where, page, perPage })
    },

    async regions(root, args, context) {
      return await Request.aggregate("region", "DISTINCT", {
        plain: false,
      }).then((result) => result.map((r) => r.DISTINCT))
    },
  },

  Mutation: {
    async createRequest(
      root,
      args,
      { currentUser, region, pubsub, tokenPayload, policy }
    ) {
      if (!policy.check("can-create")) {
        throw new AuthorizationError("User is not allowed to create a request")
      }

      const { project, domain } = tokenPayload
      const requestData = {
        ...args,
        region: region,
        projectID: project?.id,
        projectName: project?.name,
        domainID: project?.domain?.id || domain?.id,
        domainName: project?.domain?.name || domain?.name,
        requesterID: currentUser.id,
        requesterName: currentUser.name,
      }

      const request = await Request.create(requestData)
      if (args.comment) {
        const step = await request.performStateTransition("addNote", {
          processor: currentUser,
          kind: "note",
          type: "public",
          comment: args.comment,
        })
        publishProcessingStep(
          context.pubsub,
          "ADDED",
          request.requesterID,
          step
        )
      }

      // publish realtime events
      publishRequest(pubsub, "ADDED", request)

      return request
    },

    async updateRequest(
      root,
      { id, ...args },
      { currentUser, policy, pubsub }
    ) {
      let request = await loadRequest(id)

      if (
        !(
          policy.check("can-update", {
            request,
            requester: currentUser,
          }) && request.requesterID === currentUser.id
        )
      ) {
        throw new AuthorizationError(
          "User is not allowed to update this request"
        )
      }
      request = request.update(args)

      // publish realtime events
      publishRequest(pubsub, "UPDATED", request)
      return request
    },

    async deleteRequests(root, { id }, context) {
      const requests = await Request.findAll({ where: { id } })

      for (let request of requests) {
        if (!context.policy.check("can-delete", { request })) {
          throw new AuthorizationError(
            `User is not allowed to delete this request: ${request.id}`
          )
        }
        //if (!(await request.destroy())) return false
      }

      result = await Request.destroy({
        where: { id },
        logging: console.log,
      })
      if (result) {
        // publish realtime events
        publishRequest(pubsub, "DELETED", result)
      }
      return result
    },

    async startProcessing(root, { requestID, comment, type, kind }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-start-processing", { request })) {
        throw new AuthorizationError(
          "User is not allowed to start processing on this request"
        )
      }

      const step = await request.performStateTransition("startProcessing", {
        processor: context.currentUser,
        kind: kind || "note",
        type,
        comment,
      })
      publishProcessingStep(context.pubsub, "ADDED", request.requesterID, step)
      return request
    },

    async addNote(root, { requestID, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-add-note", { request })) {
        throw new AuthorizationError(
          "User is not allowed to add a note to this request"
        )
      }

      const step = await request.performStateTransition("addNote", {
        processor: context.currentUser,
        kind: "note",
        type: "public",
        comment,
      })
      publishProcessingStep(context.pubsub, "ADDED", request.requesterID, step)
      return request
    },

    async process(root, { requestID, comment, kind, type }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-process", { request })) {
        throw new AuthorizationError(
          "User is not allowed to process on this request"
        )
      }

      const step = await request.performStateTransition("process", {
        processor: context.currentUser,
        kind: kind || "note",
        type: type || "public",
        comment,
      })
      publishProcessingStep(context.pubsub, "ADDED", request.requesterID, step)
      return request
    },

    async askRequester(root, { requestID, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-ask", { request })) {
        throw new AuthorizationError("User is not allowed to ask requester")
      }

      const step = await request.performStateTransition("askRequester", {
        processor: context.currentUser,
        kind: "question",
        type: "public",
        comment,
      })
      publishProcessingStep(context.pubsub, "ADDED", request.requesterID, step)
      return request
    },

    async answer(root, { requestID, comment, referenceStepID }, context) {
      const request = await loadRequest(requestID)
      const requester = await request.requester

      if (!context.policy.check("can-answer", { request, requester })) {
        throw new AuthorizationError("User is not allowed to answer")
      }

      const step = await request.performStateTransition("answer", {
        processor: context.currentUser,
        referenceStepID,
        kind: "answer",
        type: "public",
        comment,
      })
      publishProcessingStep(context.pubsub, "ADDED", request.requesterID, step)
      return request
    },
    async approve(root, { requestID, kind, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-approve", { request })) {
        throw new AuthorizationError(
          "User is not allowed to approve this request"
        )
      }

      const step = await request.performStateTransition("approve", {
        processor: context.currentUser,
        kind: kind || "note",
        type: "public",
        comment,
      })
      publishProcessingStep(context.pubsub, "ADDED", request.requesterID, step)
      return request
    },
    async reject(root, { requestID, kind, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-reject", { request })) {
        throw new AuthorizationError(
          "User is not allowed to reject this request"
        )
      }

      const step = await request.performStateTransition("reject", {
        processor: context.currentUser,
        kind: kind || "note",
        type: "public",
        comment,
      })
      publishProcessingStep(context.pubsub, "ADDED", request.requesterID, step)
      return request
    },
    async close(root, { requestID, kind, comment }, context) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-close", { request })) {
        throw new AuthorizationError(
          "User is not allowed to close this request"
        )
      }

      const step = await request.performStateTransition("close", {
        processor: context.currentUser,
        kind: kind || "note",
        type: "public",
        comment,
      })
      publishProcessingStep(context.pubsub, "ADDED", request.requesterID, step)
      return request
    },
    async reopen(root, { requestID, ...args }) {
      const request = await loadRequest(requestID)

      if (!context.policy.check("can-reopen", { request })) {
        throw new AuthorizationError(
          "User is not allowed to re-open this request"
        )
      }

      const step = await request.performStateTransition("reopen", {
        processor: context.currentUser,
        kind: kind || "note",
        type: "public",
        comment,
      })
      publishProcessingStep(context.pubsub, "ADDED", request.requesterID, step)
      return request
    },

    async updateProfile(root, { email, fullName, settings }, context) {
      if (email) context.currentUser.email = email
      if (fullName) context.currentUser.fullName = fullName
      if (settings) context.currentUser.settings = settings
      return context.currentUser.save()
    },

    async updateProcessingStep(root, { id, comment, type, kind }, context) {
      const step = await ProcessingStep.findByPk(id)
      if (!step) throw new HTTPError(404, `Processing step not found`)
      if (comment) step.comment = comment
      if (type) step.type = type
      if (kind) step.kind = kind
      return step.save()
    },
  },

  Subscription: {
    requestAdded: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (root, args, { pubsub, policy, currentUser }) => {
        if (policy.check("processor")) {
          return await pubsub.subscribe("REQUEST_ADDED")
        } else {
          return await pubsub.subscribe(`REQUEST_ADDED_${currentUser.id}`)
        }
      },
    },

    requestUpdated: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (root, args, { pubsub, currentUser, policy }) => {
        if (policy.check("processor")) {
          return await pubsub.subscribe("REQUEST_UPDATED")
        } else {
          return await pubsub.subscribe(`REQUEST_UPDATED_${currentUser.id}`)
        }
      },
    },

    requestsDeleted: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (root, args, { pubsub }) =>
        await pubsub.subscribe("REQUESTS_DELETED"),
    },

    processingStepAdded: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (root, args, { pubsub, policy, currentUser }) => {
        if (policy.check("processor")) {
          return await pubsub.subscribe(
            `PROCESSING_STEP_ADDED_${args.requestID}`
          )
        } else {
          return await pubsub.subscribe(
            `PROCESSING_STEP_ADDED_${args.requestID}_${currentUser.id}`
          )
        }
      },
    },

    processingStepUpdated: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (root, args, { pubsub, currentUser, policy }) => {
        if (policy.check("processor")) {
          return await pubsub.subscribe(
            `PROCESSING_STEP_UPDATED_${args.requestID}`
          )
        } else {
          return await pubsub.subscribe(
            `PROCESSING_STEP_UPDATED_${args.requestID}_${currentUser.id}`
          )
        }
      },
    },
  },
}
