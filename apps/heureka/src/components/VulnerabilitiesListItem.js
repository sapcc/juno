import React, { useMemo } from "react"
import { DataListRow, DataListCell } from "juno-ui-components"

const VulnerabilitiesListItem = ({ item }) => {
  return (
    <DataListRow>
      <DataListCell>{item.Name}</DataListCell>
    </DataListRow>
  )
}

export default VulnerabilitiesListItem
