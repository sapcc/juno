import React from "react"
import { Textarea } from "juno-ui-components"

const Error = ({ error }) => {
  return (
    <div className="cutom-wrapper-textarea h-full w-full">
      <Textarea
        readOnly
        invalid
        className="h-full"
        value={error?.message}
      ></Textarea>
    </div>
  )
}

export default Error
