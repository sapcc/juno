import React from "react"
import { CodeBlock, Container } from "juno-ui-components"

const TabAdvanced = ({ asset }) => {
  return (
    <Container py px={false}>
      <CodeBlock content={asset || {}} heading="Asset JSON" lang="json" />
    </Container>
  )
}

export default TabAdvanced
