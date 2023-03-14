import { getOidcConfig } from "./oidcConfig"
import { decodeIDToken } from "./tokenHelpers"
import { randomString } from "./utils"

const exchangeCode = async ({ tokenEndpoint, code, pkce, clientId }) => {
  if (!clientId) throw new Error("clientId is required")
  const body = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: window.location.origin,
    client_id: clientId,
  }
  if (pkce) body.code_verifier = pkce

  let formBody = Object.keys(body)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
    .join("&")

  return fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authentication: clientId,
    },
    body: formBody,
  }).then((r) => r.json())
}

const buildRequestUrl = async ({ issuerURL, clientId }) => {
  const config = await getOidcConfig(issuerURL)
  const state = {
    key: randomString(),
    nonce: randomString(),
    pkce: randomString(),
  }
  let url = config.authorization_endpoint
  url += "?response_type=code"
  url += `&client_id=${clientId}`
  url += `&redirect_uri=${window.location.origin}`
  url += "&scope=openid email profile groups offline_access"
  url += `&state=${state.key}`
  url += `&nonce=${state.nonce}`
  url += `&code_challenge=${state.pkce}`
  url += `&code_challenge_method=plain`
  return { url, state }
}

const handleResponse = async ({
  searchParams,
  issuerURL,
  clientId,
  stateData,
}) => {
  const code = searchParams.get("code")
  const error = searchParams.get("error")

  if (error) throw new Error(error)
  if (!code) throw new Error("bad response, missing code param")

  try {
    // get token endpoint
    const config = await getOidcConfig(issuerURL)
    if (!config)
      throw new Error("could not load oidc config, issuerURL: " + issuerURL)

    const data = await exchangeCode({
      tokenEndpoint: config.token_endpoint,
      code,
      pkce: stateData.pkce,
      clientId,
    })

    if (data.error) throw new Error(error)
    if (!data.id_token) throw new Error("bad response, missing id_token")

    const tokenData = decodeIDToken(data.id_token)
    if (!tokenData) throw new Error("bad format of id_token")

    return { tokenData, idToken: data.id_token }
  } catch (e) {
    throw e
  }
}

export { handleResponse, buildRequestUrl }
