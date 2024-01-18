import { createStore } from "zustand"
import { devtools } from "zustand/middleware"
import { managementPluginConfig } from "../../package.json"

export default (options) => {
  Object.keys(managementPluginConfig).forEach((key) => {
    managementPluginConfig[key].props = {
      endpoint: options.apiEndpoint,
      embedded: true,
    }
  })

  return createStore(
    devtools((set, get) => ({
      isUrlStateSetup: false,
      assetsUrl: null,
      pluginConfig: managementPluginConfig,
      pluginActive: "greenhouse-cluster-admin", // name of the active plugin default

      actions: {
        setPluginActive: (pluginId) =>
          set(
            (state) => {
              state.pluginActive = pluginId
            },
            false,
            "setPluginActive"
          ),
        setIsUrlStateSetup: (isSetup) =>
          set(
            (state) => {
              state.isUrlStateSetup = isSetup
            },
            false,
            "setIsUrlStateSetup"
          ),
        setAssetsUrl: (url) =>
          set(
            (state) => {
              state.assetsUrl = url
            },
            false,
            "setAssetsUrl"
          ),
      },
    }))
  )
}
