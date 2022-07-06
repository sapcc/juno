import React, { useMemo } from "react"
import ComponentsListItem from "./ComponentsListItem"
import { DataList, DataListRow, DataListCell, Stack } from "juno-ui-components"

const dataListHeader = `
bg-theme-background-lvl-2
`

const dataListHeaderItem = `
font-bold
`

const ComponentsList = ({ components }) => {
  components = useMemo(() => {
    if (!components) return []
    return components
  }, [components])

  return (
    <DataList>
      <DataListRow className={dataListHeader}>
        <DataListCell className={dataListHeaderItem} width={40}>
          Name
        </DataListCell>
        <DataListCell className={dataListHeaderItem} width={20}>
          Type
        </DataListCell>
        <DataListCell className={dataListHeaderItem} width={20}>
          Belongs to
        </DataListCell>
        <DataListCell className={dataListHeaderItem} width={20}>
          Vulnerabilities
        </DataListCell>
      </DataListRow>
      {components.length > 0 ? (
        <>
          {components.map((item, i) => (
            <ComponentsListItem key={i} item={item} />
          ))}
        </>
      ) : (
        <Stack
          alignment="center"
          distribution="center"
          direction="vertical"
          className="h-full"
        >
          <p>No components found</p>
        </Stack>
      )}
    </DataList>
  )
}

export default ComponentsList
