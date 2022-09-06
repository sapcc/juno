import React, { useMemo } from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"
import { DateTime } from "luxon"

const IdClasses = `
text-sm 
pt-1
whitespace-nowrap
text-theme-disabled
`

const VulnerabilitiesListItem = ({ item }) => {
  const lastModifiedtString = useMemo(() => {
    if (!item.ScnLastModified) return "No date available"
    return DateTime.fromSQL(item.ScnLastModified).toLocaleString(
      DateTime.DATETIME_FULL
    )
  }, [item?.ScnLastModified])

  return (
    <DataGridRow>
      <DataGridCell>
        <span>{item.ScnID}</span>
        <div className={IdClasses}>{item.CveID}</div>
      </DataGridCell>
      <DataGridCell>{lastModifiedtString}</DataGridCell>
      <DataGridCell>{item.ThreatLevelOverall}</DataGridCell>
      <DataGridCell>{item.State}</DataGridCell>
    </DataGridRow>
  )
}

export default VulnerabilitiesListItem
