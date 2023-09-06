import React, { useMemo } from "react"
import {
  Button,
  ContentAreaToolbar,
  DataGrid,
  DataGridHeadCell,
  DataGridRow,
} from "juno-ui-components"
import PeaksListItem from "./PeaksListItem"
import { currentState, push } from "url-state-provider"
import { useGlobalsUrlStateKey } from "../StoreProvider"

const PeaksList = ({ peaks }) => {
  const urlStateKey = useGlobalsUrlStateKey()

  const items = useMemo(() => {
    if (!peaks) return []
    return peaks
  }, [peaks])

  const handleNewPeakClick = () => {
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, currentModal: "NewPeaksItem" })
  }

  return items.length > 0 ? (
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

        {/* Render items: */}

        {items.map((peak, index) => (
          <PeaksListItem key={index} peak={peak} />
        ))}
      </DataGrid>
    </>
  ) : (
    <div>There are no peaks to display.</div>
  )
}

export default PeaksList
