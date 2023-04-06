import { useCallback, useMemo } from "react"
import { createClient } from "sapcc-k8sclient"
import useStore from "./useStore"

const useApi = () => {
  const token = useStore((state) => state.auth.data?.JWT)
  const groups = useStore((state) => state.auth.data?.raw?.groups)
  const apiEndpoint = useStore((state) => state.apiEndpoint)
  const assetsHost = useStore((state) => state.assetsHost)

  const namespace = useMemo(() => {
    if (!groups) return null
    const orgString = groups.find((g) => g.indexOf("organization:") === 0)
    if (!orgString) return null
    return orgString.split(":")[1]
  }, [groups])

  const client = useMemo(() => {
    if (!apiEndpoint || !token) return null
    return createClient({ apiEndpoint, token })
  }, [apiEndpoint, token])

  const getPluginsConfig = useCallback(() => {
    if (!client || !assetsHost || !namespace) return

    const manifestUrl = new URL("/manifest.json", assetsHost)
    return Promise.all([
      fetch(manifestUrl).then((r) => r.json()),
      client.get("/apis/greenhouse.sap/v1alpha1/plugins", { limit: 500 }),
      client.get(
        `/apis/greenhouse.sap/v1alpha1/namespaces/${namespace}/pluginconfigs`,
        {
          limit: 500,
        }
      ),
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
            url: plugin.spec?.uiApplication?.url,
            navigable: true,
            props: {},
          }
          plugin.spec?.options?.forEach(
            (option) => (config[name]["props"][option.name] = option.default)
          )
          const pluginConfig = configs.items.find(
            (c) => c.metadata?.name === name
          )
          pluginConfig?.spec?.optionValues?.forEach(
            (o) => (config[name]["props"][o.name] = o.value)
          )
        }
      })

      console.log("=====================plugins config", config)
      return config
    })
  }, [client, assetsHost, namespace])

  return { client, getPluginsConfig }
}

export default useApi
