import React, { useCallback } from "react"
import { 
  Button,  
  ContentAreaToolbar,
  DataGrid,
  DataGridCell,
  DataGridHeadCell,
  DataGridRow,
  DataGridToolbar,
  Icon,
  Stack,
} from "juno-ui-components"
import PeaksListItem from "./PeaksListItem"
import useStore from "../../store"

const PeaksList = ({

}) => {
  
  const peaks = useStore((state) => state.peaks)
  
  const openNewItemModal = useStore(
    useCallback((state) => state.openNewItemModal)
  )
  
  return (
    peaks.length > 0 ? 
      ( 
        <>
          <ContentAreaToolbar>
            <Button icon="addCircle" onClick={openNewItemModal} label="Add a Peak" />
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
             
             {peaks.map( (peak, p) => (
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
      )
      :
      (
        <div>There are no peaks to display.</div>
      )
    
  )
}

export default PeaksList