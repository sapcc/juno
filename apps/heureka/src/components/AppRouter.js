import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import ServicesList from "./ServicesList"
import ServiceDetail from "./ServiceDetail"
import Tabs from "./Tabs"

const AppRouter = (props) => {
  console.log(props.location)
  console.log(props.match)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Tabs />} />
        <Route path="services" element={<Tabs tabIndex={0} />}>
          <Route path=":serviceId" element={<Tabs tabIndex={0} />} />
        </Route>
        <Route path="services/:serviceId" element={<Tabs tabIndex={0} />} />
        <Route path="components" element={<Tabs tabIndex={1} />}>
          <Route path=":componentId" element={<Tabs tabIndex={1} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
