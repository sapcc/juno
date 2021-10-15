import React from "react"
import { useClient } from "../lib/clientProvider"
import { Button, Modal } from "juno-ui-components"
import { useGlobalState, useDispatch } from "../lib/stateProvider"
import { usePolicy } from "../lib/policyProvider"
import { Link, useRouter } from "url-state-router"

const Requests = () => {
  const requests = useGlobalState("requests")
  const dispatch = useDispatch()

  const client = useClient()
  const policy = usePolicy()
  const { navigateTo } = useRouter()

  React.useEffect(() => {
    if (!client) return
    dispatch({ type: "REQUESTS_REQUESTS" })
    client
      .listRequests({
        fields:
          "items { id kind subject createdAt requester {name} lastProcessor { name } }",
      })
      .then((response) => {
        dispatch({
          type: "RECEIVE_REQUESTS",
          items: response.data.requests.items,
        })
      })
      .catch((response) => {
        const data = JSON.parse(response.message)
        dispatch({ type: "RECEIVE_REQUESTS_ERRORS", errors: data.errors })
      })
  }, [client])

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <React.Fragment>
        <div className="flex items-center mb-3 whitespace-nowrap p-2">
          <h2 className="font-medium text-gray-900 truncate">
            {requests.isFetching && <span>Loading </span>}Requests
          </h2>
          <div className="flex-none flex items-center ml-auto pl-4 sm:pl-6">
            <div className="group p-0.5 rounded-lg flex bg-gray-100 hover:bg-gray-200">
              {policy.check("can-create") && (
                <Button
                  size="small"
                  variant="primary"
                  onClick={() => navigateTo("/requests/new")}
                >
                  New Request
                </Button>
              )}
            </div>
          </div>
        </div>

        {requests.errors && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {requests.errors.map((error) => (
              <div>{error.message}</div>
            ))}
          </div>
        )}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>

              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Subject
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Kind
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Created at
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Requester
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Last Processor
              </th>
            </tr>
          </thead>
          <tbody>
            {requests.items.map((request, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{request.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/requests/${request.id}`}>{request.subject}</Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{request.kind}</td>

                <td className="px-6 py-4 whitespace-nowrap">
                  {request.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.requester?.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {request.lastProcessor?.name}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </React.Fragment>
    </div>
  )
}

export default Requests
