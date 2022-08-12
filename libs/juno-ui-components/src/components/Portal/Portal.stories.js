import React from "react"
import { Portal } from "./index.js"
import { Message } from "../Message/index.js"

export default {
  title: "WiP/Portal",
  component: Portal,
  argTypes: {},
}

/* TODO
* story renders any children
* add story for targetNode
* add tests for targetNode, targetSelector, default target
*/

const Template = (args) => (
  <Portal {...args} />
)

export const Default = Template.bind({})
Default.args = {
  children: <Message title="Hi!" text="I'm in a Default Portal! 👻" />
}

export const InRoot = Template.bind({})
InRoot.args = {
  children: <Message title="Hi!" text="I'm in a Portal at `#root`! 👻" />,
  targetSelector: "#root",
}

