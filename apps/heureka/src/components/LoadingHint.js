import React from "react"
import { Stack, Spinner } from "juno-ui-components"

const LoadingHint = ({ text }) => {
  return (
    <Stack alignment="center">
      <Spinner variant="primary" />
      {text ? <span>{text}</span> : <span>Loading...</span>}
    </Stack>
  )
}

export default LoadingHint
