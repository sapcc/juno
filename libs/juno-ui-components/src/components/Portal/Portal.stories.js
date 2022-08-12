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
* add stories for targetSelector, targetNode
* add tests for targetNode, targetSelector, default target
*/

const Template = ({ options, ...args }) => (
  <Portal>
    <Message {...args} />
  </Portal>
)

export const Default = Template.bind({})
Default.args = {
  title: "Portal",
  text: "Hi, I'm in a Portal 🤪",
}
