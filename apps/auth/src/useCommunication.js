import { useEffect, useState } from "react"
import { broadcast, watch, onGet } from "communicator"
import { oidcSession } from "oauth/src"

const enrichAuthData = (data) => {
  if (!data) return data

  const enrichedAuth = { ...data }
  const userId = data.auth?.parsed?.loginName

  if (userId) {
    enrichedAuth.auth.parsed["avatarUrl"] = {
      small: `https://avatars.wdf.sap.corp/avatar/${userId}?size=24x24`,
    }
  }
  return enrichedAuth
}

const useCommunication = (props = {}) => {
  const debug = props.debug === "true" || props.debug === true
  const [state, setState] = useState()

  useEffect(() => {
    // inform that the auth app has been loaded!
    broadcast("AUTH_APP_LOADED", true)
    onGet("AUTH_APP_LOADED", () => true)

    const session = oidcSession({
      issuerURL: props.issuerurl,
      clientID: props.clientid,
      initialLogin: props.initialLogin,
      refresh: true,
      flowType: "code",
      onUpdate: (authData) => {
        let data = enrichAuthData(authData)
        setState(data)
        broadcast("AUTH_UPDATE_DATA", data, { debug })
      },
    })

    const unwatchGet = onGet("AUTH_GET_DATA", () => session.currentState, {
      debug,
    })

    const unwatchLogin = watch("AUTH_LOGIN", session.login, { debug })
    const unwatchLogout = watch(
      "AUTH_LOGOUT",
      () =>
        session.logout({
          resetOIDCSession: props.resetOIDCSession,
          silent: true,
        }),
      { debug }
    )
    // unregister on get listener when unmounting
    return () => {
      unwatchGet()
      unwatchLogin()
      unwatchLogout()
    }
  }, [])

  return state
}

export default useCommunication
