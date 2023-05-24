import React from "react"
import { Router, Route } from "url-state-router"
import useStore from "../store"
import AppContent from "./AppContent"
import TestContent from "./TestContent"

const AppRouter = () => {
  const urlStateKey = useStore((state) => state.urlStateKey)

  return (
    <>
      {urlStateKey && (
        <Router stateID={`${urlStateKey}-testing`}>
          <Route exact path="/" component={AppContent} />
          <Route exact path="/testing" component={TestContent} />
        </Router>
      )}
    </>
  )
}

export default AppRouter
