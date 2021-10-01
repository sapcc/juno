import React from "react"
import { send, on } from "communicator"
import { BrowserRouter, Route, Redirect } from "react-router-dom"
import Requests from "./components/Requests"
import ShowRequest from "./components/Show"
import { ClientProvider } from "./lib/clientProvider"
import { PolicyProvider } from "./lib/policyProvider"
import StateProvider from "./lib/stateProvider"

export default ({ useBrowser }) => {
  const [auth, setAuth] = React.useState()
  const endpoint = "https://mercury.juno.qa-de-1.cloud.sap"
  const region = "qa-de-1"

  React.useEffect(() => {
    return on("AUTH_UPDATE_TOKEN", ({ token, authToken }) => {
      setAuth(token && authToken ? { token, authToken } : null)
    })
  }, [])

  console.log(auth, endpoint)
  return (
    <StateProvider>
      <ClientProvider
        authToken={auth?.authToken}
        endpoint={endpoint}
        region={region}
      >
        <PolicyProvider token={auth?.token}>
          <BrowserRouter basename={`${window.location.pathname}?r=`}>
            <Route exact path="/">
              <Redirect to="/requests" />
            </Route>
            <Route path="/requests/:id" component={ShowRequest} />
            <Route path="/requests" component={Requests} />
          </BrowserRouter>
          {/* {auth?.authToken} */}
        </PolicyProvider>
      </ClientProvider>
    </StateProvider>
  )
}
