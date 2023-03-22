import { useEffect, useState } from "react"
import { createClient } from "sapcc-k8sclient"

/**
 * This hook creates an api client.
 * @param {string} idToken
 * @returns {object} a api client
 */
const useApiClient = (apiEndpoint, idToken) => {
  // console.log(idToken)
  const [apiClient, setApiClient] = useState()

  useEffect(() => {
    if (!idToken) return
    if (!apiClient) {
      console.log(
        "[K_API_CLIENT]: setting up client with: ",
        apiEndpoint,
        idToken
      )
      // create
      setApiClient(
        createClient({
          apiEndpoint,
          token: idToken,
        })
      )
    } else if (apiClient.currentToken() !== idToken) {
      // refresh token
      apiClient.refreshToken(idToken)
    }
  }, [apiClient, apiEndpoint, idToken])

  return apiClient
}

export default useApiClient
