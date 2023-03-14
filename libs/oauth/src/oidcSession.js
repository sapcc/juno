import { decode, encode } from "./utils"
import { parseIdTokenData } from "./tokenHelpers"
import { FLOW_TYPE } from "./constants"
import * as implicitFlowHandler from "./implicitFlow"
import * as codeFlowHandler from "./codeFlow"

const oidcFlowHandler = (flowType) => {
  if (flowType === "idToken") return implicitFlowHandler
  else if (flowType === "pkce") return codeFlowHandler
}

// This function makes the oidc id_token flow
// silent option is used to refresh id_token in the background (silently) using iframe.
const createOidcRequest = async ({ issuerURL, clientId, silent, flowType }) => {
  const handler = oidcFlowHandler(flowType)

  const { url, state } = await handler.buildRequestUrl({
    issuerURL,
    clientId,
  })

  // extend state
  state.silent = silent
  state.flowType = flowType
  state.lastUrl = window.location.href

  // store state, nonce and current URL to the local store (browser)
  // state is used to verify that the response is not sabotaged.
  window.sessionStorage.setItem(state.key, encode(state))

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

const handleOidcResponse = async ({ issuerURL, clientId }) => {
  let queryString = window.location.search || window.location.hash || ""
  if (queryString[0] === "#") queryString = queryString.substring(1)

  const searchParams = new URLSearchParams(queryString)

  // get state from URL
  const state = searchParams.get("state")
  // URL does not contain a state param -> return null
  if (!state) return null

  // get state and last URL from the local store (browser)
  const storedState = window.sessionStorage.getItem(state)

  // url state and storedState are different
  // do nothing as it is not oidc request initiated from this lib
  if (!storedState) {
    console.warn("(OAUTH) url state does not match stored state, ignore it!")
    return null
  }
  window.sessionStorage.removeItem(state)

  try {
    const stateData = decode(storedState)

    if (!stateData)
      throw new Error(
        "state param is compromised (could not decode state param)"
      )

    const handler = oidcFlowHandler(stateData.flowType)
    const { tokenData, idToken } = await handler.handleResponse({
      issuerURL,
      clientId,
      stateData,
    })

    if (stateData.nonce && tokenData?.nonce !== stateData.nonce)
      throw new Error("compromised id token content")

    const authData = { idToken, ...parseIdTokenData(tokenData) }

    // silent means the response came within an iframe, it is the refresh mode.
    // In this case use the postMessage API to inform the parent window.
    if (silent) {
      window.parent.postMessage(
        { newAuthData: authData },
        window.location.origin
      )
    } else if (stateData.lastUrl) {
      // Return to the URL before the redirect.
      window.history.replaceState("", "", stateData.lastUrl || "/")
    }
    return authData
  } catch (error) {
    throw new Error("(OAUTH) " + error.message)
  }
}

// // This function removes cached token from storage.
// function oidcLogout(issuerURL, { silent }) {
//   let url = new URL("/oauth2/logout", issuerURL)
//   if (silent) {
//     // refresh token using iframe and postMessage API
//     const iframe = document.createElement("iframe")
//     url.search = "prompt=none"
//     iframe.setAttribute("src", url.href)
//     iframe.setAttribute("width", 0)
//     iframe.setAttribute("height", 0)
//     document.body.append(iframe)
//   } else {
//     window.location.replace(url.href)
//   }
// }

const oidcSession = (params) => {
  let {
    issuerURL,
    clientId,
    initialLogin,
    refresh,
    flowType,
    onUpdate,
    ...unknownProps
  } = params || {}
  if (!issuerURL || !clientId) {
    throw new Error("(OAUTH) issuerURL is required")
  }
  if (onUpdate && typeof onUpdate !== "function") {
    throw new Error("(OAUTH) onUpdate should be a function")
  }
  if (!flowType) {
    console.warn("WARNING: (OAUTH) no flowType provided, default to idToken")
    flowType = "idToken"
  } else if (ALLOWED_FLOW_TYPES.indexOf(flowType) < 0) {
    throw new Error("(OAUTH) flowType " + flowType + " is not supported!")
  }

  if (Object.keys(unknownProps).length > 0) {
    console.warn(
      "WARNING: (OAUTH) unknown options: unknown. Allowed options are issuerURL, clientId, initialLogin, refresh, flowType, onUpdate"
    )
  }

  let state = {
    auth: null,
    error: null,
    isProcessing: true,
    loggedIn: false,
  }

  //
  const update = (newState) => {
    state = { ...state, ...newState }
    if (onUpdate) onUpdate({ ...state })
  }

  const init = async () => {
    update()
    // try to get auth infos from the URL if current page load is a redirect from ID Provider
    // Initial auth state!
    const data = await handleOidcResponse({ issuerURL, clientId })
    if (data)
      update({ auth: data, error: null, loggedIn: true, isProcessing: false })
    else
      update({ auth: null, error: null, loggedIn: false, isProcessing: false })
  }

  init().catch((error) =>
    update({
      auth: null,
      error: error.toString(),
      loggedIn: false,
      isProcessing: false,
    })
  )

  createOidcRequest({ issuerURL, clientId, flowType })
  return {
    // login: () =>  {
    //   if(!state.loggedIn) createOidcRequest({issuerURL,clientId,silent:false,flowType})
    //   oidcRequest({ issuerURL, clientId, silent })
    // }, [clientId, issuerURL]),
    login: () => null,
    logout: () => null,
    currentState: () => ({ ...state }),
  }
}

export default oidcSession
