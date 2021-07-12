//resolvers.js
const { Request, ProcessingStep } = require("../db/models")
const { GraphQLJSON } = require("graphql-scalars")
const { Op } = require("sequelize")
const { AuthorizationError, HTTPError } = require("../errors")
const RequestPagination = require("./usePagination")(Request)

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

async function index(args, { policy, currentUser }) {
  const isProcessor = policy.check("processor")
  const where = {}
  let order, include
  const page = args.paginate?.page || 1
  const perPage = args.paginate?.perPage || PER_PAGE

  // load requests created by current user if current is is a requester
  if (!isProcessor) {
    where.requesterID = currentUser.id
  }

  requestFilterKeys.forEach((key) => args[key] && (where[key] = args[key]))
  if (args.olderThan) where.createdAt = { [Op.lt]: args.olderThan }
  if (args.newerThan) where.createdAt = { [Op.gt]: args.newerThan }

  if (args.orderBy) {
    order = Object.keys(args.orderBy).map((key) => [key, args.orderBy[key]])
  }

  // add default order by created at DESC
  if (!order || !order.find((o) => o[0] === "createdAt")) {
    order = order || []
    order.push(["createdAt", "DESC"])
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

  return await RequestPagination.paginate({
    where,
    include,
    order,
    page,
    perPage,
  })
}

async function regions() {
  return await Request.aggregate("region", "DISTINCT", {
    plain: false,
  }).then((result) => result.map((r) => r.DISTINCT))
}

async function create(args, { currentUser, region, tokenPayload, policy }) {
  if (!policy.check("can-create")) {
    throw new AuthorizationError("User is not allowed to create a request")
  }

  console.log(
    "================================CREATE REQUEST",
    currentUser,
    region,
    tokenPayload
  )

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

  console.log("================================requestData", requestData)

  const request = await Request.create(requestData)
  if (args.comment) {
    await request.performStateTransition("addNote", {
      processor: currentUser,
      kind: "note",
      type: "public",
      comment: args.comment,
    })
  }

  return request
}

async function update({ id, ...args }, { currentUser, policy }) {
  let request = await loadRequest(id)
  const requester = await request.requester
  if (
    !(
      policy.check("can-update", { request, requester }) &&
      request.requesterID === currentUser.id
    )
  ) {
    throw new AuthorizationError("User is not allowed to update this request")
  }
  return await request.update(args)
}

async function destroy({ id }, { policy }) {
  const requests = await Request.findAll({ where: { id } })

  for (let request of requests) {
    if (!policy.check("can-delete", { request })) {
      throw new AuthorizationError(
        `User is not allowed to delete this request: ${request.id}`
      )
    }
  }

  return await Request.destroy({ where: { id } })
}

async function startProcessing(
  { requestID, comment, type, kind },
  { currentUser, policy }
) {
  const request = await loadRequest(requestID)

  if (!policy.check("can-start-processing", { request })) {
    throw new AuthorizationError(
      "User is not allowed to start processing on this request"
    )
  }

  const step = await request.performStateTransition("startProcessing", {
    processor: currentUser,
    kind: kind || "note",
    type,
    comment,
  })
  return { request, step }
}

async function addNote({ requestID, comment }, { currentUser, policy }) {
  const request = await loadRequest(requestID)
  const requester = await request.requester

  if (!policy.check("can-add-note", { requester, request })) {
    throw new AuthorizationError(
      "User is not allowed to add a note to this request"
    )
  }

  const step = await request.performStateTransition("addNote", {
    processor: currentUser,
    kind: "note",
    type: "public",
    comment,
  })
  return { request, step }
}

async function process({ requestID, comment, kind, type }, context) {
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
  return { request, step }
}

async function askRequester({ requestID, comment }, { policy, currentUser }) {
  const request = await loadRequest(requestID)

  if (!policy.check("can-ask", { request })) {
    throw new AuthorizationError("User is not allowed to ask requester")
  }

  const step = await request.performStateTransition("askRequester", {
    processor: currentUser,
    kind: "question",
    type: "public",
    comment,
  })
  return { request, step }
}

async function answer(
  { requestID, comment, referenceStepID },
  { policy, currentUser }
) {
  const request = await loadRequest(requestID)
  const requester = await request.requester

  if (!policy.check("can-answer", { request, requester })) {
    throw new AuthorizationError("User is not allowed to answer")
  }

  const step = await request.performStateTransition("answer", {
    processor: currentUser,
    referenceStepID,
    kind: "answer",
    type: "public",
    comment,
  })
  return { request, step }
}

async function approve({ requestID, kind, comment }, { policy, currentUser }) {
  const request = await loadRequest(requestID)

  if (!policy.check("can-approve", { request })) {
    throw new AuthorizationError("User is not allowed to approve this request")
  }

  const step = await request.performStateTransition("approve", {
    processor: currentUser,
    kind: kind || "note",
    type: "public",
    comment,
  })
  return { request, step }
}

async function reject({ requestID, kind, comment }, { policy, currentUser }) {
  const request = await loadRequest(requestID)

  if (!policy.check("can-reject", { request })) {
    throw new AuthorizationError("User is not allowed to reject this request")
  }

  const step = await request.performStateTransition("reject", {
    processor: currentUser,
    kind: kind || "note",
    type: "public",
    comment,
  })
  return { request, step }
}

async function close({ requestID, kind, comment }, { policy, currentUser }) {
  const request = await loadRequest(requestID)

  if (!policy.check("can-close", { request })) {
    throw new AuthorizationError("User is not allowed to close this request")
  }

  const step = await request.performStateTransition("close", {
    processor: currentUser,
    kind: kind || "note",
    type: "public",
    comment,
  })
  return { request, step }
}

async function reopen({ requestID, kind, comment }, { currentUser, policy }) {
  const request = await loadRequest(requestID)
  const requester = await request.requester

  if (!policy.check("can-reopen", { request, requester })) {
    throw new AuthorizationError("User is not allowed to re-open this request")
  }

  const step = await request.performStateTransition("reopen", {
    processor: currentUser,
    kind: kind || "note",
    type: "public",
    comment,
  })
  return { request, step }
}

module.exports = {
  index,
  regions,
  create,
  update,
  destroy,
  startProcessing,
  addNote,
  process,
  askRequester,
  answer,
  approve,
  reject,
  close,
  reopen,
}
