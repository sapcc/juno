import React from "react"
import { Router, Route, Redirect, Switch } from "url-state-router"
import AppContainer from "./AppContainer"
import Services from "./Services"
import ServiceDetail from "./ServiceDetail"
import Components from "./Components"
import ComponentDetail from "./ComponentDetail"
import Vulnerabilities from "./Vulnerabilities"
import VulnerabilitiyDetails from "./VulnerabilitiyDetails"
import Users from "./Users"
import UserDetail from "./UserDetail"

export const SERVICES_PATH = "/services"
export const COMPONENTS_PATH = "/components"
export const VULNERABILITIES_PATH = "/vulnerabilities"
export const USERS_PATH = "/users"
export const TABS_CONFIG = [
  { path: SERVICES_PATH, label: "Services", icon: "dns" },
  { path: COMPONENTS_PATH, label: "Components", icon: "widgets" },
  {
    path: VULNERABILITIES_PATH,
    label: "Vulnerabilities",
    icon: "autoAwesomeMotion",
  },
  {
    path: USERS_PATH,
    label: "Users",
    icon: "accountCircle",
  },
]

const AppRouter = (props) => {
  return (
    <Router stateID="heurekaApp">
      <Route exact path="/">
        <Redirect to={SERVICES_PATH} />
      </Route>

      <AppContainer tabsConfig={TABS_CONFIG}>
        <Switch>
          <Route exact path={SERVICES_PATH} component={Services} />
          <Route
            exact
            path={`${SERVICES_PATH}/:serviceId`}
            component={ServiceDetail}
          />
          <Route exact path={COMPONENTS_PATH} component={Components} />
          <Route
            exact
            path={`${COMPONENTS_PATH}/:componentId`}
            component={ComponentDetail}
          />
          <Route
            exact
            path={VULNERABILITIES_PATH}
            component={Vulnerabilities}
          />
          <Route
            exact
            path={`${VULNERABILITIES_PATH}/:vulnerabilityId`}
            component={VulnerabilitiyDetails}
          />
          <Route exact path={USERS_PATH} component={Users} />
          <Route exact path={`${USERS_PATH}/:userId`} component={UserDetail} />
        </Switch>
      </AppContainer>
    </Router>
  )
}

export default AppRouter
