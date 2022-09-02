import React, { useMemo } from "react"
import { DataGrid, DataGridRow, DataGridHeadCell } from "juno-ui-components"
import VulnerabilitiesListItem from "./VulnerabilitiesListItem"

const VulnerabilitiesList = ({ vulnerabilities }) => {
  vulnerabilities = useMemo(() => {
    if (!vulnerabilities) return []
    // inforce input as array
    if (!Array.isArray(vulnerabilities)) vulnerabilities = [vulnerabilities]
    return vulnerabilities
  }, [vulnerabilities])

  console.log("vulnerabilities: ", vulnerabilities)

  return (
    <DataGrid columns={3}>
      <DataGridRow>
        <DataGridHeadCell>CveID</DataGridHeadCell>
        <DataGridHeadCell>Thread level</DataGridHeadCell>
        <DataGridHeadCell>State</DataGridHeadCell>
      </DataGridRow>
      {vulnerabilities.map((item, index) => (
        <VulnerabilitiesListItem
          key={index}
          item={item}
        ></VulnerabilitiesListItem>
      ))}
    </DataGrid>
  )
}

export default VulnerabilitiesList
