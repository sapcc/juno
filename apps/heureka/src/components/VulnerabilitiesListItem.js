import React, { useMemo } from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"
import { DateTime } from "luxon"

const VulnerabilitiesListItem = ({ item }) => {
  const lastModifiedtString = useMemo(() => {
    if (!item.ScnLastModified) return "No date available"
    return DateTime.fromSQL(item.ScnLastModified).toLocaleString(
      DateTime.DATETIME_FULL
    )
  }, [item?.ScnLastModified])

  return (
    <DataGridRow>
      <DataGridCell>{item.ScnID}</DataGridCell>
      <DataGridCell>{lastModifiedtString}</DataGridCell>
      <DataGridCell>{item.ThreatLevelOverall}</DataGridCell>
      <DataGridCell>{item.State}</DataGridCell>
    </DataGridRow>
  )
}

export default VulnerabilitiesListItem
