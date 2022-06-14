import React from "react"
import ReactDOM from "react-dom"
import StyleProvider, { Button } from "juno-ui-components"
import { on, send } from "communicator"

let listener
const registerAuthListener = (newListener) => (listener = newListener)

const DevEnv = () => {
  const [showDetails, setShowDetails] = React.useState(false)
  const [token, setToken] = React.useState()
  const [authToken, setAuthToken] = React.useState()

  const logout = React.useCallback(() => {
    send("AUTH_REVOKE_TOKEN")
  }, [])

  const login = React.useCallback(() => {
    send("AUTH_GET_TOKEN", {
      receiveResponse: ({ authToken, token }) => {
        setToken(token)
        setAuthToken(authToken)
      },
    })
  }, [])

  React.useEffect(() => {
    return on("AUTH_UPDATE_TOKEN", ({ authToken, token }) => {
      setToken(token)
      setAuthToken(authToken)

      if (listener) listener({ token, authToken })
    })
  }, [])

  React.useEffect(() => {
    const dataset = {
      // only for test
      // "data-url": "https://auth.ap.ws2.qa-de-1.cloud.sap/widget.js",
      "data-name": "auth",
      "data-version": "latest",
      "data-props-endpoint": "identity-3.qa-de-1.cloud.sap",
      "data-props-domain": "monsoon3",
      "data-props-project": "cc-demo",
      "data-props-sso": true,
      "data-props-openonload": true,
    }
    let element = document.createElement("script")
    element.src =
      "https://cdn.juno.qa-de-1.cloud.sap/widget-loader/latest/app.js"
    element.type = "text/javascript"
    element.async = true

    for (let key in dataset) {
      element.setAttribute(key, dataset[key])
    }

    document.body.appendChild(element)

    return () => {
      console.log(`Dynamic Script Removed: ${url}`)
      element.remove()
    }
  }, [])

  return (
    <>
      {token ? (
        <div style={{ textAlign: "right" }}>
          Wellcome {token.user.name}{" "}
          <Button variant="subdued" onClick={logout} size="small">
            Logout
          </Button>{" "}
          <Button
            size="small"
            variant="primary"
            onClick={() =>
              showDetails ? setShowDetails(false) : setShowDetails(true)
            }
          >
            {showDetails && "hide "}Details
          </Button>
        </div>
      ) : (
        <Button variant="primary" onClick={login} size="small">
          Login
        </Button>
      )}
      {showDetails && (
        <>
          <br />
          <pre tw="block m-0 p-0 overflow-auto text-white text-sm bg-gray-800">
            {JSON.stringify(token, null, 2)}
          </pre>
        </>
      )}
    </>
  )
}

const dev = document.createElement("div")
dev.setAttribute(
  "style",
  "position: absolute; right: 0px; top: 0px; z-index: 1000; padding: 15px;"
)
document.body.prepend(dev)

ReactDOM.render(
  <StyleProvider stylesWrapper="shadowRoot">
    <DevEnv />
  </StyleProvider>,
  dev
)

export { registerAuthListener }
