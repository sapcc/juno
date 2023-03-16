import { oidcSession } from "oauth/src"
// import { useOidcAuth } from "oauth/src"
import { broadcast, watch, onGet, get } from "communicator"
import useCommunication from "./useCommunication"
import React from "react"

window.broadcast = broadcast
window.watch = watch
window.get = get
window.onGet = onGet

const App = (props = {}) => {
  React.useEffect(() => {
    oidcSession({
      issuerURL: props.issuerurl,
      clientID: props.clientid,
      initialLogin: true,
      flowType: "code",
      onUpdate: (state) => console.log("===========OIDC SESSION UPDATE", state),
    })
  }, [])
  // const oidc = useOidcAuth({
  //   issuerURL: props.issuerurl,
  //   clientID: props.clientid,
  //   initialLogin: props.initialLogin === "true" || props.initialLogin === true,
  //   flowType: "pkce",
  // })

  // if (props.debug) console.log(oidc)
  // useCommunication(oidc, {
  //   resetOIDCSession: props.resetOidcSession,
  //   debug: props.debug,
  // })

  return null
}

export default App
