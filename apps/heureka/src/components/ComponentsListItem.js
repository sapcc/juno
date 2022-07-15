import React, { useMemo } from "react"
import { DataListRow, DataListCell, Badge, Icon } from "juno-ui-components"
import { Link } from "react-router-dom"
import VulnerabilitiesOverview from "./VulnerabilitiesOverview"
import { classifyVulnerabilities, usersListToString } from "../helpers"

const ComponentsListItem = ({ item, minimized }) => {
  const services = useMemo(() => {
    if (!item.Services) return []
    return item.Services
  }, [item.Services])

  const vulnerabilities = React.useMemo(() => {
    return classifyVulnerabilities(item)
  }, [item])

  const owners = useMemo(() => {
    return usersListToString(item.Owners)
  }, [item.Owners])

  const operators = useMemo(() => {
    return usersListToString(item.Operators)
  }, [item.Operators])

  return (
    <DataListRow>
      <DataListCell width={20}>
        <Link to={`/components/${item.ID}`} state={{ placeholderData: item }}>
          {item.Name}
        </Link>
      </DataListCell>
      <DataListCell width={10}>{item.Type}</DataListCell>
      {!minimized && (
        <DataListCell width={10}>
          <Badge text="default">
            <Icon className="mr-2" icon="dns" />
            {services.length}
          </Badge>
        </DataListCell>
      )}
      <DataListCell width={20}>
        <VulnerabilitiesOverview vulnerabilities={vulnerabilities} />
      </DataListCell>
      {!minimized && (
        <>
          <DataListCell width={20}>{owners}</DataListCell>
          <DataListCell width={20}>{operators}</DataListCell>
        </>
      )}
    </DataListRow>
  )
}

export default ComponentsListItem
