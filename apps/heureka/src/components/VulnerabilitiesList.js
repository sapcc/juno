import React, { useMemo } from "react"
import { DataGrid, DataGridRow, DataGridHeadCell } from "juno-ui-components"
import VulnerabilitiesListItem from "./VulnerabilitiesListItem"
import { threadLevelToWeight } from "../helpers"

const VulnerabilitiesList = ({ vulnerabilities, sortBy }) => {
  vulnerabilities = useMemo(() => {
    if (!vulnerabilities) return []
    if (!Array.isArray(vulnerabilities)) vulnerabilities = [vulnerabilities]
    if (sortBy === "ThreatLevelOverall") {
      return vulnerabilities
        .sort(
          (a, b) =>
            threadLevelToWeight(a[sortBy]) - threadLevelToWeight(b[sortBy])
        )
        .reverse()
    }
    return vulnerabilities
  }, [vulnerabilities])

  console.log("vulnerabilities: ", vulnerabilities)

  return (
    <DataGrid columns={5}>
      <DataGridRow>
        <DataGridHeadCell>ID</DataGridHeadCell>
        <DataGridHeadCell>Threat level</DataGridHeadCell>
        <DataGridHeadCell>Component</DataGridHeadCell>
        <DataGridHeadCell>Last modified</DataGridHeadCell>
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
