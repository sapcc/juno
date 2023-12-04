import React, { useLayoutEffect, useState } from "react"
import PluginContainer from "./components/PluginContainer"
import { useActions } from "./components/StoreProvider"
import { Messages, useActions as messageActions } from "messages-provider"
import { Container } from "juno-ui-components"

const AppContent = (props) => {
  const { setAssetsUrl } = useActions()
  const { addMessage } = messageActions()

  useLayoutEffect(() => {
    if (!props.apiEndpoint) {
      addMessage({
        variant: "warning",
        text: " required api endpoint not set",
      })
    }

    if (!props.assetsUrl) {
      addMessage({
        variant: "warning",
        text: "required assets url not set",
      })
    }

    // Make these two props required
    // if a required prop is missing do not set the assetsUrl and no plugin will be loaded
    if (!props.apiEndpoint || !props.assetsUrl) return

    setAssetsUrl(props.assetsUrl)
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
