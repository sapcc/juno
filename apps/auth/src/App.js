import { useOidcAuth } from "oauth" //from "oauth/src"
import { broadcast, watch, onGet, get } from "communicator"
import useCommunication from "./useCommunication"

window.broadcast = broadcast
window.watch = watch
window.get = get
window.onGet = onGet

const App = (props = {}) => {
  const oidc = useOidcAuth({
    issuerURL: props.issuerurl,
    clientID: props.clientid,
    initialLogin: props.initialLogin === "true" || props.initialLogin === true,
  })

  if (props.debug) console.log(oidc)
  useCommunication(oidc, {
    resetOIDCSession: props.resetOidcSession,
    debug: props.debug,
  })

  return null
}

export default App
