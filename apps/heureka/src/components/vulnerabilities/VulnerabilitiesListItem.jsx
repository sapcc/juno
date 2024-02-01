import React from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"

const IdClasses = `
text-sm 
pt-1
whitespace-nowrap
text-theme-disabled
`
const VulnerabilityCss = `
flex
`

const VulnerabilitiesListItem = ({ item }) => {
  console.log(">>>>>>>>>>>>>>item", item)

  return (
    <DataGridRow>
      <DataGridCell>
        <span>{item?.node?.id}</span>
      </DataGridCell>
      <DataGridCell>
        <div className={VulnerabilityCss}>
          {/* <VulnerabilityBadge
            level={item?.Scn?.ThreatLevelOverall}
            label={item?.Scn?.ThreatLevelOverall}
          /> */}
        </div>
      </DataGridCell>
      <DataGridCell>{item?.Component?.Name}</DataGridCell>
      <DataGridCell></DataGridCell>
      <DataGridCell>{item?.State}</DataGridCell>
    </DataGridRow>
  )
}

export default VulnerabilitiesListItem
