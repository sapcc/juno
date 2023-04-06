import React from "react"
import Plugin from "./Plugin"
import useStore from "../hooks/useStore"
import useApi from "../hooks/useApi"
import { useLayoutEffect } from "react"

const testAppsConfig = {
  supernova: {
    name: "supernova",
    version: "latest",
    navigable: true,
    props: {
      endpoint:
        "https://alertmanager-internal.scaleout.eu-nl-1.cloud.sap/api/v2",
    },
  },

  heureka: {
    name: "heureka",
    version: "latest",
    navigable: true,
    props: {
      endpoint: "https://heureka-staging.scaleout.ap-jp-2.cloud.sap/api/v1",
    },
  },

  doop: {
    name: "doop",
    version: "latest",
    navigable: true,
    props: {
      endpoint: "https://heureka-staging.scaleout.ap-jp-2.cloud.sap/api/v1",
    },
  },
}

const PluginContainer = () => {
  const { getPluginsConfig } = useApi()
  const setAppsConfig = useStore((state) => state.apps.setConfig)
  const setActive = useStore((state) => state.apps.setActive)
  const activeApps = useStore((state) => state.apps.active)
  const appsConfig = useStore((state) => state.apps.config)

  useLayoutEffect(() => {
    if (!getPluginsConfig) return
    getPluginsConfig().then((config) => setAppsConfig(config))
  }, [getPluginsConfig])

  // set first plugin in the list of plugin config as active unless active exists
  useLayoutEffect(() => {
    if (!appsConfig) return
    const availableAppNames = Object.keys(appsConfig)
    if (availableAppNames.length === 0) return
    const active = activeApps.map((a) => availableAppNames.indexOf(a) >= 0)
    if (active.length === 0) setActive(availableAppNames[0])
  }, [appsConfig, activeApps, setActive])

  return Object.keys(appsConfig).map((appName, i) => (
    <Plugin name={appName} key={i} active={activeApps.indexOf(appName) >= 0} />
  ))
}

export default PluginContainer
