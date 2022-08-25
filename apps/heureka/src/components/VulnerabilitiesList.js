import React, { useMemo } from "react"
import VulnerabilitiesListItem from "./VulnerabilitiesListItem"
import { DataGrid, DataGridRow, DataGridHeadCell } from "juno-ui-components"

const VulnerabilitiesList = ({ components }) => {
  // TODO: remove components without vulnerabilities
  components = useMemo(() => {
    if (!components) return []
    return components
  }, [components])

  console.log("components: ", components)

  return (
    <DataGrid columns={4}>
      <DataGridRow>
        <DataGridHeadCell>Component</DataGridHeadCell>
        <DataGridHeadCell>Belongs to</DataGridHeadCell>
        <DataGridHeadCell>Thread levels</DataGridHeadCell>
        <DataGridHeadCell>CVs</DataGridHeadCell>
      </DataGridRow>
      {components.map((item, i) => (
        <VulnerabilitiesListItem key={i} item={item} />
      ))}
    </DataGrid>
  )
}

export default VulnerabilitiesList
