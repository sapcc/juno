import React, { useCallback } from "react"
import { 
  Button, 
  Form,
  Panel, 
  PanelBody, 
  PanelFooter,
  TextInputRow, 
} from "juno-ui-components"
import useStore from "../store"

const EditItemPanelFooter = () => {
  
  const handleCloseClick = () => {
    closeEditPanel()
  }
  
  const handleSaveClick = () => {
    saveEditPanel()
  }
  
  const closeEditPanel = useStore(
    useCallback((state) => state.closeEditItemPanel)
  )
  
  const saveEditPanel = () => { 
    console.log("Changes saved.") 
  }
  
  return (
    <PanelFooter>
      <Button label="Cancel" variant="subdued" onClick={handleCloseClick}/>
      <Button label="Save" variant="primary" onClick={handleSaveClick}/>
    </PanelFooter>
  )
}

const EditItemPanel = (
  title
) => {
  
  const panelOpened = useStore((state) => state.editItemPanelOpened)
  
  return (
    <Panel heading={"Edit Peak"} opened={panelOpened}>
      <PanelBody footer={<EditItemPanelFooter />}>
        <Form>
          <TextInputRow label="Name"/>
          <TextInputRow label="Height"/>
          <TextInputRow label="Main Range"/>
          <TextInputRow label="Region"/>
          <TextInputRow label="Country"/>
        </Form>
      </PanelBody>
    </Panel>
  )
}

export default EditItemPanel