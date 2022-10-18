import React, { useCallback } from "react"
import { 
  Button,  
  DataGrid,
  DataGridCell,
  DataGridHeadCell,
  DataGridRow,
  DataGridToolbar,
  Icon,
  Stack,
} from "juno-ui-components"
import useStore from "../../store"


const PeaksListItem = ({
  name,
  height,
  mainrange,
  region, 
  countries,
  url,
  ...props
}) => {
  
  const openEditPanel = useStore(
    useCallback((state) => state.openEditItemPanel)
  )
  
  return (
    <DataGridRow {...props} >
      <DataGridCell><strong>{ name }</strong></DataGridCell>
      <DataGridCell>{ height }</DataGridCell>
      <DataGridCell>{ mainrange }</DataGridCell>
      <DataGridCell>{ region }</DataGridCell>
      <DataGridCell>
        {countries.map( (c, i) => (
          c + ( i < countries.length - 1 ? ", " : "" )
        ))}
      </DataGridCell>
      <DataGridCell>
        {/* Use <Stack> to align and space elements: */}
        <Stack gap="1.5">
          <Icon icon="edit" size="18" className="leading-none" onClick={openEditPanel}/>
          <Icon icon="deleteForever" size="18"/>
          <Icon icon="openInNew" size="18" href={url} target="_blank" className="leading-none" />
        </Stack>
      </DataGridCell>
    </DataGridRow>
  )
}

export default PeaksListItem