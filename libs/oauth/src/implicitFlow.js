import { decodeIDToken } from "./tokenHelpers"
import { getOidcConfig } from "./oidcConfig"
import { searchParams } from "./oidcState"

const buildRequestUrl = async ({ issuerURL, clientID, oidcState }) => {
  const config = await getOidcConfig(issuerURL)
  let url = config.authorization_endpoint
  url += "?response_type=id_token"
  url += `&client_id=${clientID}`
  url += `&redirect_uri=${window.location.origin}`
  url += "&scope=openid"
  url += `&state=${oidcState.key}`
  url += `&nonce=${oidcState.nonce}`
  return url
}

/**
 * Handle the implicit flow response (id token flow)
 * @param {object} params
 * @returns {Promise} resolves to token data
 */
const handleResponse = async () => {
  if (!searchParams) return null

  const idToken = searchParams.get("id_token")
  const error = searchParams.get("error")

  if (error) throw new Error(error)
  if (!idToken) throw new Error("bad response, missing id_token")

  const tokenData = decodeIDToken(idToken)
  if (!tokenData) throw new Error("bad format of id_token")

  return { tokenData, idToken }
}

export { handleResponse, buildRequestUrl }
