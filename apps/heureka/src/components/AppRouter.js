import React from "react"
import { Router, Route, Redirect, Switch } from "url-state-router"
import AppContainer from "./AppContainer"
import Services from "./Services"
import ServiceDetail from "./ServiceDetail"
import ChangesLogDetail from "./ChangesLogDetail"
import PatchLogNew from "./PatchLogNew"
import PatchLogDetail from "./PatchLogDetail"
import Components from "./Components"
import ComponentDetail from "./ComponentDetail"
import Vulnerabilities from "./Vulnerabilities"
import VulnerabilitiyDetails from "./VulnerabilitiyDetails"
import Users from "./Users"
import UserDetail from "./UserDetail"
import SupportGroups from "./SupportGroups"
import Home from "./Home"

export const HOME_PATH = "/home"
export const SUPPORT_GROUP_PATH = "/support_group"
export const SERVICES_PATH = "/services"
export const COMPONENTS_PATH = "/components"
export const VULNERABILITIES_PATH = "/vulnerabilities"
export const USERS_PATH = "/users"
export const TABS_CONFIG = [
  { path: HOME_PATH, label: "Home", icon: "autoAwesomeMosaic" },
  { path: SERVICES_PATH, label: "Services", icon: "dns" },
  { path: COMPONENTS_PATH, label: "Components", icon: "widgets" },
  {
    path: VULNERABILITIES_PATH,
    label: "Vulnerabilities",
    icon: "autoAwesomeMotion",
  },
  { path: SUPPORT_GROUP_PATH, label: "Support group", icon: "manageAccounts" },
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
        <Redirect to={HOME_PATH} />
      </Route>

      <AppContainer tabsConfig={TABS_CONFIG}>
        <Route exact path={HOME_PATH} component={Home} />
        <Route exact path={SERVICES_PATH} component={Services} />
        <Route path={`${SERVICES_PATH}/:serviceId`} component={ServiceDetail} />
        <Switch>
          <Route
            exact
            path={`${SERVICES_PATH}/:serviceId/changeLog/:changeLogId`}
            component={ChangesLogDetail}
          />
          <Route
            exact
            path={`${SERVICES_PATH}/:serviceId/patchLog/new`}
            component={PatchLogNew}
          />
          <Route
            exact
            path={`${SERVICES_PATH}/:serviceId/patchLog/:patchLogId`}
            component={PatchLogDetail}
          />
        </Switch>
        <Route exact path={COMPONENTS_PATH} component={Components} />
        <Route
          exact
          path={`${COMPONENTS_PATH}/:componentId`}
          component={ComponentDetail}
        />
        <Route exact path={VULNERABILITIES_PATH} component={Vulnerabilities} />
        <Route
          exact
          path={`${VULNERABILITIES_PATH}/:vulnerabilityId`}
          component={VulnerabilitiyDetails}
        />
        <Route exact path={SUPPORT_GROUP_PATH} component={SupportGroups} />
        <Route exact path={USERS_PATH} component={Users} />
        <Route exact path={`${USERS_PATH}/:userId`} component={UserDetail} />
      </AppContainer>
    </Router>
  )
}

export default AppRouter
