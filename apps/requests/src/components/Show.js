import { useState, useEffect, useCallback, useReducer } from "react"
import { useRouter } from "url-state-router"
import { Button, Modal } from "juno-ui-components"
import { useClient } from "../lib/clientProvider"
import { usePolicy } from "../lib/policyProvider"
import Steps from "./Steps"
import { formatDate } from "../lib/utils"

function reducer(state, action) {
  switch (action.type) {
    case "request":
      return { ...state, isFetching: true, error: null }
    case "receive":
      return { ...state, isFetching: false, item: action.item }
    case "errors":
      return { ...state, isFetching: false, errors: action.errors }
    default:
      throw new Error()
  }
}

const priorityText = (priority) => {
  switch (priority) {
    case 0:
      return "Urgent"
    case 1:
      return "High"
    case 2:
      return "Low"
    default:
      return "Low"
  }
}

const Show = () => {
  const { routeParams, navigateTo } = useRouter()
  const id = routeParams?.id
  const [isOpen, setIsOpen] = useState(!!id)
  const [state, dispatch] = useReducer(reducer, {})

  const client = useClient()
  const policy = usePolicy()

  const refresh = useCallback(() => {
    if (!id || !client) return
    dispatch({ type: "request" })
    client
      .listRequests({
        filter: { id },
        fields: `items {
        id,
        requester {name fullName},
        lastProcessor {name fullName},
        lastProcessingSteps { fromState toState updatedAt },
        kind,
        priority,
        subject,
        description,
        payload,
        region,
        scope {domain {name} project {name domain {name} }},
        state,
        stateDetails,
        createdAt,
        updatedAt 
      }`,
      })
      .then((response) => {
        if (response.data.requests?.items)
          dispatch({ type: "receive", item: response.data.requests.items[0] })
      })
      .catch((response) => {
        const data = JSON.parse(response.message)
        dispatch({ type: "errors", errors: data.errors })
      })
  }, [id, client])

  useEffect(() => {
    if (!refresh) return
    refresh()
  }, [refresh])

  const close = useCallback((e) => {
    setIsOpen(false)
  }, [])

  const back = useCallback((e) => {
    navigateTo("/requests")
  }, [])

  return (
    <Modal
      isOpen={isOpen}
      close={close}
      onClosed={back}
      title={`Details for ${id}`}
      size="4xl"
    >
      {state.isFetching && <span>Loading...</span>}
      {state.errors && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {state.errors.map((error) => (
            <div>{error.message}</div>
          ))}
        </div>
      )}

      {state.item && (
        <>
          <div className="grid grid-cols-3 gap-4">
            {/* ID | Kind | Priority */}
            <div className="text-gray-700 px-4 py-2 m-2">
              <span className="text-gray-500 text-sm">ID</span>
              <br />
              {state.item.id}
            </div>
            <div className="text-gray-700 px-4 py-2 m-2">
              <span className="text-gray-500 text-sm">Kind</span>
              <br />
              {state.item.kind}
            </div>
            <div className="text-gray-700 px-4 py-2 m-2">
              <span className="text-gray-500 text-sm">Priority</span>
              <br />
              {priorityText(state.item.priority)}
            </div>

            {/* Region | Domain | Project */}
            <div className="text-gray-700 px-4 py-2 m-2">
              <span className="text-gray-500 text-sm">Region</span>
              <br />
              {state.item.region}
            </div>
            <div className="text-gray-700 px-4 py-2 m-2">
              <span className="text-gray-500 text-sm">Domain</span>
              <br />
              {state.item.scope?.project?.domain?.name ||
                state.item.scope?.domain?.name}
            </div>
            <div className="text-gray-700 px-4 py-2 m-2">
              <span className="text-gray-500 text-sm">Project</span>
              <br />
              {state.item.scope?.project?.name}
            </div>

            {/* Created at | Updated At | Status */}
            <div className="text-gray-700 px-4 py-2 m-2">
              <span className="text-gray-500 text-sm">Created At</span>
              <br />
              {formatDate(state.item.createdAt)}
            </div>
            <div className="text-gray-700 px-4 py-2 m-2">
              <span className="text-gray-500 text-sm">Updated At</span>
              <br />
              {formatDate(state.item.updatedAt)}
            </div>
            <div className="text-gray-700 px-4 py-2 m-2">
              <span className="text-gray-500 text-sm">Status</span>
              <br />
              {state.item.state}
            </div>
          </div>
          <div className="text-gray-700 px-4 py-2 m-2">
            <span className="text-gray-500 text-sm">Subject</span>
            <br />
            {state.item.subject}
          </div>
          <div className="text-gray-700 px-4 py-2 m-2">
            <span className="text-gray-500 text-sm">Description</span>
            <br />
            {state.item.description}
          </div>
          <div className="text-gray-700 px-4 py-2 m-2">
            <span className="text-gray-500 text-sm">Payload</span>
            <br />
            <textarea className="w-full" defaultValue={state.item.payload} />
          </div>
          <div className="flex">
            <div className="flex-1"></div>
            <div className="flex-initial">
              {policy.check("can-update", {
                request: state.item,
                requester: state.item.requester,
              }) && (
                <Button variant="primary" size="small">
                  Update
                </Button>
              )}
              {policy.check("can-delete", { request: state.item }) && (
                <Button variant="danger" size="small">
                  Delete
                </Button>
              )}
            </div>
          </div>

          <Steps request={state.item} onRefresh={refresh} />
        </>
      )}
    </Modal>
  )
  return
}

export default Show
