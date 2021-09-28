import React from "react"
import { useClient } from "../lib/clientProvider"
import { Button, Modal } from "juno-ui-components"
import { useGlobalState, useDispatch } from "../lib/stateProvider"

import Show from "./Show"
import New from "./New"

const Requests = () => {
  const requests = useGlobalState("requests")
  const dispatch = useDispatch()

  const [currentItem, setCurrentItem] = React.useState()
  const [showNew, setShowNew] = React.useState(false)

  const client = useClient()

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
        dispatch({ type: "RECEIVE_REQUESTS_ERROR", error: data.errors })
      })
  }, [client])

  return (
    <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
      <React.Fragment>
        <Modal
          isOpen={showNew}
          close={() => setShowNew(false)}
          title="Create Request"
          size="4xl"
          children={({ Buttons, Body }) => (
            <New
              close={() => setShowNew(false)}
              Buttons={Buttons}
              Body={Body}
            />
          )}
        />

        {currentItem && (
          <Modal
            isOpen={!!currentItem}
            close={() => setCurrentItem(null)}
            title={`Details für ${currentItem.subject}`}
            size="4xl"
          >
            <Show item={currentItem} />
          </Modal>
        )}
        <div className="flex items-center mb-3 whitespace-nowrap p-2">
          <h2 className="font-medium text-gray-900 truncate">
            {requests.isFetching && <span>Loading </span>}Requests
          </h2>
          <div className="flex-none flex items-center ml-auto pl-4 sm:pl-6">
            <div className="group p-0.5 rounded-lg flex bg-gray-100 hover:bg-gray-200">
              <Button
                size="small"
                variant="primary"
                onClick={() => setShowNew(true)}
              >
                New Request
              </Button>
            </div>
          </div>
        </div>
        {requests.error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            {requests.error.map((error) => (
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
                  <a href="#" onClick={() => setCurrentItem(request)}>
                    {request.subject}
                  </a>
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
