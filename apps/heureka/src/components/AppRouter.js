import React from "react"
import { HashRouter, BrowserRouter, Routes, Route } from "react-router-dom"
import AppContainer from "./AppContainer"
import Services from "./Services"
import ServiceDetail from "./ServiceDetail"
import Components from "./Components"
import ComponentDetail from "./ComponentDetail"

const AppRouter = (props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<AppContainer tabIndex={0} component={<Services />} />}
        />
        <Route
          path="services"
          element={<AppContainer tabIndex={0} component={<Services />} />}
        />
        <Route
          path="services/:serviceId"
          element={<AppContainer tabIndex={0} component={<ServiceDetail />} />}
        />
        <Route
          path="components"
          element={<AppContainer tabIndex={1} component={<Components />} />}
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
