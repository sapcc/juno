import React from "react"
import Plugin from "./Plugin"
import {
  useAppsActions,
  useAppsActive,
  useAppsConfig,
  useAppsIsFetching,
} from "../components/StoreProvider"
import useApi from "../hooks/useApi"
import { useLayoutEffect } from "react"

const PluginContainer = () => {
  const { getPluginConfigs } = useApi()
  const {
    setActive: setActiveApps,
    requestConfig,
    receiveConfig,
    receiveConfigError,
  } = useAppsActions()
  const activeApps = useAppsActive()
  const appsConfig = useAppsConfig()
  const isFetching = useAppsIsFetching()

  const availableAppIds = React.useMemo(
    () => Object.keys(appsConfig),
    [appsConfig]
  )

  useLayoutEffect(() => {
    if (!getPluginConfigs) return
    requestConfig()
    getPluginConfigs()
      .then((config) => receiveConfig(config))
      .catch((error) => receiveConfigError(error.message))
  }, [getPluginConfigs, requestConfig, receiveConfig, receiveConfigError])

  // set first plugin in the list of plugin config as active unless active exists
  useLayoutEffect(() => {
    if (!appsConfig) return
    const availableAppIds = Object.keys(appsConfig)
    if (availableAppIds.length === 0) return
    const active = activeApps.map((a) => availableAppIds.indexOf(a) >= 0)

    if (active.length === 0) {
      // if there is no active app, then from appsConfig, get the app id of the app with the lowest weight and set it as active
      const minWeightApp = Object.values(appsConfig).reduce(
        (previous, current) => {
          return current.weight < previous.weight ? current : previous
        }
      )
      setActiveApps(minWeightApp.id)
    }
  }, [appsConfig, activeApps, setActiveApps])

  if (isFetching) return "Loading plugins..."
  if (availableAppIds.length === 0) return "No plugins available"
  return availableAppIds.map((id, i) => (
    <Plugin id={id} key={i} active={activeApps.indexOf(id) >= 0} />
  ))
}

export default PluginContainer
