import React from "react"
import ReactDOM from "react-dom"

import globalStyles from "juno-ui-components/lib/styles.css"

import { Button } from "juno-ui-components"
import { on, send } from "communicator"
import {
  AUTH_GET_TOKEN,
  AUTH_REVOKE_TOKEN,
  AUTH_UPDATE_TOKEN,
  AUTH_RESCOPE_TOKEN,
} from "./eventsInterface"

const DevEnv = () => {
  const [token, setToken] = React.useState()
  const [authToken, setAuthToken] = React.useState()

  React.useEffect(() => {
    return on(AUTH_UPDATE_TOKEN, ({ authToken, token }) => {
      setToken(token)
      setAuthToken(authToken)
    })
  }, [])

  const logout = React.useCallback(() => {
    send(AUTH_REVOKE_TOKEN)
  }, [])

  const login = React.useCallback(() => {
    send(AUTH_GET_TOKEN, {
      receiveResponse: ({ authToken, token }) => {
        setToken(token)
        setAuthToken(authToken)
      },
    })
  }, [])
  const rescope = React.useCallback(() => {
    send(AUTH_RESCOPE_TOKEN, {
      domainName: "ccadmin",
      projectName: "cloud_admin",
    })
  }, [])

  return (
    <>
      <style>{globalStyles.toString()}</style>
      <h1 className="text-blue-500">Test environment for the auth app</h1>
      <br />
      {token ? (
        <>
          <Button mode="danger" onClick={logout}>
            Logout
          </Button>
          <Button mode="success" onClick={rescope}>
            Rescope
          </Button>
        </>
      ) : (
        <Button mode="primary" onClick={login}>
          Login
        </Button>
      )}
      <br />
      {token && (
        <pre className="block m-0 p-0 overflow-auto text-white text-sm bg-gray-800">
          {JSON.stringify(token, null, 2)}
        </pre>
      )}
    </>
  )
}

const wrapper = document.getElementById("dev").attachShadow({ mode: "open" })

ReactDOM.render(<DevEnv />, wrapper)
