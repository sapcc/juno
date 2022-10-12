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
  
  const closeEditPanel = useStore(
    useCallback((state) => state.closeEditItemPanel)
  )
  
  const saveEditPanel = () => { 
    console.log("Changes saved.") 
  }
  
  return (
    <PanelFooter>
      <Button label="Cancel" variant="subdued" onClick={closeEditPanel}/>
      <Button label="Save" variant="primary" onClick={saveEditPanel}/>
    </PanelFooter>
  )
}

const EditItemPanel = (
  title
) => {
  
  const panelOpened = useStore(
    useCallback((state) => state.editItemPanelOpened)
  )
  
  const closeEditPanel = useStore(
    useCallback((state) => state.closeEditItemPanel)
  )
  
  return (
    <Panel heading={"Edit Peak"} opened={panelOpened} onClose={closeEditPanel}>
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