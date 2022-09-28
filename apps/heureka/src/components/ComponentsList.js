import React, { useMemo } from "react"
import ComponentsListItem from "./ComponentsListItem"
import {
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridCell,
} from "juno-ui-components"
import HintNotFound from "./HintNotFound"
import { classifyVulnerabilities } from "../helpers"

const ComponentsList = ({ components, minimized, sorted, unlink }) => {
  components = useMemo(() => {
    if (!components) return []
    // inforce input as array
    if (!Array.isArray(components)) components = [components]
    // sort components by threat level
    if (sorted) {
      return components
        .sort((a, b) => {
          const vulA = classifyVulnerabilities(a)
          const vulB = classifyVulnerabilities(b)
          return (
            vulA.critical - vulB.critical ||
            vulA.high - vulB.high ||
            vulA.medium - vulB.medium ||
            vulA.low - vulB.low
          )
        })
        .reverse()
    }
    return components
  }, [components])

  return (
    <DataGrid columns={minimized ? 4 : 7}>
      <DataGridRow>
        <DataGridHeadCell>Name</DataGridHeadCell>
        <DataGridHeadCell>Type</DataGridHeadCell>
        <DataGridHeadCell>Version</DataGridHeadCell>
        <DataGridHeadCell>Vulnerabilities</DataGridHeadCell>
        {!minimized && (
          <>
            <DataGridHeadCell>Belongs to</DataGridHeadCell>
            <DataGridHeadCell>Owners</DataGridHeadCell>
            <DataGridHeadCell>Operators</DataGridHeadCell>
          </>
        )}
      </DataGridRow>
      {components.length > 0 ? (
        <>
          {components.map((item, i) => (
            <ComponentsListItem
              key={i}
              item={item}
              minimized={minimized}
              unlink={unlink}
            />
          ))}
        </>
      ) : (
        <DataGridRow>
          <DataGridCell colSpan={minimized ? 4 : 7}>
            <HintNotFound text="No components found" />
          </DataGridCell>
        </DataGridRow>
      )}
    </DataGrid>
  )
}

export default ComponentsList
