import React from "react"
import { Router, Route } from "url-state-router"
import useStore from "../store"
import AppContent from "./AppContent"
import TestContent from "./TestContent"

const AppRouter = () => {
  const urlStateTestingKey = useStore((state) => state.urlStateTestingKey)

  return (
    <>
      {urlStateTestingKey && (
        <Router stateID={urlStateTestingKey}>
          <Route exact path="/" component={AppContent} />
          <Route exact path="/testing" component={TestContent} />
        </Router>
      )}
    </>
  )
}

export default AppRouter
