import React from "react"
import { useOidcAuth } from "oauth"
import { broadcast, watch, onGet, get } from "communicator"
import useCommunication from "./useCommunication"

window.broadcast = broadcast
window.watch = watch
window.get = get
window.onGet = onGet

const App = (props) => {
  const oidc = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: props.initialLogin,
  })

  console.log(oidc)
  useCommunication(oidc, { resetOIDCSession: props.resetOidcSession })

  return null
}

export default App
