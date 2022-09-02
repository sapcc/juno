import React, { useMemo } from "react"
import ServiceVulnerabilitiesListItem from "./ServiceVulnerabilitiesListItem"
import { DataGrid, DataGridRow, DataGridHeadCell } from "juno-ui-components"

const ServiceVulnerabilitiesList = ({ components }) => {
  components = useMemo(() => {
    if (!components) return []
    // inforce input as array
    if (!Array.isArray(components)) components = [components]
    // remove components without vulnerabilities
    let filteredComponents = components.filter(
      (item) => item?.Vulnerabilities?.length > 0
    )
    return filteredComponents
  }, [components])

  console.log("components with vulnerabilities: ", components)

  return (
    <DataGrid columns={3}>
      <DataGridRow>
        <DataGridHeadCell>Component</DataGridHeadCell>
        <DataGridHeadCell>Thread levels</DataGridHeadCell>
        <DataGridHeadCell>Pushed</DataGridHeadCell>
      </DataGridRow>
      {components.map((item, i) => (
        <ServiceVulnerabilitiesListItem key={i} item={item} />
      ))}
    </DataGrid>
  )
}

export default ServiceVulnerabilitiesList
