import React from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"

const PackagesListItem = ({ item }) => {
  return (
    <DataGridRow>
      <DataGridCell>{item.Name}</DataGridCell>
      <DataGridCell>{item.Version}</DataGridCell>
      <DataGridCell>{item.CPE}</DataGridCell>
    </DataGridRow>
  )
}

export default PackagesListItem
