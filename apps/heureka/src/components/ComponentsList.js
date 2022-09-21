import React, { useMemo } from "react"
import ComponentsListItem from "./ComponentsListItem"
import {
  Stack,
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridCell,
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
        <DataGridRow>
          <DataGridCell colSpan={minimized ? 3 : 7}>
            <Stack alignment="center" distribution="center">
              <span>No components found</span>
            </Stack>
          </DataGridCell>
        </DataGridRow>
      )}
    </DataGrid>
  )
}

export default ComponentsList
