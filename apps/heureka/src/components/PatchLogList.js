import React, { useMemo } from "react"
import PatchLogListItem from "./PatchLogListItem"
import {
  DataGrid,
  DataGridRow,
  DataGridHeadCell,
  DataGridCell,
} from "juno-ui-components"
import HintNotFound from "./HintNotFound"

const PatchLogList = ({ patches }) => {
  patches = useMemo(() => {
    if (!patches) return []
    return patches
  }, [patches])

  return (
    <>
      <DataGrid columns={4}>
        <DataGridRow>
          <DataGridHeadCell>ID</DataGridHeadCell>
          <DataGridHeadCell>Date</DataGridHeadCell>
          <DataGridHeadCell>Changed components</DataGridHeadCell>
          <DataGridHeadCell>Evidences</DataGridHeadCell>
        </DataGridRow>
        {patches.length > 0 ? (
          <>
            {patches.map((item, i) => (
              <PatchLogListItem key={i} item={item} />
            ))}
          </>
        ) : (
          <DataGridRow>
            <DataGridCell colSpan={4}>
              <HintNotFound text="No patches found" />
            </DataGridCell>
          </DataGridRow>
        )}
      </DataGrid>
    </>
  )
}

export default PatchLogList
