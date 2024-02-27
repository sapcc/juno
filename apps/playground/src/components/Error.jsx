import React from "react"
import { Textarea } from "juno-ui-components"

const preErrorClasses = `
custom-error-pre
border-theme-error
bg-theme-textinput
text-theme-textinput
border
text-base
leading-4
p-4
rounded-3px
h-full
w-full
`

const Error = ({ error }) => {
  return (
    <pre className={preErrorClasses}>
      {error?.message || error?.toString() || "An error occurred"}
    </pre>
  )
}

export default Error
