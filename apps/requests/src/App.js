import React from "react"
import { send, on } from "communicator"
// import { BrowserRouter, Route, Redirect } from "react-router-dom"
import Requests from "./components/Requests"
import ShowRequest from "./components/Show"
import NewRequest from "./components/New"
import { ClientProvider } from "./lib/clientProvider"
import { PolicyProvider } from "./lib/policyProvider"
import StateProvider from "./lib/stateProvider"
import styles from "./styles.css"

import {
  Router,
  Route,
  Redirect,
  Switch,
  useRouter,
  Link,
} from "url-state-router"

const Test = () => {
  const { routeParams } = useRouter()
  return <div>{JSON.stringify(routeParams)}</div>
}

const App = ({ stateID }) => {
  const [auth, setAuth] = React.useState()
  const endpoint = "https://mercury.juno.qa-de-1.cloud.sap"
  const region = "qa-de-1"

  React.useEffect(() => {
    return on("AUTH_UPDATE_TOKEN", ({ token, authToken }) => {
      setAuth(token && authToken ? { token, authToken } : null)
    })
  }, [])

  return (
    <StateProvider>
      <ClientProvider
        authToken={auth?.authToken}
        endpoint={endpoint}
        region={region}
      >
        <PolicyProvider token={auth?.token}>
          <Router stateID={stateID}>
            Hello {stateID}
            <br />
            <Link to="/requests">Requests</Link>
            {" | "}
            <Link to="/test/12/show/2">Link to /test/12/show/2</Link> |{" "}
            <Link to="/test2/2">Link to /test2/2</Link> |{" "}
            <Link to="/test3">Link to /test3</Link>
            <Route exact path="/">
              <Redirect to="/requests" />
            </Route>
            <Route path="/requests" component={Requests} />
            <Switch>
              <Route exact path="/requests/new" component={NewRequest} />
              <Route exact path="/requests/:id" component={ShowRequest} />
            </Switch>
            <Route path="/test/:id/show/:tab">
              Test <Test />
            </Route>
            <Route path="/test2/:tab">
              Test2 <Test />
            </Route>
            <Route path="/test3">
              Test3 <Test />
            </Route>
          </Router>
          {/* <BrowserRouter basename={`${window.location.pathname}?r=`}>
            <Route exact path="/">
              <Redirect to="/requests" />
            </Route> 
            <Route path="/requests/:id" component={ShowRequest} />
            <Route path="/requests" component={Requests} />
          </BrowserRouter> */}
          {/* {JSON.stringify(auth?.token)} */}
        </PolicyProvider>
      </ClientProvider>
    </StateProvider>
  )
}

const StyledApp = (props) => {
  // default props
  props = {
    stateID: "requests",
    ...props,
  }

  return (
    <StyleProvider
      stylesWrapper="shadowRoot"
      theme={`${props.theme ? props.theme : "theme-dark"}`}
    >
      {/* load styles inside the shadow dom */}
      <style>{styles.toString()}</style>
      <App {...props} />
    </StyleProvider>
  )
}

export default StyledApp
