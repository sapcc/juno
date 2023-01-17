import React from "react"
import { Container } from "juno-ui-components"
import { Messages } from "messages-provider"

const TabContainer = ({ children }) => {
  return (
    <Container py>
      <Messages className="pb-6" />
      {children}
    </Container>
  )
}

export default TabContainer
