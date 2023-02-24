import { useEffect } from "react"
import { broadcast, watch, onGet, get } from "communicator"

const normalizeAuthData = (oidc) => {
  if (!oidc) return null
  return {
    isProcessing: oidc.isProcessing,
    loggedIn: oidc.loggedIn,
    email: oidc.auth?.email,
    expiresAt: oidc.auth?.expiresAt,
    firstName: oidc.auth?.first_name,
    lastName: oidc.auth?.last_name,
    fullName: oidc.auth?.full_name,
    idToken: oidc.auth?.id_token,
    userId: oidc.auth?.login_name || oidc.auth?.subject,
    subject: oidc.auth?.subject,
  }
}

const useCommunication = (oidc, { resetOIDCSession }) => {
  const { loggedIn, auth, error, login, logout } = oidc || {}

  useEffect(() => {
    if (loggedIn) {
      broadcast("AUTH_UPDATE_DATA", { auth: normalizeAuthData(oidc) })
    } else {
      broadcast("AUTH_UPDATE_DATA", { auth: null, error })
    }

    const unwatchGet = onGet("AUTH_GET_DATA", () => normalizeAuthData(oidc))

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
