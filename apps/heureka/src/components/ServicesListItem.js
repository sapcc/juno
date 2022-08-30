import React, { useMemo } from "react"
import { Icon, Badge, DataGridRow, DataGridCell } from "juno-ui-components"
import { Link } from "url-state-router"
import { classifyVulnerabilities, usersListToString } from "../helpers"
import VulnerabilitiesOverview from "./VulnerabilitiesOverview"

const cellClasses = `
justify-start
`

const ServicesListItem = ({ item }) => {
  const owners = useMemo(() => {
    return usersListToString(item.Owners)
  }, [item.Owners])

  const operators = useMemo(() => {
    return usersListToString(item.Operators)
  }, [item.Operators])

  const components = React.useMemo(() => {
    if (!item?.Components) return []
    return item.Components
  }, [item.Components])

  const vulnerabilities = React.useMemo(() => {
    return classifyVulnerabilities(components)
  }, [components])

  return (
    <DataGridRow>
      <DataGridCell className={cellClasses}>
        <Link to={`/services/${item.ID}`}>{item.Name}</Link>
      </DataGridCell>
      <DataGridCell className={cellClasses}>{owners}</DataGridCell>
      <DataGridCell className={cellClasses}>{operators}</DataGridCell>
      <DataGridCell className={cellClasses}>
        <VulnerabilitiesOverview vulnerabilities={vulnerabilities} />
      </DataGridCell>
      <DataGridCell className={cellClasses}>
        <div>
          <Badge className="pb-1.5" text="default">
            <Icon className="mr-2" icon="widgets" />
            {components.length}
          </Badge>
        </div>
      </DataGridCell>
    </DataGridRow>
  )
}

export default ServicesListItem
