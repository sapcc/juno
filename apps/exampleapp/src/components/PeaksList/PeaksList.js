import React, { useMemo } from "react"
import {
  Button,
  ContentAreaToolbar,
  DataGrid,
  DataGridHeadCell,
  DataGridRow,
} from "juno-ui-components"
import PeaksListItem from "./PeaksListItem"
import useStore from "../../store"
import { currentState, push } from "url-state-provider"

const PeaksList = ({ peaks }) => {
  const urlStateKey = useStore((state) => state.urlStateKey)

  peaks = useMemo(() => {
    if (!peaks) return []
    return peaks
  }, [peaks])

  // const openNewItemModal = useStore((state) => state.setCurrentModal)
  const handleNewPeakClick = () => {
    // openNewItemModal("NewPeaksItem")

    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, currentModal: "NewPeaksItem" })
  }

  return peaks.length > 0 ? (
    <>
      <ContentAreaToolbar>
        <Button
          icon="addCircle"
          onClick={handleNewPeakClick}
          label="Add a Peak"
        />
      </ContentAreaToolbar>
      <DataGrid columns={6}>
        <DataGridRow>
          <DataGridHeadCell>Name</DataGridHeadCell>
          <DataGridHeadCell>Height</DataGridHeadCell>
          <DataGridHeadCell>Main Range</DataGridHeadCell>
          <DataGridHeadCell>Region</DataGridHeadCell>
          <DataGridHeadCell>Country</DataGridHeadCell>
          <DataGridHeadCell>Options</DataGridHeadCell>
        </DataGridRow>

        {/* Render items: */}

        {peaks.map((peak, p) => (
          <PeaksListItem
            name={peak.name}
            height={peak.height}
            mainrange={peak.mainrange}
            region={peak.region}
            countries={peak.countries}
            url={peak.url}
            key={p}
          />
        ))}
      </DataGrid>
    </>
  ) : (
    <div>There are no peaks to display.</div>
  )
}

export default PeaksList
