import React, { useMemo } from "react"
import ServicesListController from "./ServicesListController"
import Filters from "../filters/Filters"

const ServicesTab = () => {
  return (
    <>
      <Filters queryKey="serviceFilters" />
      <ServicesListController />
    </>
  )
}

export default ServicesTab
