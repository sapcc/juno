import React, { useLayoutEffect, useState } from "react"
import PluginContainer from "./components/PluginContainer"
import { useApiEndpoint, useAssetsUrl } from "./components/StoreProvider"
import { Messages, useActions as messageActions } from "messages-provider"
import { Container } from "juno-ui-components"

const AppContent = () => {
  const { addMessage } = messageActions()
  const apiEndpoint = useApiEndpoint()
  const assetsUrl = useAssetsUrl()

  useLayoutEffect(() => {
    if (!apiEndpoint) {
      addMessage({
        variant: "warning",
        text: " required api endpoint not set",
      })
    }

    if (!assetsUrl) {
      addMessage({
        variant: "warning",
        text: "required assets url not set",
      })
    }

    addMessage({
      variant: "warning",
      text: "required assets url not set",
    })

    // Make these two props required
    // if a required prop is missing do not set the assetsUrl and no plugin will be loaded
    if (!apiEndpoint || !assetsUrl) return
  }, [])

  // TODO: Fix the Messages style mt-4
  return (
    <Container py={true}>
      <PluginContainer />
    </Container>
  )
}

export default AppContent
