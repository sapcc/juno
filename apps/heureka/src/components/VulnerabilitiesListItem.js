import React from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"

const VulnerabilitiesListItem = ({ item }) => {
  return (
    <DataGridRow>
      <DataGridCell>{item.CveID}</DataGridCell>
      <DataGridCell>{item.ThreatLevelOverall}</DataGridCell>
      <DataGridCell>{item.State}</DataGridCell>
    </DataGridRow>
  )
}

export default VulnerabilitiesListItem
