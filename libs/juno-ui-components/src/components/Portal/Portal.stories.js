import React from "react"
import { InPortal } from "./index.js"
import { Message } from "../Message/index.js"

export default {
  title: "WiP/Portal",
  component: Portal,
  argTypes: {},
}

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
