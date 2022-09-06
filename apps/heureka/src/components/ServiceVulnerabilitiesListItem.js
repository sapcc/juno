import React, { useMemo } from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"
import { classifyVulnerabilities, componentVersionByType } from "../helpers"
import VulnerabilitiesOverview from "./VulnerabilitiesOverview"
import { Link } from "url-state-router"
import { COMPONENTS_PATH } from "./AppRouter"

const ServiceVulnerabilitiesListItem = ({ item }) => {
  const vulnerabilities = useMemo(() => {
    return classifyVulnerabilities(item)
  }, [item])

  return (
    <DataGridRow>
      <DataGridCell>
        <Link
          to={`${COMPONENTS_PATH}/${item.ID}`}
          state={{ placeholderData: item }}
        >
          {item.Name}
        </Link>
      </DataGridCell>
      <DataGridCell>{item.Type}</DataGridCell>
      <DataGridCell>
        {item.Details[componentVersionByType(item.Type)]}
      </DataGridCell>
      <DataGridCell>
        <VulnerabilitiesOverview vulnerabilities={vulnerabilities} />
      </DataGridCell>
    </DataGridRow>
  )
}

export default ServiceVulnerabilitiesListItem
