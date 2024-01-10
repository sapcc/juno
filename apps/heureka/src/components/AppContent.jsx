import React from "react"
import { Container } from "juno-ui-components"
import ServicesController from "./services/ServicesController"

const AppContent = () => {
  return (
    <Container py>
      <ServicesController />
    </Container>
  )
}

export default AppContent
