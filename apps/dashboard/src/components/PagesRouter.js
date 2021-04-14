import React from "react"
import Layout from "./layout/Layout"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { getPages } from "../lib/pages-loader"

const pages = getPages("../pages")
console.log(":::::::::::::::::::::.", pages)

// Render a Router and Routes based on found pages
const PagesRouter = () => {
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

export default PagesRouter
