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
import useEndlessScrollList from "../../hooks/useEndlessScrollList"

const PeaksList = ({ peaks }) => {
  const { setCurrentPanel } = useGlobalsActions()

  const items = useMemo(() => {
    if (!peaks) return []
    return peaks
  }, [peaks])

  const { scrollListItems, iterator } = useEndlessScrollList(items, {
    loadingObject: (
      <DataGridRow>
        <DataGridCell colSpan={7}>
          <span>Loading ...</span>
        </DataGridCell>
      </DataGridRow>
    ),
    refFunction: (ref) => (
      <DataGridRow>
        <DataGridCell colSpan={7} className="border-b-0 py-0">
          <span ref={ref} />
        </DataGridCell>
      </DataGridRow>
    ),
  })

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

        {scrollListItems?.length > 0 ? (
          <>
            {iterator.map((peak, index) => (
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
