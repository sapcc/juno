import React from "react"
import ReactDOM from "react-dom"
import { PortalProvider, usePortalRef } from "."
import { Message } from "../Message/index.js"
import { Code } from "../Code/index.js"

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
          <Code>
            {`import React from "react"`}
            <br />
            {`import ReactDOM from "react-dom"`}
            <br />
            {`import { usePortalRef } from "juno-ui-components"`}
            <br />
            <br />
            {`const MyComponent = () => {`}
            <br />
            &nbsp;&nbsp;{`const portalRef = usePortalRef()`}
            <br />
            &nbsp;&nbsp;{`return (`}
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;
            {`{ portalRef && ReactDOM.createPortal("I'm inside the portal",portalRef) }`}
            <br />
            &nbsp;&nbsp;{`)`}
            <br />
            {`}`}
          </Code>,
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
