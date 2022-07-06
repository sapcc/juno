import React, { useMemo } from "react"
import { DataListRow, DataListCell } from "juno-ui-components"
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
      <DataListCell width={20}>
        <Link to={`/components/${item.ID}`} state={{ placeholderData: item }}>
          {item.Name}
        </Link>
      </DataListCell>
      <DataListCell width={20}>{item.Type}</DataListCell>
      <DataListCell width={20}>{services.length}</DataListCell>
      <DataListCell width={40}>{vulnerabilities.length}</DataListCell>
    </DataListRow>
  )
}

export default ComponentsListItem
