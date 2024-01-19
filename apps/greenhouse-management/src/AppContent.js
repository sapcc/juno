import React, { useLayoutEffect, useState } from "react"
import PluginContainer from "./components/PluginContainer"
import { useApiEndpoint, useAssetsUrl } from "./components/StoreProvider"
import { Messages, useActions as messageActions } from "messages-provider"
import { Container } from "juno-ui-components"
import useCommunication from "./hooks/useCommunication"

const AppContent = () => {
  const { addMessage } = messageActions()
  const apiEndpoint = useApiEndpoint()
  const assetsUrl = useAssetsUrl()
  useCommunication()

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

    // Make these two props required
    // if a required prop is missing do not set the assetsUrl and no plugin will be loaded
    if (!apiEndpoint || !assetsUrl) return
  }, [])

  // TODO: Fix the Messages style mt-4
  return (
    <Container py={true}>
      <Messages className="mt-4" />
      <PluginContainer />
    </Container>
  )
}

export default AppContent
