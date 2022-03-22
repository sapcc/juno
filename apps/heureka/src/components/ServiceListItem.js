import React, { useMemo } from "react"
import { DataListRow, DataListCell, CodeBlock } from "juno-ui-components"

const ServiceListItem = ({ item }) => {
  const owners = React.useMemo(() => {
    if (!item.owners) return ""
    return item.owners.map((owner, i) => (
      <span key={i}>{(i ? "," : "") + owner.sapId}</span>
    ))
  }, [item.owners])

  const operators = React.useMemo(() => {
    if (!item.operators) return ""
    return item.operators.map((operator, i) => (
      <span key={i}>{(i ? "," : "") + operator.sapId}</span>
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
