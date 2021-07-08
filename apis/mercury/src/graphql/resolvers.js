//resolvers.js
const RequestsController = require("../controllers/requests")
const ProcessingStepsController = require("../controllers/processingSteps")
const UsersController = require("../controllers/users")
const { GraphQLJSON } = require("graphql-scalars")

const capitalize = (string) =>
  string
    .trim()
    .toLowerCase()
    .replace(/^\w/, (c) => c.toUpperCase())

const publishRequest = (pubsub, action, request) => {
  if (!pubsub) return
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

const publishProcessingStep = (pubsub, action, step) => {
  if (!pubsub) return
  const topic = `PROCESSING_STEP_${action.toUpperCase()}`
  const payload = {
    [`processingStep${capitalize(action)}`]: step,
  }

  pubsub.publish({ topic: topic, payload })
  pubsub.publish({ topic: `${topic}_REQUEST:${step.requestID}`, payload })
  pubsub.publish({ topic: `${topic}_PROCESSOR:${step.processorID}`, payload })
  pubsub.publish({
    topic: `${topic}_REQUEST:${step.requestID}_PROCESSOR:${step.processorID}`,
    payload,
  })
}

module.exports = {
  JSON: GraphQLJSON,

  Query: {
    async profile(_root, args, context) {
      return UsersController.show(args, context)
    },
    // GET REQUESTS
    async requests(_root, args, context) {
      return RequestsController.index(args, context)
    },

    async processingSteps(_root, args, context) {
      return ProcessingStepsController.index(args, context)
    },

    async regions(_root, _args, _context) {
      return RequestsController.regions()
    },
  },

  Mutation: {
    async createRequest(_root, args, context) {
      const request = await RequestsController.create(args, context)
      publishRequest(context.pubsub, "ADDED", request)
      return request
    },

    async updateRequest(_root, args, context) {
      const request = await RequestsController.update(args, context)
      publishRequest(context.pubsub, "UPDATED", request)
      return request
    },

    async deleteRequests(_root, args, context) {
      const count = await RequestsController.destroy(args, context)
      publishRequest(context.pubsub, "DELETED", args.id)
      return count
    },

    async startProcessing(_root, args, { pubsub, ...context }) {
      const { request, step } = await RequestsController.startProcessing(
        args,
        context
      )

      publishRequest(pubsub, "UPDATED", request)
      publishProcessingStep(pubsub, "ADDED", step)

      request.lastProcessingSteps = [step]
      return request
    },

    async addNote(_root, args, { pubsub, ...context }) {
      const { request, step } = await RequestsController.addNote(args, context)
      publishRequest(pubsub, "UPDATED", request)
      publishProcessingStep(pubsub, "ADDED", step)

      request.lastProcessingSteps = [step]
      return request
    },

    async process(_root, args, { pubsub, ...context }) {
      const { request, step } = await RequestsController.process(args, context)
      publishRequest(pubsub, "UPDATED", request)
      publishProcessingStep(pubsub, "ADDED", step)

      request.lastProcessingSteps = [step]
      return request
    },

    async askRequester(_root, args, { pubsub, ...context }) {
      const { request, step } = await RequestsController.askRequester(
        args,
        context
      )
      publishRequest(pubsub, "UPDATED", request)
      publishProcessingStep(pubsub, "ADDED", step)

      request.lastProcessingSteps = [step]
      return request
    },

    async answer(_root, args, { pubsub, ...context }) {
      const { request, step } = await RequestsController.answer(args, context)
      publishRequest(pubsub, "UPDATED", request)
      publishProcessingStep(pubsub, "ADDED", step)

      request.lastProcessingSteps = [step]
      return request
    },

    async approve(_root, args, { pubsub, ...context }) {
      const { request, step } = await RequestsController.approve(args, context)
      publishRequest(pubsub, "UPDATED", request)
      publishProcessingStep(pubsub, "ADDED", step)

      request.lastProcessingSteps = [step]
      return request
    },

    async reject(_root, args, { pubsub, ...context }) {
      const { request, step } = await RequestsController.reject(args, context)
      publishRequest(pubsub, "UPDATED", request)
      publishProcessingStep(pubsub, "ADDED", step)

      request.lastProcessingSteps = [step]
      return request
    },

    async close(_root, args, { pubsub, ...context }) {
      const { request, step } = await RequestsController.close(args, context)
      publishRequest(pubsub, "UPDATED", request)
      publishProcessingStep(pubsub, "ADDED", step)

      request.lastProcessingSteps = [step]
      return request
    },

    async reopen(_root, args, { pubsub, ...context }) {
      const { request, step } = await RequestsController.reopen(args, context)
      publishRequest(pubsub, "UPDATED", request)
      publishProcessingStep(pubsub, "ADDED", step)

      request.lastProcessingSteps = [step]
      return request
    },

    async updateProfile(_root, args, { pubsub, ...context }) {
      UsersController.update(args, context)
    },

    async updateProcessingStep(_root, args, { pubsub, ...context }) {
      const step = await ProcessingStepsController.update(args, context)
      const request = await step.request
      publishProcessingStep(pubsub, "UPDATED", step)
      return step
    },
  },

  Subscription: {
    requestAdded: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (_root, _args, { pubsub, policy, currentUser }) => {
        let topic = `REQUEST_ADDED`
        if (!policy.check("processor")) topic = `${topic}_${currentUser.id}`

        return pubsub.subscribe(topic)
      },
    },

    requestUpdated: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (_root, _args, { pubsub, currentUser, policy }) => {
        let topic = `REQUEST_UPDATED`
        if (!policy.check("processor")) topic = `${topic}_${currentUser.id}`

        return pubsub.subscribe(topic)
      },
    },

    requestsDeleted: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (_root, _args, { pubsub }) =>
        await pubsub.subscribe("REQUESTS_DELETED"),
    },

    processingStepAdded: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (_root, args, { pubsub, policy, currentUser }) => {
        let topic = `PROCESSING_STEP_ADDED`
        if (args.requestID) topic = `${topic}_REQUEST:${args.requestID}`
        if (!policy.check("processor"))
          topic = `${topic}_PROCESSOR:${currentUser.id}`

        return pubsub.subscribe(topic)
      },
    },

    processingStepUpdated: {
      // You can also subscribe to multiple topics at once using an array like this:
      //  pubsub.subscribe(['TOPIC1', 'TOPIC2'])
      subscribe: async (_root, args, { pubsub, currentUser, policy }) => {
        let topic = `PROCESSING_STEP_UPDATED`
        if (args.requestID) topic = `${topic}_REQUEST:${args.requestID}`
        if (!policy.check("processor"))
          topic = `${topic}_PROCESSOR:${currentUser.id}`

        return pubsub.subscribe(topic)
      },
    },
  },
}
