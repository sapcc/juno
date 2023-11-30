import React, { useEffect, useState } from "react"
import { Container } from "juno-ui-components"
import { usePluginConfig, useAssetsUrl, useApiEndpoint } from "./StoreProvider"
import Plugin from "./Plugin"
import HintLoading from "./shared/HintLoading"

const PluginContainer = () => {
  const pluginConfig = usePluginConfig()
  const assetsUrl = useAssetsUrl()
  const apiEndpoint = useApiEndpoint()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!assetsUrl || !apiEndpoint) return
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [assetsUrl, apiEndpoint])

  return (
    <Container py={true}>
      {isLoading ? (
        <HintLoading text="Loading plugins..." />
      ) : (
        <>
          {Object.keys(pluginConfig).map((key, index) => (
            
            <Plugin key={index} config={pluginConfig[key]} />

          ))}
        </>
      )}
    </Container>
  )
}

export default PluginContainer
