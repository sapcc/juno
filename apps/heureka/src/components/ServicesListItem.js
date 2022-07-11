import React, { useMemo } from "react"
import { DataListRow, DataListCell, Icon, Badge } from "juno-ui-components"
import { Link } from "react-router-dom"

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
        <Icon className="mr-2" color="text-theme-success" icon="success" />
        <Icon className="mr-2" color="text-theme-warning" icon="warning" />
        <Icon className="mr-2" color="text-theme-danger" icon="danger" />
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
