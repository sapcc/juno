import React, { useMemo } from "react"
import { DataListRow, DataListCell, Icon, Badge } from "juno-ui-components"
import { Link } from "react-router-dom"
import { classifyVulnerabilities } from "../helpers"

const vulnerabilityCss = `
  mr-4
`

const ServicesListItem = ({ item }) => {
  const owners = useMemo(() => {
    if (!item.Owners) return ""
    return item.Owners.map((owner, i) => (
      <span key={i}>{(i ? "," : "") + owner.Name}</span>
    ))
  }, [item.owners])

  const operators = useMemo(() => {
    if (!item.Operators) return ""
    return item.Operators.map((operator, i) => (
      <span key={i}>{(i ? "," : "") + operator.Name}</span>
    ))
  }, [item.operator])

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
        <div className={vulnerabilityCss}>
          <Icon
            className="mr-1"
            color="text-theme-success"
            icon="severityLow"
          />
          <span>{vulnerabilities.low}</span>
        </div>
        <div className={vulnerabilityCss}>
          <div>
            <Icon
              className="mr-1"
              color="text-theme-warning"
              icon="severityMedium"
            />
            <span>{vulnerabilities.medium}</span>
          </div>
        </div>
        <div className={vulnerabilityCss}>
          <Icon
            className="mr-1"
            color="text-theme-danger"
            icon="severityHigh"
          />
          <span>{vulnerabilities.high}</span>
        </div>
        <div>
          <Icon
            className="mr-1"
            color="text-theme-danger"
            icon="severityCritical"
          />
          <span>{vulnerabilities.critical}</span>
        </div>
      </DataListCell>
      <DataListCell auto>
        <Badge text="default">
          <Icon className="mr-2" icon="widgets" />
          {components.length}
        </Badge>
      </DataListCell>
    </DataListRow>
  )
}

export default ServicesListItem
