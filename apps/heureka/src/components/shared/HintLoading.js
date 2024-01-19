import React from "react"
import { Stack, Spinner } from "juno-ui-components"

const HintLoading = ({ text, ...props }) => {
  return (
    <Stack alignment="center" {...props}>
      <Spinner variant="primary" />
      {text ? <span>{text}</span> : <span>Loading...</span>}
    </Stack>
  )
}

export default HintLoading
