import React from "react"
import Layout from "./layout/Layout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"

// Load all subfolder from pages
// and map them to name: component array
const r = require.context("../pages/", true, /^\.\/[^\.js]+$/)
let pages = r
  .keys()
  .map((key) => ({ name: key.replace(/\.\//, ""), component: r(key).default }))
// console.log(pages)

// Render a Router and Routes based on found pages
const Pages = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          {pages.map((page) => (
            <Route
              key={page.name}
              exact
              path={page.name === "home" ? "/" : `/${page.name}`}
              component={page.component}
            />
          ))}
        </Switch>
      </Layout>
    </Router>
  )
}

export default Pages
