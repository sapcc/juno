import React from "react"
import { Container } from "juno-ui-components"
import { MessagesProvider, Messages } from "messages-provider"

const TabContainer = ({ children }) => {
  return (
    <MessagesProvider>
      <Container py>
        <Messages className="pb-6" />
        {children}
      </Container>
    </MessagesProvider>
  )
}

export default TabContainer
