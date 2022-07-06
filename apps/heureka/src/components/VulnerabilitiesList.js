import React, { useMemo } from "react"
import ComponentsListItem from "./ComponentsListItem"
import { DataList, DataListRow, DataListCell } from "juno-ui-components"

const dataListHeaderItem = `
font-bold
`

const VulnerabilitiesList = ({ vulnerabilities }) => {
  console.log("vulnerabilities===> ", vulnerabilities)

  vulnerabilities = useMemo(() => {
    if (!vulnerabilities) return []
    return vulnerabilities
  }, [vulnerabilities])

  return (
    <>
      <DataList>
        <DataListRow className="relative">
          <DataListCell className={dataListHeaderItem} width={20}>
            Name
          </DataListCell>
          <DataListCell className={dataListHeaderItem} width={20}>
            Type
          </DataListCell>
          <DataListCell className={dataListHeaderItem} width={20}>
            Services
          </DataListCell>
          <DataListCell className={dataListHeaderItem} width={40}>
            Vulnerabilities
          </DataListCell>
        </DataListRow>
        {vulnerabilities.map((item, i) => (
          <ComponentsListItem key={i} item={item} />
        ))}
      </DataList>
    </>
  )
}

export default VulnerabilitiesList
