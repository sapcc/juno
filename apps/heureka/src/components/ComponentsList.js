import React, { useMemo } from "react"
import ComponentsListItem from "./ComponentsListItem"
import {
  Stack,
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
} from "juno-ui-components"

const ComponentsList = ({ components, minimized }) => {
  components = useMemo(() => {
    if (!components) return []
    return components
  }, [components])

  return (
    <DataGrid columns={minimized ? 3 : 7}>
      <DataGridRow>
        <DataGridHeadCell>Name</DataGridHeadCell>
        <DataGridHeadCell>Type</DataGridHeadCell>
        <DataGridHeadCell>Version</DataGridHeadCell>
        {!minimized && (
          <>
            <DataGridHeadCell>Belongs to</DataGridHeadCell>
            <DataGridHeadCell>Vulnerabilities</DataGridHeadCell>
            <DataGridHeadCell>Owners</DataGridHeadCell>
            <DataGridHeadCell>Operators</DataGridHeadCell>
          </>
        )}
      </DataGridRow>
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
    </DataGrid>
  )
}

export default ComponentsList
