import React from "react"
import { InPortal } from "./index.js"
import { Message } from "../Message/index.js"

export default {
  title: "WiP/Portal",
  component: InPortal,
  argTypes: {},
}

const Template = ({ options, ...args }) => (
  <InPortal>
    <Message {...args} />
  </InPortal>
)

export const Default = Template.bind({})
Default.args = {
  title: "Portal",
  text: "Hi, I'm in a Portal 🤪",
}
