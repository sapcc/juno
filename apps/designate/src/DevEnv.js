import React from "react"
import ReactDOM from "react-dom"
import tw from "twin.macro"
import GlobalStyles from "./GlobalStyles"
import { Button } from "juno-ui-components"

import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"
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
      "https://juno.qa-de-1.cloud.sap/cdn/widget-loader/0_0_1/app.js"
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
        <Button mode="danger" onClick={logout}>
          Logout
        </Button>
      ) : (
        <Button mode="primary" onClick={login}>
          Login
        </Button>
      )}
      <br />
      {token && (
        <pre tw="block m-0 p-0 overflow-auto text-white text-sm bg-gray-800">
          {JSON.stringify(token, null, 2)}
        </pre>
      )}
    </>
  )
}

const wrapper = document.getElementById("dev").attachShadow({ mode: "closed" })
const stylesCache = createCache({
  key: "juno-auth-dev-styles",
  container: wrapper,
})
ReactDOM.render(
  <CacheProvider value={stylesCache}>
    <GlobalStyles />
    <DevEnv />
  </CacheProvider>,
  wrapper
)
