import React, { useMemo } from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"
import { DateTime } from "luxon"
import VulnerabilityBadge from "./VulnerabilityBadge"
import { Link } from "url-state-router"
import { VULNERABILITIES_PATH } from "./AppRouter"

const IdClasses = `
text-sm 
pt-1
whitespace-nowrap
text-theme-disabled
`
const VulnerabilityCss = `
flex
`

const VulnerabilitiesListItem = ({ item, minimized }) => {
  const lastModifiedtString = useMemo(() => {
    if (!item.ScnLastModified) return "No date available"
    return DateTime.fromSQL(item.ScnLastModified).toLocaleString(
      DateTime.DATETIME_SHORT
    )
  }, [item?.ScnLastModified])

  return (
    <DataGridRow>
      <DataGridCell>
        <Link to={`${VULNERABILITIES_PATH}/${item.ID}`}>
          <span>{item.ScnID}</span>
          <div className={IdClasses}>{item.CveID}</div>
        </Link>
      </DataGridCell>
      <DataGridCell>
        <div className={VulnerabilityCss}>
          <VulnerabilityBadge
            level={item.ThreatLevelOverall}
            label={item.ThreatLevelOverall}
          />
        </div>
      </DataGridCell>
      {!minimized && <DataGridCell>{item?.Component?.Name}</DataGridCell>}
      <DataGridCell>{lastModifiedtString}</DataGridCell>
      <DataGridCell>{item.State}</DataGridCell>
    </DataGridRow>
  )
}

export default VulnerabilitiesListItem
