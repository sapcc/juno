import React, { useMemo } from "react"
import {
  DataListRow,
  DataListCell,
  Icon,
  Badge,
  Stack,
} from "juno-ui-components"
import { Link } from "react-router-dom"
import { classifyVulnerabilities, usersListToString } from "../helpers"
import VulnerabilitiesOverview from "./VulnerabilitiesOverview"

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
    <DataListRow>
      <DataListCell width={20}>
        <Link to={`/services/${item.ID}`} state={{ placeholderData: item }}>
          {item.Name}
        </Link>
      </DataListCell>
      <DataListCell width={20}>{owners}</DataListCell>
      <DataListCell auto>{operators}</DataListCell>
      <DataListCell auto>
        <VulnerabilitiesOverview vulnerabilities={vulnerabilities} />
      </DataListCell>
      <DataListCell auto>
        <div>
          <Badge className="pb-1.5" text="default">
            <Icon className="mr-2" icon="widgets" />
            {components.length}
          </Badge>
        </div>
      </DataListCell>
    </DataListRow>
  )
}

export default ServicesListItem
