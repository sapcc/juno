import React from "react"
import { send, on } from "communicator"
import Requests from "./components/Requests"
import { ClientProvider } from "./lib/clientProvider"

export default ({}) => {
  const [auth, setAuth] = React.useState()
  const endpoint = "https://mercury.juno.qa-de-1.cloud.sap/graphql"
  const region = "qa-de-1"

  React.useEffect(() => {
    return on("AUTH_UPDATE_TOKEN", ({ token, authToken }) => {
      setAuth(token && authToken ? { token, authToken } : null)
    })
  }, [])

  console.log(auth, endpoint)
  return (
    <ClientProvider
      authToken={auth?.authToken}
      endpoint={endpoint}
      region={region}
    >
      {!auth ? (
        <p>Authentication required</p>
      ) : (
        <div>{auth?.authToken && <Requests authToken={auth.authToken} />}</div>
      )}
    </ClientProvider>
  )
}
