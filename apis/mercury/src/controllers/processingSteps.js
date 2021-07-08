const { ProcessingStep } = require("../db/models")
const ProcessingStepPagination = require("./usePagination")(ProcessingStep)

const PER_PAGE = 20

async function index(args, { policy }) {
  const where = { requestID: args.requestID }
  const page = args.page || 1
  const perPage = args.perPage || PER_PAGE

  // load only public steps if current is is a requester
  // type is an enum of public, internal
  if (policy.check("requester")) {
    where.type = "public"
  }

  return await ProcessingStepPagination.paginate({ where, page, perPage })
}

async function update({ id, comment, type, kind }, { currentUser, pubsub }) {
  const step = await ProcessingStep.findByPk(id)
  if (!step) throw new HTTPError(404, `Processing step not found`)

  if (step.processorID !== currentUser.id) {
    throw new AuthorizationError("User is not allowed to update this step")
  }

  const request = await step.request

  if (comment) step.comment = comment
  if (type) step.type = type
  if (kind) step.kind = kind
  step.save()

  return step
}

module.exports = {
  index,
  update,
}
