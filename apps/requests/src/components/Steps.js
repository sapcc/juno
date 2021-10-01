import { useEffect, useReducer, Fragment } from "react"
import { useClient } from "../lib/clientProvider"
import { formatDate } from "../lib/utils"
import { usePolicy } from "../lib/policyProvider"

function reducer(state, action) {
  switch (action.type) {
    case "request":
      return { ...state, isFetching: true, error: null }
    case "receive":
      return { ...state, isFetching: false, items: action.items }
    case "errors":
      return { ...state, isFetching: false, errors: action.errors }
    case "add": {
      const items = state.items.slice()
      items.unshift(action.item)
      return { ...state, items }
    }
    case "remove": {
      const index = state.items.findIndex((item) => item.id === action.item.id)
      if (index < 0) return state
      const items = state.items.slice()
      items.splice(index, 1)
      return { ...state, items }
    }
    default:
      throw new Error()
  }
}

const Steps = ({ request }) => {
  const client = useClient()
  const [steps, dispatch] = useReducer(reducer, { items: [] })
  const policy = usePolicy()

  useEffect(() => {
    if (!client || !request) return
    dispatch({ type: "request" })
    client
      .listProcessingSteps(request.id, {
        fields: `items {
          id,
          requestID,
          processor { name fullName },
          kind,
          comment,
          referenceStep { id },
          fromState,
          toState,
          transition,
          type,
          createdAt,
          updatedAt 
        }`,
      })
      .then((response) => {
        dispatch({
          type: "receive",
          items: response.data?.processingSteps?.items,
        })
      })
      .catch((response) => {
        const data = JSON.parse(response.message)
        dispatch({ type: "errors", errors: data.errors })
      })
  }, [client, request])

  return (
    <>
      <h4>Steps</h4>

      {steps.isFetching && <span>Loading...</span>}
      {steps.errors && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
          role="alert"
        >
          {steps.errors.map((error) => (
            <div>{error.message}</div>
          ))}
        </div>
      )}
      {steps.items.length === 0 && <span>No Steps yet</span>}

      {steps.items.map((step, index) => (
        <div
          key={index}
          className="rounded-xl overflow-hidden bg-gradient-to-r from-indigo-50 to-indigo-100 p-4"
        >
          <div className="grid grid-cols-5">
            {/* ID | Kind | Priority */}
            <div className="text-gray-700">
              <span className="text-gray-500 text-sm">Processor</span>
              <br />
              {step.processor?.name}
              {step.processor?.fullName && (
                <>
                  <br />
                  {step.processor?.fullName}
                </>
              )}
            </div>
            <div className="text-gray-700">
              <span className="text-gray-500 text-sm">From</span>
              <br />
              {step.fromState}
            </div>
            <div className="text-gray-700">
              <span className="text-gray-500 text-sm">Transition</span>
              <br />
              {step.transition}
            </div>
            <div className="text-gray-700">
              <span className="text-gray-500 text-sm">To</span>
              <br />
              {step.toState}
            </div>
            <div className="text-gray-700">
              <span className="text-gray-500 text-sm">Date</span>
              <br />
              {formatDate(step.updatedAt)}
            </div>
          </div>
          <div className="py-4">
            <span className="text-gray-500 text-sm">Comment</span>
            <br />
            {step.comment}
          </div>
        </div>
      ))}
    </>
  )
}

export default Steps
