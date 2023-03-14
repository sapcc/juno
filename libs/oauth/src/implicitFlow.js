import { decodeIDToken } from "./tokenHelpers"
import { getOidcConfig } from "./oidcConfig"
import { randomString } from "./utils"

const buildRequestUrl = async ({ issuerURL, clientId }) => {
  const config = await getOidcConfig(issuerURL)
  const state = {
    key: randomString(),
    nonce: randomString(),
  }
  let url = config.authorization_endpoint
  url += "?response_type=id_token"
  url += `&client_id=${clientId}`
  url += `&redirect_uri=${window.location.origin}`
  url += "&scope=openid"
  url += `&state=${state.key}`
  url += `&nonce=${state.nonce}`
  return { url, state }
}
/**
 * Handle the implicit flow response (id token flow)
 * @param {object} params
 * @returns {Promise} resolves to token data
 */
const handleResponse = async ({ searchParams }) => {
  const idToken = searchParams.get("id_token")
  const error = searchParams.get("error")

  if (error) throw new Error(error)
  if (!idToken) throw new Error("bad response, missing id_token")

  const tokenData = decodeIDToken(idToken)
  if (!tokenData) throw new Error("bad format of id_token")

  return { tokenData, idToken }
}

export { handleResponse, buildRequestUrl }
