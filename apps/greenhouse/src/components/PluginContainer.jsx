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
  const k8sClient = useApi()
  const setAppsConfig = useStore((state) => state.apps.setConfig)
  const setActive = useStore((state) => state.apps.setActive)
  const activeApps = useStore((state) => state.apps.active)
  const appsConfig = useStore((state) => state.apps.config)
  const assetsHost = useStore((state) => state.assetsHost)

  useLayoutEffect(() => {
    if (!k8sClient || !assetsHost) return
    const manifestUrl = new URL("/manifest.json", assetsHost)
    Promise.all([
      fetch(manifestUrl).then((r) => r.json()),
      k8sClient.get("/apis/greenhouse.sap/v1alpha1/plugins", { limit: 500 }),
      k8sClient.get("/apis/greenhouse.sap/v1alpha1/pluginconfigs", {
        limit: 500,
      }),
    ]).then(([manifest, plugins, configs]) => {
      console.log("::::::::::::::::::::::::manifest", manifest)
      console.log("::::::::::::::::::::::::plugins", plugins.items)
      console.log("::::::::::::::::::::::::configs", configs.items)

      const config = {}
      plugins.items.forEach((plugin) => {
        const name = plugin.spec?.uiApplication?.name
        const version = plugin.spec?.uiApplication?.version
        if (manifest[name]?.[version]) {
          config[name] = {
            name,
            version,
            navigable: true,
            props: {},
          }
          plugin.spec?.options?.forEach(
            (option) => (config[name]["props"][option.name] = option.default)
          )
        }
      })
      console.log("======================config", config)
      setAppsConfig(testAppsConfig)
      // setAppsConfig(config)
    })
  }, [k8sClient, assetsHost])

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
