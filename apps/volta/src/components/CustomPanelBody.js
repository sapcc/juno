import React from "react"
import { PanelBody } from "juno-ui-components"
import { Messages } from "messages-provider"

const CustomPanelBody = ({ footer, children }) => {
  return (
    <PanelBody footer={footer}>
      <Messages className="mb-6" />
      {children}
    </PanelBody>
  )
}

export default CustomPanelBody
