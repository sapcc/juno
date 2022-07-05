import React from "react"
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom"
import AppContainer from "./AppContainer"
import ServicesList from "./ServicesList"
import ServiceDetail from "./ServiceDetail"
import ComponentsList from "./ComponentsList"
import ComponentDetail from "./ComponentDetail"

const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<AppContainer tabIndex={0} component={<ServicesList />} />}
        />
        <Route
          path="services"
          element={<AppContainer tabIndex={0} component={<ServicesList />} />}
        />
        <Route
          path="services/:serviceId"
          element={<AppContainer tabIndex={0} component={<ServiceDetail />} />}
        />
        <Route
          path="components"
          element={<AppContainer tabIndex={1} component={<ComponentsList />} />}
        />
        <Route
          path="components/:componentId"
          element={
            <AppContainer tabIndex={1} component={<ComponentDetail />} />
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
