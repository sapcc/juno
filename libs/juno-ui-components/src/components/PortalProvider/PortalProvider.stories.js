import React, { useState } from "react"
import { PortalProvider } from "."
import { Message } from "../Message/index.js"

export default {
  title: "Layout/PortalProvider",
  component: PortalProvider,
  argTypes: {},
}

const Template = (args) => (
  <PortalProvider {...args}>{args.children}</PortalProvider>
)

/** The PortalProvider is the parent for all portals of a Juno app. */
export const Default = Template.bind({})

const Example = ({}) => {
  const [show, setShow] = useState(true)
  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <Message title="Hi!" text="I'm outside a portal" />

      <PortalProvider.Portal>
        <div className="juno-pt-3">
          {show && <Message title="Hi!" text="I'm inside a portal" />}
        </div>
      </PortalProvider.Portal>
    </>
  )
}

const Example2 = ({}) => {
  const [show, setShow] = useState(true)
  return (
    <>
      <button onClick={() => setShow(!show)}>Toggle</button>
      <Message title="Hi!" text="I'm outside a portal" />

      <PortalProvider.Portal>
        {show && <Message title="Hi!" text="I'm inside a portal" />}
      </PortalProvider.Portal>
      <PortalProvider.Portal>{show && "Test"}</PortalProvider.Portal>
      <PortalProvider.Portal>{show && "Test2"}</PortalProvider.Portal>
      <PortalProvider.Portal>{show && "Test3"}</PortalProvider.Portal>
    </>
  )
}

Default.args = {
  children: <Example2 />,
}
