import React, { useMemo } from "react"
import ServiceVulnerabilitiesListItem from "./ServiceVulnerabilitiesListItem"
import { DataGrid, DataGridRow, DataGridHeadCell } from "juno-ui-components"
import { classifyVulnerabilities } from "../helpers"

const ServiceVulnerabilitiesList = ({ components }) => {
  components = useMemo(() => {
    if (!components) return []
    // inforce input as array
    if (!Array.isArray(components)) components = [components]
    // sort components by threat level
    return components
      .sort((a, b) => {
        const vulA = classifyVulnerabilities(a)
        const vulB = classifyVulnerabilities(b)
        return (
          vulA.critical - vulB.critical ||
          vulA.high - vulB.high ||
          vulA.medium - vulB.medium ||
          vulA.low - vulB.low
        )
      })
      .reverse()
  }, [components])

  console.log("components with vulnerabilities: ", components)

  return (
    <DataGrid columns={4}>
      <DataGridRow>
        <DataGridHeadCell>Component</DataGridHeadCell>
        <DataGridHeadCell>Type</DataGridHeadCell>
        <DataGridHeadCell>Version</DataGridHeadCell>
        <DataGridHeadCell>Vulnerabilities</DataGridHeadCell>
      </DataGridRow>
      {components.map((item, i) => (
        <ServiceVulnerabilitiesListItem key={i} component={item} />
      ))}
    </DataGrid>
  )
}

export default ServiceVulnerabilitiesList
