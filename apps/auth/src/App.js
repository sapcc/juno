import React from "react"
import { useOidcAuth } from "oauth"
import { send, listen } from "communicator"

const App = (props) => {
  const oidc = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: props.initialLogin,
  })

  React.useEffect(() => {
    console.log("AUTH UPDATE", oidc)
  }, [oidc?.loggedIn])

  //loggedIn/loggedOut
  //login
  //logout

  // React.useEffect(() => {
  //   console.log("props", props)

  //   if (props.debug !== "false") console.log("Auth app mounted")

  //   if (oidc.loggedIn) {
  //     const data = {
  //       email: oidc.auth.email,
  //       expiresAt: oidc.auth.expiresAt,
  //       firstName: oidc.auth.first_name,
  //       lastName: oidc.auth.last_name,
  //       fullName: oidc.auth.full_name,
  //       idToken: oidc.auth.id_token,
  //       userId: oidc.auth.login_name || oidc.auth.subject,
  //       subject: oidc.auth.subject
  //     }

  //     if (props.debug !== "false") {
  //       console.log(
  //         JSON.stringify(
  //           {
  //             ...data,
  //             expiresDate: new Date(data.expiresAt).toLocaleString(),
  //           },
  //           null,
  //           2
  //         )
  //       )
  //     }
  //     send("AUTH_UPDATE", data, {
  //       expires: Math.floor(parseInt(oidc.auth.expiresAt) / 1000),
  //       debug: props.debug,
  //     })

  //     unregister = listen("AUTH_LOGOUT", () =>
  //       oidc.logout({ resetOIDCSession: true, silent: true })
  //     )
  //   } else {
  //     oidc.login()
  //   }

  //   return () => {
  //     if (props.debug !== "false") console.log("Auth app unmounted")
  //     if (unregister) unregister()
  //   }
  // }, [oidc])

  return null
}

export default App
