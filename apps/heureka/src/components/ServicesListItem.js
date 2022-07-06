import React, { useMemo } from "react"
import { DataListRow, DataListCell, Icon, Badge } from "juno-ui-components"
import { Link } from "react-router-dom"

const ServicesListItem = ({ item }) => {
  const owners = useMemo(() => {
    if (!item.Owners) return []
    return item.Owners.map((owner, i) => (
      <span key={i}>{(i ? "," : "") + owner.SapID}</span>
    ))
  }, [item.owners])

  const operators = useMemo(() => {
    if (!item.Operators) return []
    return item.Operators.map((operator, i) => (
      <span key={i}>{(i ? "," : "") + operator.SapID}</span>
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
      <DataListCell width={40}>
        <Badge text="default">
          <Icon className="mr-2" icon="autoAwesomeMotion" />
          {components.length}
        </Badge>
      </DataListCell>
    </DataListRow>
  )
}

export default ServicesListItem
