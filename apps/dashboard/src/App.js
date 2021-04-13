import React from "react"
import Layout from "./components/layout/Layout"
import GlobalStyles from "./lib/styling/GlobalStyles"
import useMicroFrontendWidget from "./lib/hooks/useMicroFrontendWidget"

import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Home from "./pages/home"
import About from "./pages/about"

import createCache from "@emotion/cache"
import { CacheProvider } from "@emotion/react"
// use custom style cache to avoid conflicts with other apps

const HOST =
  process.env.NODE_ENV === "development" ? "https://juno.qa-de-1.cloud.sap" : ""

const MFE = ({ name, version, ...props }) => {
  useMicroFrontendWidget({
    url: `${HOST}/cdn/${name}/${version}/widget.js`,
    props,
  })
  return null
}

const App = () => (
  <CacheProvider value={createCache({ key: "juno-dashboard" })}>
    <GlobalStyles />
    <MFE name="auth" version="0_1_3" region="qa-de-1" domain="monsoon3" sso />
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/about">
            <About />
          </Route>
        </Switch>
      </Layout>
    </Router>
  </CacheProvider>
)

export default App
