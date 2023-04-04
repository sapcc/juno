import { useMemo } from "react"
import { createClient } from "sapcc-k8sclient"
import useStore from "./useStore"

const useApi = () => {
  const token = useStore((state) => state.auth.data?.JWT)
  const apiEndpoint = useStore((state) => state.apiEndpoint)

  const client = useMemo(() => {
    if (!apiEndpoint || !token) return null
    return createClient({ apiEndpoint, token })
  }, [apiEndpoint, token])

  if (client) {
    client
      .get("/apis/greenhouse.sap/v1alpha1/plugins", { limit: 500 })
      .then((r) => console.log("=========================plugins", r))

    client
      .get("/apis/greenhouse.sap/v1alpha1/pluginconfigs", { limit: 500 })
      .then((r) => console.log("=========================configs", r))
  }

  return client
}

export default useApi
