import React from "react"
import { useOidcAuth } from "oauth"
import { broadcast, watch, onGet, get } from "communicator"

window.broadcast = broadcast
window.watch = watch
window.get = get
window.onGet = onGet

const normalizeAuthData = (auth) =>
  !auth
    ? {}
    : {
        email: auth.email,
        expiresAt: auth.expiresAt,
        firstName: auth.first_name,
        lastName: auth.last_name,
        fullName: auth.full_name,
        idToken: auth.id_token,
        userId: auth.login_name || auth.subject,
        subject: auth.subject,
      }

const App = (props) => {
  const oidc = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: props.initialLogin,
  })

  React.useEffect(() => {
    console.log("===props", props)
    if (oidc?.loggedIn) {
      broadcast(
        "AUTH_UPDATE",
        { auth: normalizeAuthData(oidc.auth) },
        { debug: true }
      )
    } else {
      broadcast(
        "AUTH_UPDATE",
        { auth: null, error: oidc.error },
        { debug: true }
      )
    }

    const unwatchGet = onGet("AUTH_DATA", () => normalizeAuthData(oidc?.auth))

    return unwatchGet
  }, [oidc?.loggedIn, oidc.auth, oidc.error])

  React.useEffect(() => {
    const unwatchLogin = watch("AUTH_LOGIN", (info) => {
      if (!oidc.loggedIn) oidc.login()
    })

    const unwatchLogout = watch("AUTH_LOGOUT", (info) => {
      if (oidc.loggedIn) oidc.logout()
    })

    return () => {
      unwatchLogin()
      unwatchLogout()
    }
  }, [oidc.loggedIn, oidc.login, oidc.logout])

  return (
    <div>
      {oidc.loggedIn ? (
        <div>
          <code style={{ backgroundColor: "white" }}>
            {JSON.stringify(oidc.auth, null, 2)}
          </code>
          <button onClick={() => oidc.logout()}>Logout</button>
        </div>
      ) : (
        <button onClick={() => oidc.login()}>Login</button>
      )}
    </div>
  )
}

export default App
