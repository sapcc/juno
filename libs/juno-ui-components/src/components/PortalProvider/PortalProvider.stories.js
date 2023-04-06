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
      <Message className="jn-mt-5" title="Hi!" text="I'm outside the portal" />

      {portalRef &&
        ReactDOM.createPortal(
          <Code>
            {`const portalRef = usePortalRef()
              \n
              return (
                {portalRef && ReactDOM.createPortal("I'm inside the portal",portalRef)}
              )
            `}
          </Code>,
          portalRef
        )}
    </>
  )
}
/**
 *  PortalRef
 */
export const PortalRef = {
  render: () => <PortalRefContent />,
}

// const PortalRef = (args) => (
//   <PortalProvider>
//     <PortalRefContent />
//   </PortalProvider>
// )

/** The PortalProvider is the parent for all portals of a Juno app. */
export { Default as PortalComponent }
