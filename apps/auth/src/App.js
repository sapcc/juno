// __webpack_public_path__ = window.location
// console.log(window.location)
import "custom-event-polyfill"
import React from "react"
import { Modal } from "juno-ui-components"
import { LoginDialog } from "./LoginDialog"
import {
  AUTH_GET_TOKEN,
  AUTH_UPDATE_TOKEN,
  AUTH_REVOKE_TOKEN,
  AUTH_RESCOPE_TOKEN,
} from "./eventsInterface"

import { send, on } from "communicator"
import { rescopeToken } from "./actions"

/**
 * This Component implements the event interface and controls
 * the visibility state of the login form.
 * @param {object} props
 */
const App = (props) => {
  console.log("===============props", props)
  const [auth, setAuth] = React.useState(null)
  const [isOpen, setIsOpen] = React.useState(!!props.openonload)

  React.useEffect(() => {
    // send broadcast event AUTH_UPDATE_TOKEN everytime the auth object changes
    send(AUTH_UPDATE_TOKEN, auth)

    // register AUTH_GET_TOKEN event
    // Important: "on" returns a function that unregistered the event.
    // We have to return it here so that the event is unregistered every
    // time the component is unmounted.
    return on(AUTH_GET_TOKEN, ({ receiveResponse }) => {
      if (!auth) {
        setIsOpen(true)
        return
      }
      if (receiveResponse) receiveResponse({ ...auth })
    })

    // TODO: renew token
    // const date = new Date(token.expires_at)
    // const milliseconds = date.getTime() - Date.now()
    // console.log(
    //   "==================",
    //   date,
    //   milliseconds,
    //   milliseconds / 1000 / 60,
    //   milliseconds / 1000 / 60 / 60
    // )

    // "expires_at": "2021-03-23T23:03:08.000000Z"
  }, [auth])

  // listen to get token events
  React.useEffect(() => {
    return on(AUTH_REVOKE_TOKEN, () => setAuth(null))
  }, [])

  React.useEffect(() => {
    return on(
      AUTH_RESCOPE_TOKEN,
      ({ projectId, projectName, domainName, domainId }) => {
        rescopeToken({
          endpoint: props.endpoint,
          token: auth.authToken,
          projectId,
          projectName,
          domainName,
          domainId,
        })
          .then(([authToken, payload]) => {
            setAuth({ authToken, token: payload.token })
          })
          .catch((error) => {
            console.error(error)
          })
      }
    )
  }, [props.endpoint, auth])

  const handleLogin = React.useCallback(({ authToken, token }) => {
    setAuth({ authToken, token })
    setIsOpen(false)
  }, [])

  return (
    <>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Login">
        {({ Body, Buttons }) => (
          <LoginDialog
            Buttons={Buttons}
            Body={Body}
            onLogin={handleLogin}
            close={() => setIsOpen(false)}
            endpoint={props.endpoint}
            domain={props.domain || "monsoon3"}
            project={props.project}
            projectID={props.projectID}
            sso={props.sso && props.sso !== false && props.sso !== "false"}
          />
        )}
      </Modal>
    </>
  )
}

export default App
