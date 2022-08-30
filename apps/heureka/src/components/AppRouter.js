import React from "react"
import { Router, Route, Switch } from "url-state-router"
import AppContainer from "./AppContainer"
import Services from "./Services"
import ServiceDetail from "./ServiceDetail"
import Components from "./Components"
import ComponentDetail from "./ComponentDetail"

const AppRouter = (props) => {
  return (
    <Router stateID="heurekaApp">
      <Switch>
        <Route exact path="/">
          <AppContainer tabIndex={0} component={<Services />} />
        </Route>
        <Route exact path="/services">
          <AppContainer tabIndex={0} component={<Services />} />
        </Route>
        <Route exact path="/services/:serviceId">
          <AppContainer tabIndex={0} component={<ServiceDetail />} />
        </Route>
        <Route exact path="/components">
          <AppContainer tabIndex={1} component={<Components />} />
        </Route>
        <Route exact path="/components/:componentId">
          <AppContainer tabIndex={1} component={<ComponentDetail />} />
        </Route>
      </Switch>
    </Router>
  )
}

export default AppRouter
