import React from "react"
import Plugin from "./Plugin"
import { usePlugin } from "../components/StoreProvider"
import useApi from "../hooks/useApi"
import { useLayoutEffect } from "react"
import { createPluginConfig } from "../lib/plugin"

const PluginContainer = () => {
  const { getPluginConfigs } = useApi()
  const { requestConfig, receiveConfigError } = usePlugin.actions()
  const saveConfig = usePlugin.saveConfig()
  const activeApps = usePlugin.active()
  const appsConfig = usePlugin.config()
  const isFetching = usePlugin.isFetching()

  const availableAppIds = React.useMemo(
    () => Object.keys(appsConfig),
    [appsConfig]
  )

  useLayoutEffect(() => {
    if (!getPluginConfigs) return
    // set loading state
    requestConfig()
    // set the predefined config
    let config = {
      [`greenhouse-management`]: createPluginConfig({
        id: "greenhouse-management",
        name: "greenhouse-management",
        displayName: "Organization",
        navType: usePlugin.navTypes.MNG,
      }),
    }
    // fetch configs from kubernetes
    getPluginConfigs()
      .then((kubernetesConfig) => {
        // add the configs to the object
        config = { ...config, ...kubernetesConfig }
      })
      .catch((error) => {
        // TODO display this error
        receiveConfigError(error.message)
      })
      .finally(() => {
        // save config into zustand
        saveConfig(config)
      })
  }, [getPluginConfigs])

  if (isFetching) return "Loading plugins..."
  if (availableAppIds.length === 0) return "No plugins available"
  return availableAppIds.map((id, i) => (
    <Plugin id={id} key={i} active={activeApps.indexOf(id) >= 0} />
  ))
}

export default PluginContainer
