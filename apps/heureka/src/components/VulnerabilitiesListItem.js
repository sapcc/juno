import React, { useMemo } from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"

const VulnerabilitiesListItem = ({ item }) => {
  return (
    <DataGridRow>
      <DataGridCell>{item.Name}</DataGridCell>
      <DataGridCell>{}</DataGridCell>
      <DataGridCell>{}</DataGridCell>
      <DataGridCell>{}</DataGridCell>
    </DataGridRow>
  )
}

export default VulnerabilitiesListItem
