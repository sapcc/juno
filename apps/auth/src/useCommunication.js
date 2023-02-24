import { useEffect } from "react"
import { broadcast, watch, onGet } from "communicator"

const useCommunication = (oidc, { resetOIDCSession }) => {
  const { loggedIn, isProcessing, auth, error, login, logout } = oidc || {}

  useEffect(() => {
    const authData = { loggedIn, isProcessing, auth, error }
    // send auth data
    broadcast("AUTH_UPDATE_DATA", authData)
    // listen to on get events
    const unwatchGet = onGet("AUTH_GET_DATA", () => authData)
    // unregister on get listener when unmounting
    return unwatchGet
  }, [loggedIn, isProcessing, auth, error])

  useEffect(() => {
    const unwatchLogin = watch("AUTH_LOGIN", (info) => {
      if (!loggedIn) login()
    })

    const unwatchLogout = watch("AUTH_LOGOUT", (info) => {
      if (loggedIn) logout({ resetOIDCSession, silent: true })
    })

    return () => {
      unwatchLogin()
      unwatchLogout()
    }
  }, [loggedIn, login, logout, resetOIDCSession])
}

export default useCommunication
