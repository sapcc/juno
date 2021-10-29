import { useEffect, useCallback, useState, useMemo, Fragment } from "react"
import { useClient } from "../lib/clientProvider"
import { formatDate } from "../lib/utils"
import { usePolicy } from "../lib/policyProvider"
import { Button } from "juno-ui-components"

const StepActions = ({ request, onNewStep }) => {
  const [newType, setNewType] = useState()
  const [comment, setComment] = useState()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const policy = usePolicy()
  const client = useClient()
  const submitButtonLabel = useMemo(() => {
    if (!newType) return ""
    switch (newType) {
      case "START":
        return "Start Processing"
      case "APPROVE":
        return "Approve"
      case "NOTE":
        return "Add Note"
      case "CLOSE":
        return "Close"
      case "REOPEN":
        return "Reopen"
      case "ASK":
        return "Ask Requester"
      case "REJECT":
        return "Reject"
      case "PROCESS":
        return "Process"
    }
  }, [newType])

  const submit = useCallback(() => {
    if (!request || !client || !newType) return
    setIsSubmitting(true)
    let actionName = (() => {
      switch (newType) {
        case "START":
          return "startProcessing"
        case "APPROVE":
          return "approve"
        case "NOTE":
          return "addNote"
        case "CLOSE":
          return "close"
        case "REOPEN":
          return "reopen"
        case "ASK":
          return "askRequester"
        case "REJECT":
          return "reject"
        case "PROCESS":
          return "process"
      }
    })()

    console.log("======================", actionName, client[actionName])
    client[actionName](request.id, { comment })
      .then((response) => {
        setIsSubmitting(false)
        setComment("")
        setNewType(false)
      })
      .then(onNewStep)
  }, [request, client, newType, comment])

  return (
    <div>
      <div className="py-4 space-x-2">
        {policy.check("can-start-processing", { request }) && (
          <Button
            variant="primary"
            size="small"
            onClick={() => setNewType("START")}
          >
            Start
          </Button>
        )}
        {policy.check("can-approve", { request }) && (
          <Button
            variant="primary"
            size="small"
            onClick={() => setNewType("APPROVE")}
          >
            Approve
          </Button>
        )}
        {policy.check("can-add-note", {
          request,
          requester: request.requester,
        }) && (
          <Button
            variant="default"
            size="small"
            onClick={() => setNewType("NOTE")}
          >
            Note
          </Button>
        )}
        {policy.check("can-close", {
          request,
          requester: request.requester,
        }) && (
          <Button
            variant="default"
            size="small"
            onClick={() => setNewType("CLOSE")}
          >
            Close
          </Button>
        )}
        {policy.check("can-reopen", {
          request,
          requester: request.requester,
        }) && (
          <Button
            variant="default"
            size="small"
            onClick={() => setNewType("REOPEN")}
          >
            Reopen
          </Button>
        )}
        {policy.check("can-ask", { request }) && (
          <Button
            variant="default"
            size="small"
            onClick={() => setNewType("ASK")}
          >
            Ask Requester
          </Button>
        )}
        {policy.check("can-reject", { request }) && (
          <Button
            variant="default"
            size="small"
            onClick={() => setNewType("REJECT")}
          >
            Reject
          </Button>
        )}
        {policy.check("can-process", { request }) && (
          <Button
            variant="default"
            size="small"
            onClick={() => setNewType("PROCESS")}
          >
            Process
          </Button>
        )}
      </div>

      {newType && (
        <div className="rounded-xl overflow-hidden bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Comment
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <textarea
              className="w-full p-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            ></textarea>
          </div>
          <div className="flex pt-2">
            <div className="flex-1"></div>
            <div className="flex-initial">
              <Button
                variant="primary"
                size="small"
                onClick={() => submit()}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : submitButtonLabel || "Go"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default StepActions
