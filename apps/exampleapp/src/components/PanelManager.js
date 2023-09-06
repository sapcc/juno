import React, { useMemo } from "react"
import { Panel } from "juno-ui-components"
import { currentState, push } from "url-state-provider"
import EditItemPanel from "./Peaks/EditItemPanel"
import { useGlobalsUrlStateKey } from "./StoreProvider"

const PanelManager = ({ currentPanel }) => {
  const urlStateKey = useGlobalsUrlStateKey()

  const heading = useMemo(() => {
    switch (currentPanel) {
      case "EditPeaksItem":
        return "Edit Peak"
      default:
        return null
    }
  }, [currentPanel])

  const panelBody = () => {
    switch (currentPanel) {
      case "EditPeaksItem":
        return <EditItemPanel closeCallback={onClose} />
      default:
        return null
    }
  }

  const onClose = () => {
    const urlState = currentState(urlStateKey)
    push(urlStateKey, { ...urlState, currentPanel: "" })
  }

  return (
    <Panel
      heading={heading}
      opened={panelBody() ? true : false}
      onClose={onClose}
    >
      {panelBody()}
    </Panel>
  )
}

export default PanelManager
