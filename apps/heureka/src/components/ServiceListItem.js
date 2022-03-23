import React, { useMemo } from "react"
import { DataListRow, DataListCell, CodeBlock } from "juno-ui-components"

const ServiceListItem = ({ item }) => {
  const owners = React.useMemo(() => {
    if (!item.Owners) return []
    return item.Owners.map((owner, i) => (
      <span key={i}>{(i ? "," : "") + owner.SapID}</span>
    ))
  }, [item.owners])

  const operators = React.useMemo(() => {
    if (!item.Operators) return []
    return item.Operators.map((operator, i) => (
      <span key={i}>{(i ? "," : "") + operator.SapID}</span>
    ))
  }, [item.operator])

  return (
    <DataListRow>
      <DataListCell width={20}>{item.Name}</DataListCell>
      <DataListCell width={20}>{owners}</DataListCell>
      <DataListCell width={20}>{operators}</DataListCell>
      <DataListCell width={40}></DataListCell>
    </DataListRow>
  )
}

export default ServiceListItem
