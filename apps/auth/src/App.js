// __webpack_public_path__ = window.location
// console.log(window.location)
import "custom-event-polyfill"
import React from "react"
import { Modal } from "juno-ui-components"
// import { GlobalStyles } from "twin.macro"
import { LoginDialog } from "./LoginDialog"

/**
 * This Component implements the event interface and controls
 * the visibility state of the login form.
 * @param {object} props
 */
const App = (props) => {
  const [authToken, setAuthToken] = React.useState(null)
  const [token, setToken] = React.useState(null)
  const [isOpen, setIsOpen] = React.useState(false)

  // listen to get token events
  React.useEffect(() => {
    const sendToken = (e) => {
      if (!authToken) {
        setIsOpen(true)
        return
      }
      if (e.detail && e.detail.receiveResponse) {
        e.detail.receiveResponse(authToken, token)
      }
    }

    window.addEventListener("AUTH_GET_TOKEN", sendToken)
    return () => window.removeEventListener("AUTH_GET_TOKEN", sendToken)
  }, [token])

  // send update token event if token has changed
  React.useEffect(() => {
    if (!authToken || !token) return
    var event = new CustomEvent("AUTH_UPDATE_TOKEN", {
      detail: {
        authToken,
        token,
      },
    })
    window.dispatchEvent(event)

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
  }, [token])

  return (
    <>
      {/* <GlobalStyles /> */}

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Login">
        {({ Body, Buttons }) => (
          <LoginDialog
            Buttons={Buttons}
            Body={Body}
            onLogin={(authToken, token) => {
              setAuthToken(authToken)
              setToken(token)
              setIsOpen(false)
            }}
            close={() => setIsOpen(false)}
            region={props.region || "qa-de-1"}
            domain={props.domain || "monsoon3"}
            sso={props.sso}
          />
        )}
      </Modal>
    </>
  )
}

export default App
