import React, { useMemo } from "react"
import {
  Button,
  ContentAreaToolbar,
  DataGrid,
  DataGridHeadCell,
  DataGridRow,
  DataGridCell,
} from "juno-ui-components"
import PeaksListItem from "./PeaksListItem"
import HintNotFound from "../shared/HintNotFound"
import { useGlobalsActions } from "../StoreProvider"

const PeaksList = ({ peaks }) => {
  const { setCurrentPanel } = useGlobalsActions()

  const items = useMemo(() => {
    if (!peaks) return []
    return peaks
  }, [peaks])

  const handleNewPeakClick = () => {
    setCurrentPanel({ type: "PeaksNew" })
  }

  return (
    <>
      <ContentAreaToolbar>
        <Button
          icon="addCircle"
          onClick={handleNewPeakClick}
          label="Add a Peak"
        />
      </ContentAreaToolbar>
      <DataGrid columns={7}>
        <DataGridRow>
          <DataGridHeadCell>#</DataGridHeadCell>
          <DataGridHeadCell>Name</DataGridHeadCell>
          <DataGridHeadCell>Height</DataGridHeadCell>
          <DataGridHeadCell>Main Range</DataGridHeadCell>
          <DataGridHeadCell>Region</DataGridHeadCell>
          <DataGridHeadCell>Country</DataGridHeadCell>
          <DataGridHeadCell>Options</DataGridHeadCell>
        </DataGridRow>

        {items?.length > 0 ? (
          <>
            {items.map((peak, index) => (
              <PeaksListItem key={index} peak={peak} />
            ))}
          </>
        ) : (
          <DataGridRow>
            <DataGridCell colSpan={7}>
              <HintNotFound text="No peaks found" />
            </DataGridCell>
          </DataGridRow>
        )}
      </DataGrid>
    </>
  )
}

export default PeaksList
