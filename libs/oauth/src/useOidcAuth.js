import { useCallback, useState } from "react"

const CACHE_STATE_KEY = "state"
const CACHE_NONCE_KEY = "nonce"
const CACHE_URI_KEY = "uri"

let queryString = window.location.search || window.location.hash
if (queryString[0] === "#") queryString = queryString.substring(1)

const searchParams = new URLSearchParams(queryString)

function randomString() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

// This function processes the callback from the OIDC.
function handleOIDCResponse() {
  // get the id_token from URL
  const id_token = searchParams.get("id_token")
  // return if no id_token available
  if (!id_token) return
  // get the state from URL
  const state = searchParams.get("state")
  // return if no state available
  if (!state) return

  // get state and last URL from the local store (browser)
  const storedState = window.sessionStorage.getItem(CACHE_STATE_KEY)
  const storedNonce = window.sessionStorage.getItem(CACHE_NONCE_KEY)
  const lastURL = window.sessionStorage.getItem(CACHE_URI_KEY)
  // clear the cache
  window.sessionStorage.removeItem(CACHE_STATE_KEY)
  window.sessionStorage.removeItem(CACHE_NONCE_KEY)
  window.sessionStorage.removeItem(CACHE_URI_KEY)

  // return if state is not equal to the cached state
  if (state !== storedState) return

  // return to the URL before the OIDC redirect.
  window.history.replaceState("", "", lastURL || "/")

  // construct auth object
  const auth = { id_token }
  try {
    const [_, tokenData] = id_token.split(".")
    let tokenJson = JSON.parse(atob(tokenData))

    if (tokenJson.nonce !== storedNonce) return
    // console.log("=======================================")
    // console.log(tokenJson)
    auth["login_name"] = tokenJson.login_name
    auth["first_name"] = tokenJson.first_name
    auth["last_name"] = tokenJson.last_name
    auth["full_name"] = `${tokenJson.first_name} ${tokenJson.last_name}`
    auth["email"] = tokenJson.mail
    auth["expiresAt"] = tokenJson.exp * 1000
    auth["expiresAtDate"] = new Date(tokenJson.exp * 1000)
  } catch (e) {}

  return auth
}

// This function makes the oidc id_token flow
function oidcRequest({ issuerURL, clientID }) {
  // generate a random string to use as state
  const state = randomString()
  // generate a random string to use as nonce (it is encoded into the id_token from provider)
  const nonce = randomString()

  // store state, nonce and current URL to the local store (browser)
  // state is used to verify that the response is not sabotaged.
  window.sessionStorage.setItem("state", state)
  // nonce is used to verify that the token has not been sabotaged
  window.sessionStorage.setItem("nonce", nonce)
  // current URL is saved to return to this URL after the OIDC dance
  window.sessionStorage.setItem("uri", window.location.href)

  // build the OIDC URL
  let url = `${issuerURL}/oauth2/authorize`
  url += "?response_type=id_token"
  url += `&client_id=${clientID}`
  url += `&redirect_uri=${window.location.origin}`
  url += "&scope=openid"
  url += `&state=${state}`
  url += `&nonce=${nonce}`

  // redirect to this URL
  window.location.replace(url)
}

// This function removes cached token from storage.
function oidcLogout(issuerURL) {
  window.location.replace(`${issuerURL}/oauth2/logout`)
}

let initialized = false
/**
 * This hook ensures that the user is logged on via OIDC and SAP ID Provider.
 * Use this hook only in web applications. OIDC flow requires a redirect!
 * @param {Object} oidcConf - The configuration.
 * @param {string} oidcConf.clientID - The ID of the client. This information is stored in the OpenID provider.
 * @param {string} oidcConf.issuerURL - The URL of the OpenID Provider. This URL can usually be found under the
 * endpoint https://PROVIDER_HOST/.well-known/openid-configuration.
 * @returns {Object} {id_token,first_name,last_name,full_name,email}
 */
const useOidcAuth = (options) => {
  const { clientID, issuerURL, initialLogin } = options || {}
  const [auth, setAuth] = useState(handleOIDCResponse())
  const login = useCallback(() => {
    oidcRequest({ issuerURL, clientID })
  }, [clientID, issuerURL])

  const logout = useCallback(
    (options) => {
      if (options?.resetOIDCSession) oidcLogout(issuerURL)
      else setAuth(null)
    },
    [setAuth]
  )

  let result = { login, logout, error: null, isProcessing: false }

  if (!clientID || !issuerURL) {
    const error =
      "clientID or issuerURL are undefined. Please provide a clientID and issuerURL."
    console.warn(error)
    return { ...result, error }
  }

  if (!auth && !initialized && initialLogin) {
    oidcRequest({ issuerURL, clientID })
    return { ...result, isProcessing: true }
  }

  initialized = true

  return { ...result, auth }
}

export default useOidcAuth
