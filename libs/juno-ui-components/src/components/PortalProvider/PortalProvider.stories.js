import React from "react"
import ReactDOM from "react-dom"
import { PortalProvider, usePortalRef } from "."
import { Message } from "../Message/index.js"
import { CodeBlock } from "../CodeBlock/index.js"

export default {
  title: "Layout/PortalProvider",
  component: PortalProvider,
  subcomponents: { "PortalProvider.Portal": PortalProvider.Portal },
  tags: ["autodocs"],
  argTypes: {},
}

const Default = (args) => (
  <PortalProvider>
    <PortalProvider.Portal>
      <Message title="Hi!" text="I'm inside the portal" />
    </PortalProvider.Portal>
  </PortalProvider>
)

const PortalRefContent = () => {
  let portalRef = usePortalRef()

  return (
    <>
      {portalRef &&
        ReactDOM.createPortal(
          <CodeBlock>
            {`
import React from "react"
import ReactDOM from "react-dom"
import { usePortalRef } from "juno-ui-components"

const MyComponent = () => {
  const portalRef = usePortalRef()
  return (
    { portalRef && ReactDOM.createPortal("I'm inside the portal",portalRef) }
  )
}`}
          </CodeBlock>,
          portalRef
        )}
    </>
  )
}
/**
 *  PortalRef
 */
const PortalRef = (args) => (
  <PortalProvider>
    <PortalRefContent />
  </PortalProvider>
)

/** The PortalProvider is the parent for all portals of a Juno app. */
export { Default as PortalComponent, PortalRef }
