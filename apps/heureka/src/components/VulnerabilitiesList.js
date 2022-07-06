import React, { useMemo } from "react"
import VulnerabilitiesListItem from "./VulnerabilitiesListItem"
import { DataList, DataListRow, DataListCell } from "juno-ui-components"

const dataListHeader = `
bg-theme-background-lvl-2
`

const dataListHeaderItem = `
font-bold
`

const VulnerabilitiesList = ({ components }) => {
  console.log("vulnerabilities===> ", components)

  // TODO: remove components without vulnerabilities
  components = useMemo(() => {
    if (!components) return []
    return components
  }, [components])

  return (
    <>
      <DataList>
        <DataListRow className={dataListHeader}>
          <DataListCell className={dataListHeaderItem} width={20}>
            Component
          </DataListCell>
          <DataListCell className={dataListHeaderItem} width={35}>
            Belongs to
          </DataListCell>
          <DataListCell className={dataListHeaderItem} width={10}>
            Thread levels
          </DataListCell>
          <DataListCell className={dataListHeaderItem} width={35}>
            CVs
          </DataListCell>
        </DataListRow>
        {components.map((item, i) => (
          <VulnerabilitiesListItem key={i} item={item} />
        ))}
      </DataList>
    </>
  )
}

export default VulnerabilitiesList
