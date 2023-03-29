import { parseIdTokenData } from "./tokenHelpers"
import * as implicitFlowHandler from "./implicitFlow"
import * as codeFlowHandler from "./codeFlow"

import {
  hasValidState,
  createState as createRequestState,
  getState as getResponseState,
} from "./oidcState"
import { getOidcConfig } from "./oidcConfig"

// define flow types
export const FLOW_TYPE = {
  IMPLICIT: "implicit",
  CODE: "code",
}

// the state is determined when the lib is loaded
const isOidcResponse = hasValidState()

// returns the correct flow handler
const oidcFlowHandler = (flowType) => {
  if (flowType === FLOW_TYPE.IMPLICIT) return implicitFlowHandler
  else if (flowType === FLOW_TYPE.CODE) return codeFlowHandler
  throw new Error("no flow handler for " + oidcState.flowType)
}

//############################## REQUEST #################################
// This function initiates the oidc flow
const createOidcRequest = async ({ issuerURL, clientID, flowType }) => {
  try {
    // create state props and store them in the SessionStorage
    // to use them after the redirect back from the ID provider
    // for code flow we use pkce and without secret!
    const oidcState = await createRequestState(
      { flowType },
      { pkce: flowType === FLOW_TYPE.CODE }
    )
    const handler = oidcFlowHandler(flowType)

    // make the actual request
    const url = await handler.buildRequestUrl({
      issuerURL,
      clientID,
      oidcState,
    })

    // redirect to this URL
    window.location.replace(url)
  } catch (error) {
    throw new Error("(OAUTH) " + error.message, { cause: error })
  }
}

//################################ RESPONSE #################################
// handle the response from ID provider
const handleOidcResponse = async ({ issuerURL, clientID }) => {
  const oidcState = getResponseState()
  // no oidc state presented or it does not match the stored one -> return null
  if (!oidcState) {
    console.warn("(OAUTH) url state does not match stored state, ignore it!")
    return null
  }

  try {
    const handler = oidcFlowHandler(oidcState.flowType)
    const { tokenData, idToken, refreshToken } = await handler.handleResponse({
      issuerURL,
      clientID,
      oidcState,
    })

    if (oidcState.nonce && tokenData?.nonce !== oidcState.nonce)
      throw new Error("compromised id token content")

    const authData = {
      JWT: idToken,
      raw: tokenData,
      refreshToken,
      parsed: parseIdTokenData(tokenData),
    }

    if (oidcState.lastUrl) {
      // Return to the URL before the redirect.
      window.history.replaceState("", "", oidcState.lastUrl || "/")
    }
    return authData
  } catch (error) {
    throw new Error("(OAUTH) " + error.message, { cause: error })
  }
}

// Refresh token works only for the code flow!
const refreshOidcToken = async ({
  issuerURL,
  clientID,
  flowType,
  refreshToken,
}) => {
  if (!flowType === FLOW_TYPE.CODE) return null
  try {
    const {
      tokenData,
      idToken,
      refreshToken: newRefreshToken,
    } = await codeFlowHandler.refreshToken({
      issuerURL,
      clientID,
      refreshToken,
    })

    return {
      JWT: idToken,
      raw: tokenData,
      refreshToken: newRefreshToken,
      parsed: parseIdTokenData(tokenData),
    }
  } catch (error) {
    throw new Error("(OAUTH) refresh token, " + error.message)
  }
}

// This function removes cached token from storage.
// We use iframe for ending oidc session in id provider
// if we don't want user to leave current page
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

/**
 *
 * @param {object} params
 * @returns {object} contains login, logout, refresh, currentState
 */
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
  // this state is updated on every change on the auth status
  let state = { auth: null, error: null, isProcessing: false, loggedIn: false }

  let refreshTimer
  // this function re-creates a refresh timer if a refreshToken is presented
  const updateRefresher = () => {
    // clear refresh timer every time the auth date gets updated
    clearTimeout(refreshTimer)

    if (!state?.auth?.refreshToken) return

    const expiresAt = state.auth.parsed?.expiresAt
    if (expiresAt) {
      const expiresIn = expiresAt - Date.now() - 5000
      console.info(
        "(OAUTH) refresh token in",
        Math.floor(expiresIn / 1000),
        "seconds"
      )
      // start timer for refresh
      refreshTimer = setTimeout(refreshAuth, expiresIn)
    }
  }

  let expirationTimer
  const updateExpirationTimer=()=>{
    clearTimeout(expirationTimer)
    if(state?.auth?.parsed?.expiresAt) {
      const expiresIn = expiresAt - Date.now() - 5000
      console.info(
        "(OAUTH) logout token in",
        Math.floor(expiresIn / 1000),
        "seconds"
      )
      expirationTimer = setTimeout(logout,expiresIn)
    }
  }

  // define update method which updates the state and calls the callback function
  const update = (newState) => {
    state = { ...state, ...newState }
    if (onUpdate) onUpdate({ ...state })

    if (refresh && state?.auth?.refreshToken) updateRefresher()
    else if (state?.auth?.parsed?.expiresAt) updateExpirationTimer()
  }

  // handle new data from odic response
  const receiveNewData = async (promise) => {
    try {
      const data = await promise
      update({ auth: data, error: null, loggedIn: !!data, isProcessing: false })
    } catch (error) {
      update({
        auth: null,
        error: error.toString(),
        loggedIn: false,
        isProcessing: false,
      })
    }
  }

  // refresh function
  const refreshAuth = () => {
    if (!refresh) return
    const refreshToken = state?.auth?.refreshToken
    if (refreshToken) {
      console.info("(OAUTH) refresh token now")
      receiveNewData(
        refreshOidcToken({ issuerURL, clientID, flowType, refreshToken })
      )
    }
  }

  const login = () => {
    update({ isProcessing: true })
    createOidcRequest({ issuerURL, clientID, flowType })
  }

  const logout = (options) => {
    console.info("(OAUTH) logout")
    update({ auth: null, error: null, loggedIn: false, isProcessing: false })
    if (options?.resetOIDCSession)
      oidcLogout({ issuerURL, silent: options?.silent === true })
  }

  //############### HANDLE OIDC RESPONSE ################
  // if oidc is present, then the current page load is a oidc response!
  // handle the oidc response if odicState is present
  if (isOidcResponse) {
    console.info("(OAUTH) handle oidc response")
    update({ isProcessing: true })
    // try to get auth infos from the URL if current page load is a redirect from ID Provider
    // Initial auth state!
    receiveNewData(handleOidcResponse({ issuerURL, clientID }))
  }

  //############### START OIDC ################
  if (!isOidcResponse && initialLogin) {
    console.info("(OAUTH) login")
    login()
  }
  return {
    login,
    logout,
    refresh: refreshAuth,
    currentState: () => ({ ...state }),
  }
}

export default oidcSession
