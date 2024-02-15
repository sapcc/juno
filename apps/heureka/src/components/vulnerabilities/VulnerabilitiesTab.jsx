import React from "react"
import VulnerabilitiesListController from "./VulnerabilitiesListController"
import Filters from "../filters/Filters"

const VulnerabilitiesTab = () => {
  return (
    <>
      <Filters />
      <VulnerabilitiesListController />
    </>
  )
}

export default VulnerabilitiesTab
