import React from "react"
import ReactDOM from "react-dom"
import tw from "twin.macro"
import GlobalStyles from "./GlobalStyles"
import { Button } from "juno-ui-components"

import { CacheProvider } from "@emotion/react"
import createCache from "@emotion/cache"

const Hi = tw.h1`
  text-blue-500
`

const DevEnv = () => {
  const [token, setToken] = React.useState()
  const [authToken, setAuthToken] = React.useState()

  React.useEffect(() => {
    const handleTokenUpdate = (e) => {
      if (e.detail && e.detail.token) {
        setToken(e.detail.token)
        setAuthToken(e.detail.authToken)
      }
    }

    window.addEventListener("AUTH_UPDATE_TOKEN", handleTokenUpdate)
    return () =>
      window.removeEventListener("AUTH_UPDATE_TOKEN", handleTokenUpdate)
  })

  return (
    <>
      {/* <style>{base.toString()}</style> */}
      {/* <GlobalStyles /> */}
      <Hi>Test environment for the auth app</Hi>
      <br />
      {token ? (
        <Button
          mode="danger"
          onClick={() => {
            setToken(null)
            setAuthToken(null)
          }}
        >
          Logout
        </Button>
      ) : (
        <Button
          mode="primary"
          onClick={() => {
            var event = new CustomEvent("AUTH_GET_TOKEN", {
              detail: {
                receiveResponse: (token) => alert(token),
              },
            })
            window.dispatchEvent(event)
          }}
        >
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
