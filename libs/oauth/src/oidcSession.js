import { parseIdTokenData } from "./tokenHelpers"
import * as implicitFlowHandler from "./implicitFlow"
import * as codeFlowHandler from "./codeFlow"

import {
  hasValidState,
  createState as createRequestState,
  getState as getResponseState,
} from "./oidcState"
import { getOidcConfig } from "./oidcConfig"

export const FLOW_TYPE = {
  IMPLICIT: "implicit",
  CODE: "code",
}

const isOidcResponse = hasValidState()

// Proof Key for Code Exchange

const oidcFlowHandler = (flowType) => {
  if (flowType === FLOW_TYPE.IMPLICIT) return implicitFlowHandler
  else if (flowType === FLOW_TYPE.CODE) return codeFlowHandler
  throw new Error("no flow handler for " + oidcState.flowType)
}

const createIFrame = (url) => {
  const currentScript = document.querySelector(
    `iframe[id="__oauth_silent_mode"]`
  )
  if (currentScript) currentScript.remove()
  // refresh token using iframe and postMessage API
  const iframe = document.createElement("iframe")
  iframe.setAttribute("id", "__oauth_silent_mode")
  iframe.setAttribute("src", url + "&prompt=none")
  iframe.setAttribute("width", 0)
  iframe.setAttribute("height", 0)
  document.body.append(iframe)
}

const removeIFrame = () => {
  const currentScript = document.querySelector(
    `iframe[id="__oauth_silent_mode"]`
  )
  if (currentScript) currentScript.remove()
}

//############################## REQUEST #################################
// This function makes the oidc id_token flow
// silent option is used to refresh id_token in the background (silently) using iframe.
const createOidcRequest = async ({ issuerURL, clientID, flowType, silent }) => {
  try {
    const oidcState = await createRequestState(
      { flowType, silent },
      { pkce: flowType === FLOW_TYPE.CODE }
    )
    const handler = oidcFlowHandler(flowType)

    const url = await handler.buildRequestUrl({
      issuerURL,
      clientID,
      oidcState,
    })

    if (silent) {
      createIFrame(url)
    } else {
      // redirect to this URL
      window.location.replace(url)
    }
  } catch (error) {
    throw new Error("(OAUTH) " + error.message)
  }
}

//################################ RESPONSE #################################
const handleOidcResponse = async ({ issuerURL, clientID }) => {
  // no oidc state presented or it does not match the stored one -> return null
  const oidcState = getResponseState()
  if (!oidcState) {
    console.warn("(OAUTH) url state does not match stored state, ignore it!")
    return null
  }

  try {
    const handler = oidcFlowHandler(oidcState.flowType)
    const { tokenData, idToken } = await handler.handleResponse({
      issuerURL,
      clientID,
      oidcState,
    })

    if (oidcState.nonce && tokenData?.nonce !== oidcState.nonce)
      throw new Error("compromised id token content")

    const authData = {
      JWT: idToken,
      raw: tokenData,
      parsed: parseIdTokenData(tokenData),
    }

    // silent means the response came within an iframe, it is the refresh mode.
    // In this case use the postMessage API to inform the parent window.
    if (oidcState.silent) {
      window.parent.postMessage(
        { action: "SILENT_AUTH_UPDATE", auth: authData },
        window.location.origin
      )
    } else if (oidcState.lastUrl) {
      // Return to the URL before the redirect.
      window.history.replaceState("", "", oidcState.lastUrl || "/")
    }
    return authData
  } catch (error) {
    throw new Error("(OAUTH) " + error.message)
  }
}

// This function removes cached token from storage.
function oidcLogout({ issuerURL, silent }) {
  getOidcConfig(issuerURL).then((config) => {
    if (!config.end_session_endpoint) {
      console.warn(
        'WARNING: (OAUTH) Id provider does not offer an endpoint for logout. Checked: "end_session_endpoint"'
      )
      return
    }
    let url = config.end_session_endpoint
    if (silent) {
      const currentScript = document.querySelector(
        `iframe[id="__oauth_logout_silent_mode"]`
      )
      if (currentScript) currentScript.remove()
      // refresh token using iframe and postMessage API
      const iframe = document.createElement("iframe")
      iframe.setAttribute("id", "__oauth_silent_mode")
      iframe.setAttribute("src", url + "&prompt=none")
      iframe.setAttribute("width", 0)
      iframe.setAttribute("height", 0)
      document.body.append(iframe)
    } else {
      window.location.replace(url)
    }
  })
}

const oidcSession = (params) => {
  let {
    issuerURL,
    clientID,
    initialLogin,
    refresh,
    flowType,
    onUpdate,
    requestParams,
    callbackURL,
    ...unknownProps
  } = params || {}
  if (!issuerURL || !clientID) {
    throw new Error("(OAUTH) issuerURL and clientID are required")
  }
  if (onUpdate && typeof onUpdate !== "function") {
    throw new Error("(OAUTH) onUpdate should be a function")
  }
  if (!flowType) {
    console.info("INFO: (OAUTH) no flowType provided, default to code")
    flowType = "code"
  } else if (Object.values(FLOW_TYPE).indexOf(flowType) < 0) {
    throw new Error("(OAUTH) flowType " + flowType + " is not supported!")
  }

  if (Object.keys(unknownProps).length > 0) {
    console.warn(
      "WARNING: (OAUTH) unknown options: unknown. Allowed options are issuerURL, clientID, initialLogin, refresh, flowType, onUpdate, requestParams, callbackURL"
    )
  }

  // initialize state
  let state = { auth: null, error: null, isProcessing: false, loggedIn: false }

  let refreshTimer

  // define update method which updates the state and calls the callback function
  const update = (newState) => {
    state = { ...state, ...newState }
    if (onUpdate) onUpdate({ ...state })

    clearTimeout(refreshTimer)
    if (refresh && state.auth.expiresAt) {
      // refresh token 10 seconds before expiration
      refreshTimer = setTimeout(
        () =>
          createOidcRequest({ issuerURL, clientID, flowType, silent: true }),
        state.auth.expiresAt - Date.now() - 10000
      )
    }
  }

  // listen to updates from iframe
  window.addEventListener(
    "message",
    (event) => {
      if (
        event?.origin !== window.origin ||
        event?.data?.action !== "SILENT_AUTH_UPDATE"
      )
        return
      update({
        auth: event.data.auth,
        error: null,
        loggedIn: !!event.data.auth,
        isProcessing: false,
      })
      removeIFrame()
    },
    false
  )

  // if oidc is present, then the current page load is a oidc response!
  // handle the oidc response if odicState is present
  if (isOidcResponse) {
    console.log("===OAUTH: handle oidc response")
    update({ isProcessing: true })
    // try to get auth infos from the URL if current page load is a redirect from ID Provider
    // Initial auth state!
    handleOidcResponse({ issuerURL, clientID })
      .then((data) => {
        update({
          auth: data,
          error: null,
          loggedIn: !!data,
          isProcessing: false,
        })
      })
      .catch((error) =>
        update({
          auth: null,
          error: error.toString(),
          loggedIn: false,
          isProcessing: false,
        })
      )
  }

  const login = () => {
    update({ isProcessing: true })
    createOidcRequest({ issuerURL, clientID, flowType, silent: false })
  }

  const logout = (options) => {
    update({ auth: null, error: null, loggedIn: false, isProcessing: false })
    if (options?.resetOIDCSession)
      oidcLogout({ issuerURL, silent: options?.silent === true })
  }

  if (!isOidcResponse && initialLogin) login()

  return {
    login,
    logout,
    currentState: () => ({ ...state }),
  }
}

export default oidcSession
