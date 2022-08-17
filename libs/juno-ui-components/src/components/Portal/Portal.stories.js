import React from "react"
import { Portal } from "./index.js"
import { Message } from "../Message/index.js"

export default {
  title: "WiP/Portal",
  component: Portal,
  argTypes: {},
}

/* TODO
* add story for targetNode?
*/

const Template = (args) => {
  return (
    <Portal {...args} />
  )
}

export const Default = Template.bind({})
Default.args = {
  children: <Message title="Hi!" text="I'm in a Default Portal! 👻 That's why I render at `document body`" />
}

export const InPortalWithSelector = Template.bind({})
InPortalWithSelector.args = {
  children: <Message title="Hi!" text="I'm in a Portal at `#root`! 👻" />,
  targetSelector: "#root",
}
