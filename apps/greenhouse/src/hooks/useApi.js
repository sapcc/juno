import { useCallback, useMemo } from "react"
import { createClient } from "sapcc-k8sclient"
import {
  useAuthData,
  useGlobalsApiEndpoint,
  useGlobalsAssetsHost,
} from "./useStore"

// get plugin configs from k8s api
const useApi = () => {
  const authData = useAuthData()
  // const token = useStoreByKey("auth.data?.JWT")
  // const groups = useStoreByKey("auth.data?.raw?.groups")
  const apiEndpoint = useGlobalsApiEndpoint()
  const assetsHost = useGlobalsAssetsHost()

  const namespace = useMemo(() => {
    if (!authData?.raw?.groups) return null
    const orgString = authData?.raw?.groups.find(
      (g) => g.indexOf("organization:") === 0
    )
    if (!orgString) return null
    return orgString.split(":")[1]
  }, [authData?.raw?.groups])

  const client = useMemo(() => {
    if (!apiEndpoint || !authData?.JWT) return null
    return createClient({ apiEndpoint, token: authData?.JWT })
  }, [apiEndpoint, authData?.JWT])

  const getPluginConfigs = useCallback(() => {
    if (!client || !assetsHost || !namespace) return Promise.resolve({})

    const manifestUrl = new URL("/manifest.json", assetsHost)
    return Promise.all([
      // manifest
      fetch(manifestUrl).then((r) => r.json()),
      // plugin configs
      client.get(
        `/apis/greenhouse.sap/v1alpha1/namespaces/${namespace}/pluginconfigs`,
        {
          limit: 500,
        }
      ),
    ]).then(([manifest, configs]) => {
      // console.log("::::::::::::::::::::::::manifest", manifest)
      // console.log("::::::::::::::::::::::::configs", configs.items)

      // create config map
      const config = {}
      configs.items.forEach((plugin) => {
        const id = plugin.metadata?.name
        const name = plugin.status?.uiApplication?.name
        const displayName = plugin.spec?.displayName
        const weight = plugin.status?.weight
        const version = plugin.status?.uiApplication?.version
        const url = plugin.status?.uiApplication?.url

        // only add plugin if the url is from another host or the name with the given version is in the manifest!
        if ((url && url.indexOf(assetsHost) < 0) || manifest[name]?.[version]) {
          // config contains id, name, displayName, weight, version, url, props
          // the id is added to the props by default
          config[id] = {
            id,
            name,
            displayName: displayName || name,
            weight,
            version,
            url,
            navigable: true,
            props: plugin.spec?.optionValues?.reduce(
              (map, item) => {
                map[item.name] = item.value
                return map
              },
              { id } // add plugin id to props
            ),
          }
        }
      })

      // console.log("::::::::::::::::::::::::config", config)

      return config
    })
  }, [client, assetsHost, namespace])

  return { client, getPluginConfigs }
}

export default useApi
