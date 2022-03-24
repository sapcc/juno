import { useCallback, useEffect, useState } from "react"

/**
 * This hook implements the implicit flow of the oidc specification.
 * The user is redirected to the Identity Provider and after a successful login,
 * he returns to the app. Here, this hook extracts the credentials from the
 * URL parameters and returns them.
 *
 * In addition, "silent" mode is supported. The ID token is silently renewed
 * with the help of an iFrame.
 */
const CACHE_STATE_KEY = "state"
const CACHE_NONCE_KEY = "nonce"
const CACHE_URI_KEY = "uri"

function randomString() {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  )
}

// Extract auth data from id_token
function decodeIDToken(idToken) {
  const [_, tokenData] = idToken.split(".")
  try {
    return JSON.parse(atob(tokenData))
  } catch (e) {
    return null
  }
}

// This function processes the callback from the OIDC.
function handleOIDCResponse() {
  let queryString = window.location.search || window.location.hash
  if (queryString[0] === "#") queryString = queryString.substring(1)

  const searchParams = new URLSearchParams(queryString)
  const id_token = searchParams.get("id_token")
  const state = searchParams.get("state")
  const error = searchParams.get("error")

  searchParams.delete("id_token")
  searchParams.delete("state")
  searchParams.delete("error")

  if (!id_token && !state && !error) return

  // get state and last URL from the local store (browser)
  const storedState = window.sessionStorage.getItem(CACHE_STATE_KEY)
  const storedNonce = window.sessionStorage.getItem(CACHE_NONCE_KEY)
  const lastURL = window.sessionStorage.getItem(CACHE_URI_KEY)
  // clear the cache
  window.sessionStorage.removeItem(CACHE_STATE_KEY)
  window.sessionStorage.removeItem(CACHE_NONCE_KEY)
  window.sessionStorage.removeItem(CACHE_URI_KEY)

  const auth = (() => {
    if (error) return { error }

    // return if state is not equal to the cached state
    if (state !== storedState) return { error: "Compromised id token" }

    const tokenData = decodeIDToken(id_token)
    if (!tokenData || tokenData.nonce !== storedNonce)
      return { error: "Compromised id token content" }

    return {
      id_token,
      login_name: tokenData.login_name || tokenData.sub,
      first_name: tokenData.first_name,
      last_name: tokenData.last_name,
      full_name: `${tokenData.first_name} ${tokenData.last_name}`,
      email: tokenData.mail,
      expiresAt: tokenData.exp * 1000,
      expiresAtDate: new Date(tokenData.exp * 1000),
    }
  })()

  const [_, silent] = state.split(":")

  // silent means the response came within an iframe, it is the refresh mode.
  // In this case use the postMessage API to inform the parent window.
  if (silent) {
    window.parent.postMessage({ newAuth: auth }, window.location.origin)
  } else {
    // Return to the URL before the redirect.
    window.history.replaceState("", "", lastURL || "/")
  }
  return auth
}

// This function makes the oidc id_token flow
// silent option is used to refresh id_token in the background (silently) using iframe.
function oidcRequest({ issuerURL, clientID, silent }) {
  // generate a random string and extend it with silent prop
  let state = randomString()
  // add silent flag to state to inform response handler about the silence mode.
  if (silent) state += ":silent"
  // generate a random string to use as nonce (it is encoded into the id_token from provider)
  const nonce = randomString()

  // store state, nonce and current URL to the local store (browser)
  // state is used to verify that the response is not sabotaged.
  window.sessionStorage.setItem(CACHE_STATE_KEY, state)
  // nonce is used to verify that the token has not been sabotaged
  window.sessionStorage.setItem(CACHE_NONCE_KEY, nonce)
  // current URL is saved to return to this URL after the OIDC dance
  window.sessionStorage.setItem(CACHE_URI_KEY, window.location.href)

  // build the OIDC URL
  let url = `${issuerURL}/oauth2/authorize`
  url += "?response_type=id_token"
  url += `&client_id=${clientID}`
  url += `&redirect_uri=${window.location.origin}`
  url += "&scope=openid"
  url += `&state=${state}`
  url += `&nonce=${nonce}`

  if (silent) {
    // refresh token using iframe and postMessage API
    const iframe = document.createElement("iframe")
    url += "&prompt=none"
    iframe.setAttribute("src", url)
    iframe.setAttribute("width", 0)
    iframe.setAttribute("height", 0)
    document.body.append(iframe)
  } else {
    // redirect to this URL
    window.location.replace(url)
  }
}

// This function removes cached token from storage.
function oidcLogout(issuerURL, { silent }) {
  if (silent) {
    // refresh token using iframe and postMessage API
    const iframe = document.createElement("iframe")
    issuerURL += "&prompt=none"
    iframe.setAttribute("src", `${issuerURL}/oauth2/logout`)
    iframe.setAttribute("width", 0)
    iframe.setAttribute("height", 0)
    document.body.append(iframe)
  } else {
    window.location.replace(`${issuerURL}/oauth2/logout`)
  }
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
  const { clientID, issuerURL, initialLogin, refresh } = options || {}
  const [auth, setAuth] = useState(handleOIDCResponse())

  const login = useCallback(() => {
    oidcRequest({ issuerURL, clientID, silent: false })
  }, [clientID, issuerURL])

  const logout = useCallback(
    (options) => {
      if (options?.resetOIDCSession)
        oidcLogout(issuerURL, { silent: options.silent !== false })
      else setAuth(null)
    },
    [setAuth]
  )

  useEffect(() => {
    const listener = (event) => {
      if (event?.origin !== window.origin || !event?.data?.newAuth) return
      setAuth(event.data.newAuth)
    }

    window.addEventListener("message", listener, false)
    return () => window.removeEventListener("message", listener)
  }, [setAuth])

  useEffect(() => {
    if (!auth || !auth.expiresAt) return

    // refresh token 10 seconds before expiration
    let timer = setTimeout(
      () => oidcRequest({ issuerURL, clientID, silent: true }),
      auth.expiresAt - Date.now() - 10000
    )
    return () => clearTimeout(timer)
  }, [setAuth, auth])

  let result = {
    auth,
    login,
    logout,
    loggedIn: !!auth?.id_token,
    isProcessing: false,
  }

  if (!auth && !initialized && initialLogin) {
    result.isProcessing = true
    oidcRequest({ issuerURL, clientID, silent: false })
  }

  if (!clientID || !issuerURL) {
    const error =
      "clientID or issuerURL are undefined. Please provide a clientID and issuerURL."
    console.warn(error)
    result.error = error
  }

  return result
}

export default useOidcAuth
