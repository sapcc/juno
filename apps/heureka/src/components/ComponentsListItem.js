import React, { useMemo } from "react"
import { DataListRow, DataListCell, Badge, Icon } from "juno-ui-components"
import { Link } from "react-router-dom"
import VulnerabilitiesOverview from "./VulnerabilitiesOverview"
import { classifyVulnerabilities } from "../helpers"

const ComponentsListItem = ({ item }) => {
  const services = useMemo(() => {
    if (!item.Services) return []
    return item.Services
  }, [item.Services])

  const vulnerabilities = React.useMemo(() => {
    return classifyVulnerabilities(item)
  }, [item])

  const owners = useMemo(() => {
    if (!item.Owners) return ""
    return item.Owners.map((owner, i) => (
      <span key={i}>{(i ? "," : "") + owner.Name}</span>
    ))
  }, [item.Owners])

  const operators = useMemo(() => {
    if (!item.Operators) return ""
    return item.Operators.map((operator, i) => (
      <span key={i}>{(i ? "," : "") + operator.Name}</span>
    ))
  }, [item.Operator])

  return (
    <DataListRow>
      <DataListCell width={20}>
        <Link to={`/components/${item.ID}`} state={{ placeholderData: item }}>
          {item.Name}
        </Link>
      </DataListCell>
      <DataListCell width={10}>{item.Type}</DataListCell>
      <DataListCell width={10}>
        <Badge text="default">
          <Icon className="mr-2" icon="dns" />
          {services.length}
        </Badge>
      </DataListCell>
      <DataListCell width={20}>
        <VulnerabilitiesOverview vulnerabilities={vulnerabilities} />
      </DataListCell>
      <DataListCell width={20}>{owners}</DataListCell>
      <DataListCell width={20}>{operators}</DataListCell>
    </DataListRow>
  )
}

export default ComponentsListItem
