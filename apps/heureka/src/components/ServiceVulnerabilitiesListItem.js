import React, { useMemo } from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"
import { classifyVulnerabilities } from "../helpers"
import VulnerabilitiesOverview from "./VulnerabilitiesOverview"

const ServiceVulnerabilitiesListItem = ({ item }) => {
  const vulnerabilities = useMemo(() => {
    return classifyVulnerabilities(item)
  }, [item])

  return (
    <DataGridRow>
      <DataGridCell>{item.Name}</DataGridCell>
      <DataGridCell>
        <VulnerabilitiesOverview vulnerabilities={vulnerabilities} />
      </DataGridCell>
      <DataGridCell>{item.Details.PushedAt}</DataGridCell>
    </DataGridRow>
  )
}

export default ServiceVulnerabilitiesListItem
