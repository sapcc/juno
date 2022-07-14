import React, { useMemo } from "react"
import {
  DataListRow,
  DataListCell,
  Icon,
  Badge,
  Stack,
} from "juno-ui-components"
import { Link } from "react-router-dom"
import { classifyVulnerabilities } from "../helpers"
import VulnerabilitiesOverview from "./VulnerabilitiesOverview"
import Avatar from "./Avatar"

const ServicesListItem = ({ item }) => {
  const owners = useMemo(() => {
    if (!item.Owners) return ""
    return item.Owners.map((owner, i) => (
      <span key={i}>{(i ? "," : "") + owner.Name}</span>
    ))
  }, [item.Owners])

  const operators = useMemo(() => {
    if (!item.Operators) return ""
    return (
      <Stack direction="vertical">
        {item.Operators.map((operator, i) => (
          <div key={i} className={i ? "mt-2" : ""}>
            <Avatar user={operator} />
          </div>
        ))}
      </Stack>
    )
  }, [item.Operator])

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
