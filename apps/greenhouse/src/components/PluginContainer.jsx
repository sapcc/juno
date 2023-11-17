import React from "react"
import Plugin from "./Plugin"
import { usePlugin, useGlobalsEnvironment } from "../components/StoreProvider"
import useApi from "../hooks/useApi"
import { useLayoutEffect } from "react"
import HintLoading from "./shared/HintLoading"
import { Message } from "juno-ui-components"

const PluginContainer = () => {
  const { getPluginConfigs } = useApi()
  const environment = useGlobalsEnvironment()
  const config = usePlugin().config()
  const isFetching = usePlugin().isFetching()
  const error = usePlugin().error()

  const requestConfig = usePlugin().requestConfig
  const receiveConfig = usePlugin().receiveConfig
  const receiveError = usePlugin().receiveError

  const availableAppIds = React.useMemo(() => Object.keys(config), [config])

  useLayoutEffect(() => {
    if (!getPluginConfigs) return
    requestConfig()
    // fetch configs from kubernetes
    getPluginConfigs()
      .then((kubernetesConfig) => {
        receiveConfig(kubernetesConfig)
      })
      .catch((error) => {
        receiveError(error.message)
      })
  }, [getPluginConfigs, environment])

  return (
    <>
      {error && <Message text={error} variant="error" />}
      {isFetching && <HintLoading text="Loading plugins..." />}
      {availableAppIds.length > 0
        ? availableAppIds.map((id, i) => <Plugin id={id} key={i} />)
        : "No plugins available"}
    </>
  )
}

export default PluginContainer
