import React from "react"
import { useClient } from "../lib/clientProvider"
import { Button } from "juno-ui-components"
import { useGlobalState, useDispatch } from "../lib/stateProvider"

const New = ({ close, Buttons, Body }) => {
  const client = useClient()
  const [values, updateValues] = React.useState({
    kind: "project",
    priority: 2,
    subject: "",
    description: "",
    comment: "",
    payload: "",
  })

  const [isCreating, setIsCreating] = React.useState(false)
  const dispatch = useDispatch()

  const setValue = React.useCallback((name, value) => {
    updateValues((oldValues) => ({ ...oldValues, [name]: value }))
  }, [])

  const submit = React.useCallback(() => {
    console.log(values)
    setIsCreating(true)
    client
      .createRequest(values, {
        fields:
          "id kind subject createdAt requester {name} lastProcessor { name }",
      })
      .then((response) => {
        console.log("===============RESPONSE", response)
        dispatch({ type: "ADD_REQUEST", item: response.data.createRequest })
      })
      .finally(() => setIsCreating(false))
  }, [values])

  const valid = React.useMemo(
    () =>
      values.kind && values.priority >= 0 && values.subject && values.payload,
    [values]
  )

  return (
    <>
      <Body>
        <form>
          <div className="flex">
            <div className="flex-1 pr-2">
              <label
                htmlFor="kind"
                className="block text-sm font-medium text-gray-700"
              >
                Kind
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  name="kind"
                  value={values.kind}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                  onChange={(e) => setValue("kind", e.target.value)}
                >
                  <option>Please select</option>
                  <option value="project">Project</option>
                  <option value="zone">DNS Zone</option>
                  <option value="quota">Quuota</option>
                </select>
              </div>
            </div>

            <div className="flex-1 pl-2">
              <label
                htmlFor="priority"
                className="block text-sm font-medium text-gray-700"
              >
                Priority
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <select
                  name="priority"
                  value={values.priority}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                  onChange={(e) => setValue("priority", e.target.value)}
                >
                  <option value={2}>Low</option>
                  <option value={1}>High</option>
                  <option value={0}>Urgent</option>
                </select>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700"
            >
              Subject
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <input
                name="subject"
                value={values.subject}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                onChange={(e) => setValue("subject", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <textarea
                name="description"
                value={values.description}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                onChange={(e) => setValue("description", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="comment"
              className="block text-sm font-medium text-gray-700"
            >
              Note
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <textarea
                name="comment"
                value={values.comment}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                onChange={(e) => setValue("comment", e.target.value)}
              />
            </div>
          </div>

          <div className="mt-5">
            <label
              htmlFor="payload"
              className="block text-sm font-medium text-gray-700"
            >
              Payload
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <textarea
                name="payload"
                value={values.payload}
                className="focus:ring-indigo-500 h-80 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                onChange={(e) => setValue("payload", e.target.value)}
              />
            </div>
          </div>
        </form>
      </Body>
      <Buttons>
        {" "}
        <div className="space-x-3">
          <Button
            variant="primary"
            onClick={submit}
            disabled={isCreating || !valid}
          >
            {isCreating ? "Creating..." : "Create"}
          </Button>
          <Button onClick={close}>Close</Button>
        </div>
      </Buttons>
    </>
  )
}

export default New
