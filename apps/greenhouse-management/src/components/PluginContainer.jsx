import React, { useEffect, useState } from "react"
import { Container } from "juno-ui-components"
import { usePluginConfig, useAssetsUrl } from "./StoreProvider"
import Plugin from "./Plugin"
import HintLoading from "./shared/HintLoading"
import { MessagesProvider } from "messages-provider"

const PluginContainer = () => {
  const pluginConfig = usePluginConfig()
  const assetsUrl = useAssetsUrl()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!assetsUrl) return
    setTimeout(() => {
      setIsLoading(false)
    }, 500)
  }, [assetsUrl])

  return (
    <Container py={true}>
      {isLoading ? (
        <HintLoading text="Loading plugins..." />
      ) : (
        <>
          {Object.keys(pluginConfig).map((key, index) => (
            <MessagesProvider key={index}>
              <Plugin config={pluginConfig[key]} />
            </MessagesProvider>
          ))}
        </>
      )}
    </Container>
  )
}

export default PluginContainer
