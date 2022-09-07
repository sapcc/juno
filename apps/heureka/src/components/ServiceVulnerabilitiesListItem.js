import React, { useMemo } from "react"
import { DataGridRow, DataGridCell } from "juno-ui-components"
import { classifyVulnerabilities, componentVersionByType } from "../helpers"
import VulnerabilitiesOverview from "./VulnerabilitiesOverview"
import { Link } from "url-state-router"
import { COMPONENTS_PATH } from "./AppRouter"

const ServiceVulnerabilitiesListItem = ({ component }) => {
  const vulnerabilities = useMemo(() => {
    return classifyVulnerabilities(component)
  }, [component])

  return (
    <DataGridRow>
      <DataGridCell>
        <Link
          to={`${COMPONENTS_PATH}/${component.ID}`}
          state={{ placeholderData: component }}
        >
          {component.Name}
        </Link>
      </DataGridCell>
      <DataGridCell>{component.Type}</DataGridCell>
      <DataGridCell>{componentVersionByType(component)}</DataGridCell>
      <DataGridCell>
        <VulnerabilitiesOverview vulnerabilities={vulnerabilities} />
      </DataGridCell>
    </DataGridRow>
  )
}

export default ServiceVulnerabilitiesListItem
