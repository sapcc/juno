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

  return client
}

export default useApi
