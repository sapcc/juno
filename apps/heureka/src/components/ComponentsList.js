import React, { useMemo } from "react"
import ComponentsListItem from "./ComponentsListItem"
import { DataList, DataListRow, DataListCell, Stack } from "juno-ui-components"

const dataListHeader = `
bg-theme-background-lvl-2
`

const dataListHeaderItem = `
font-bold
`

const ComponentsList = ({ components, minimized }) => {
  components = useMemo(() => {
    if (!components) return []
    return components
  }, [components])

  return (
    <DataList>
      <DataListRow className={dataListHeader}>
        <DataListCell className={dataListHeaderItem} width={20}>
          Name
        </DataListCell>
        <DataListCell className={dataListHeaderItem} width={10}>
          Type
        </DataListCell>
        {!minimized && (
          <DataListCell className={dataListHeaderItem} width={10}>
            Belongs to
          </DataListCell>
        )}
        <DataListCell className={dataListHeaderItem} width={20}>
          Vulnerabilities
        </DataListCell>
        {!minimized && (
          <>
            <DataListCell className={dataListHeaderItem} width={20}>
              Owners
            </DataListCell>
            <DataListCell className={dataListHeaderItem} width={20}>
              Operators
            </DataListCell>
          </>
        )}
      </DataListRow>
      {components.length > 0 ? (
        <>
          {components.map((item, i) => (
            <ComponentsListItem key={i} item={item} minimized={minimized} />
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
