import React from "react"
import ReactDOM from "react-dom"
import StyleProvider, { Button } from "juno-ui-components"
import { on, send } from "communicator"

// import {
//   AUTH_GET_TOKEN,
//   AUTH_REVOKE_TOKEN,
//   AUTH_UPDATE_TOKEN,
//   AUTH_RESCOPE_TOKEN,
// } from "./eventsInterface"

const DevEnv = () => {
  const [token, setToken] = React.useState()
  const [authToken, setAuthToken] = React.useState()

  React.useEffect(() => {
    return on("AUTH_UPDATE_TOKEN", ({ authToken, token }) => {
      setToken(token)
      setAuthToken(authToken)
    })
  }, [])

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
    const dataset = {
      "data-name": "auth",
      "data-version": "0_1_5",
      "data-props-endpoint": "identity-3.qa-de-1.cloud.sap",
      "data-props-domain": "ccadmin",
      "data-props-project": "cloud_admin",
      "data-props-sso": true,
    }
    let element = document.createElement("script")
    element.src =
      "https://cdn.juno.qa-de-1.cloud.sap/widget-loader/0_0_2/app.js"
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
        <>
          Wellcome {token.user.name}{" "}
          <Button variant="danger" onClick={logout} size="small">
            Logout
          </Button>
        </>
      ) : (
        <Button variant="primary" onClick={login} size="small">
          Login
        </Button>
      )}
      <br />
      {/*token && (
        <pre tw="block m-0 p-0 overflow-auto text-white text-sm bg-gray-800">
          {JSON.stringify(token, null, 2)}
        </pre>
      )*/}
    </>
  )
}

ReactDOM.render(
  <StyleProvider stylesWrapper="shadowRoot">
    <DevEnv />
  </StyleProvider>,
  document.getElementById("dev")
)
