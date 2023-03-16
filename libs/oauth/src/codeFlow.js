import { getOidcConfig } from "./oidcConfig"
import { decodeIDToken } from "./tokenHelpers"
import { searchParams } from "./oidcState"

const exchangeCode = async ({ tokenEndpoint, code, pkce, clientID }) => {
  if (!clientID) throw new Error("clientID is required")
  const body = {
    grant_type: "authorization_code",
    code: code,
    redirect_uri: window.location.origin,
    client_id: clientID,
  }

  if (pkce) body.code_verifier = pkce

  let formBody = Object.keys(body)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(body[k])}`)
    .join("&")

  return fetch(tokenEndpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Authentication: `Basic ${encodeURIComponent(clientID)}`,
    },
    body: formBody,
  }).then((r) => r.json())
}

// console.log(
//   "-----------:::::::::",
//   window.btoa("336128263defd4af14714a5d26803fa82bc570342137946cfa9ad496")
// )

let code_verifier = "336128263defd4af14714a5d26803fa82bc570342137946cfa9ad496"
// let code_challenge = "Gjm7op_XrKNIfltGom1qI1dwj1vbw7A_YBpyjKl-6Hw"
let code_challenge

const buildRequestUrl = async ({ issuerURL, clientID, oidcState }) => {
  const config = await getOidcConfig(issuerURL)

  console.log("================", oidcState)

  let url = config.authorization_endpoint
  url += "?response_type=code"
  url += `&client_id=${clientID}`
  url += `&redirect_uri=${window.location.origin}`
  url += "&scope=openid email profile groups offline_access"
  url += `&state=${oidcState.key}`
  url += `&nonce=${oidcState.nonce}`
  url += `&code_challenge=${oidcState.challenge}`
  url += `&code_challenge_method=S256`
  return url
}

const handleResponse = async ({ issuerURL, clientID, oidcState }) => {
  console.log("================", oidcState)
  if (!searchParams) return null

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
      pkce: oidcState.verifier,
      clientID,
    })
    console.log("================data", data)
    if (data.error) throw new Error(error)
    if (!data.id_token) throw new Error("bad response, missing id_token")

    const tokenData = decodeIDToken(data.id_token)
    if (!tokenData) throw new Error("bad format of id_token")

    return { tokenData, idToken: data.id_token }
  } catch (e) {
    console.log("==============ERROR", e)
    throw e
  }
}

export { handleResponse, buildRequestUrl }
