import React, { useMemo } from "react"
import ComponentsListItem from "./ComponentsListItem"
import { DataList, DataListRow, DataListCell, Stack } from "juno-ui-components"

const dataListHeaderItem = `
font-bold
`

const ComponentsList = ({ components }) => {
  components = useMemo(() => {
    if (!components) return []
    return components
  }, [components])

  return (
    <>
      {components.length > 0 ? (
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
          {components.map((item, i) => (
            <ComponentsListItem key={i} item={item} />
          ))}
        </DataList>
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
    </>
  )
}

export default ComponentsList
