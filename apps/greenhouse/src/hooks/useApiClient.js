import { useEffect, useState } from "react"
import { createClient } from "sapcc-k8sclient"

/**
 * This hook creates an api client.
 * @param {string} idToken
 * @returns {object} a api client
 */
const useApiClient = (idToken) => {
  // console.log(idToken)
  const [apiClient, setApiClient] = useState()

  useEffect(() => {
    if (!idToken) return
    if (!apiClient) {
      let apiEndpoint =
        process.env.REACT_APP_API_ENDPOINT ||
        window.location.href.replace("dashboard", "api")
      apiEndpoint = apiEndpoint.replace(/(\?.*)/, "")
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
  }, [apiClient, idToken])

  return apiClient
}

export default useApiClient
