import { useEffect } from "react"
import { broadcast, watch, onGet, get } from "communicator"

window.broadcast = broadcast
window.watch = watch
window.get = get
window.onGet = onGet

const normalizeAuthData = (auth) => {
  if (!auth) return null
  return {
    email: auth.email,
    expiresAt: auth.expiresAt,
    firstName: auth.first_name,
    lastName: auth.last_name,
    fullName: auth.full_name,
    idToken: auth.id_token,
    userId: auth.login_name || auth.subject,
    subject: auth.subject,
  }
}

const useCommunication = (oidc, { resetOIDCSession }) => {
  const { loggedIn, auth, error, login, logout } = oidc || {}

  useEffect(() => {
    if (loggedIn) {
      broadcast("AUTH_UPDATE_DATA", { auth: normalizeAuthData(auth) })
    } else {
      broadcast("AUTH_UPDATE_DATA", { auth: null, error })
    }

    const unwatchGet = onGet("AUTH_GET_DATA", () => normalizeAuthData(auth))

    return unwatchGet
  }, [loggedIn, auth, error])

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
