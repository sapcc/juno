import { useEffect } from "react"
import { broadcast, watch, onGet } from "communicator"

const useCommunication = (oidc, { resetOIDCSession, debug }) => {
  const { loggedIn, isProcessing, auth, error, login, logout } = oidc || {}

  useEffect(() => {
    const authData = { loggedIn, isProcessing, auth, error }
    // send auth data
    broadcast("AUTH_UPDATE_DATA", authData, { debug })
    // listen to on get events
    const unwatchGet = onGet("AUTH_GET_DATA", () => authData, { debug })
    // unregister on get listener when unmounting
    return unwatchGet
  }, [loggedIn, isProcessing, auth, error])

  useEffect(() => {
    const unwatchLogin = watch(
      "AUTH_LOGIN",
      (info) => {
        if (!loggedIn) login()
      },
      { debug }
    )

    const unwatchLogout = watch(
      "AUTH_LOGOUT",
      (info) => {
        if (loggedIn) logout({ resetOIDCSession, silent: true })
      },
      { debug }
    )

    return () => {
      unwatchLogin()
      unwatchLogout()
    }
  }, [loggedIn, login, logout, resetOIDCSession])
}

export default useCommunication
