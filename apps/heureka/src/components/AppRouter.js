import React from "react"
import { Router, Route, Redirect, Switch } from "url-state-router"

import TabsContainer from "./TabsContainer"
import ServicesController from "./services/servicesController"
import VulnerabilitiesController from "./vulnerabilities/vulnerabilitiesController"

export const HOME_PATH = "/home"
export const SUPPORT_GROUP_PATH = "/support_group"
export const SERVICES_PATH = "/services"
export const COMPONENTS_PATH = "/components"
export const VULNERABILITIES_PATH = "/vulnerabilities"
export const USERS_PATH = "/users"

export const TABS_CONFIG = [
  // { path: HOME_PATH, label: "Home", icon: "autoAwesomeMosaic" },
  { path: SERVICES_PATH, label: "Services", icon: "dns" },
  // { path: COMPONENTS_PATH, label: "Components", icon: "widgets" },
  {
    path: VULNERABILITIES_PATH,
    label: "Vulnerabilities",
    icon: "autoAwesomeMotion",
  },
  // { path: SUPPORT_GROUP_PATH, label: "Support group", icon: "manageAccounts" },
  // { path: USERS_PATH, label: "Users", icon: "accountCircle" },
]

const HEUREKA_STATE_KEY = "heureka"

const AppRouter = (props) => {
  return (
    <Router stateID={HEUREKA_STATE_KEY}>
      <Route exact path="/">
        <Redirect to={SERVICES_PATH} />
      </Route>

      <TabsContainer tabsConfig={TABS_CONFIG}>
        <Route exact path={SERVICES_PATH} component={ServicesController} />
        <Route
          exact
          path={VULNERABILITIES_PATH}
          component={VulnerabilitiesController}
        />
      </TabsContainer>
    </Router>
  )
}

export default AppRouter
