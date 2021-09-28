import React from "react"
import { Button } from "juno-ui-components"

const New = ({ close, Buttons, Body }) => {
  const [kind, setKind] = React.useState("project")
  const [priority, setPriority] = React.useState(2)
  const [subject, setSubject] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [comment, setComment] = React.useState("")
  const [payload, setPayload] = React.useState("")

  return (
    <>
      <Body>
        <form>
          {kind}
          <br />
          {priority}
          <br />
          {subject}
          <br />
          {description}
          <br />
          {comment}
          <br />
          {payload}
          <br />
          {console.log("===================BUTTONS", Buttons)}
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
                  value={kind}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                  onChange={(e) => setKind(e.target.value)}
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
                  value={priority}
                  className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                  onChange={(e) => setPriority(e.target.value)}
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
                value={subject}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                onChange={(e) => setSubject(e.target.value)}
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
                value={description}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                onChange={(e) => setDescription(e.target.value)}
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
                value={comment}
                className="focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                onChange={(e) => setComment(e.target.value)}
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
                value={payload}
                className="focus:ring-indigo-500 h-80 focus:border-indigo-500 block w-full p-2 border-2 sm:text-sm border-gray-300 border rounded-md"
                onChange={(e) => setPayload(e.target.value)}
              />
            </div>
          </div>
        </form>
      </Body>
      <Buttons>
        {" "}
        <div className="space-x-3">
          <Button variant="primary">Create</Button>
          <Button onClick={close}>Close</Button>
        </div>
      </Buttons>
    </>
  )
}

export default New
