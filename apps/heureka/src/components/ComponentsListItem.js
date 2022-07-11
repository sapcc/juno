import React, { useMemo } from "react"
import { DataListRow, DataListCell, Badge, Icon } from "juno-ui-components"
import { Link } from "react-router-dom"

const ComponentsListItem = ({ item }) => {
  const services = useMemo(() => {
    if (!item.Services) return []
    return item.Services
  }, [item.Services])

  const vulnerabilities = useMemo(() => {
    if (!item.Vulnerabilities) return []
    return item.Vulnerabilities
  }, [item.Vulnerabilities])

  return (
    <DataListRow>
      <DataListCell width={40}>
        <Link to={`/components/${item.ID}`} state={{ placeholderData: item }}>
          {item.Name}
        </Link>
      </DataListCell>
      <DataListCell width={20}>{item.Type}</DataListCell>
      <DataListCell width={20}>
        <Badge text="default">
          <Icon className="mr-2" icon="dns" />
          {services.length}
        </Badge>
      </DataListCell>
      <DataListCell width={20}>{vulnerabilities.length}</DataListCell>
    </DataListRow>
  )
}

export default ComponentsListItem
