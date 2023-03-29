import React from "react"
import { ShadowRoot } from "."

const Template = (args) => (
  <ShadowRoot {...args}>
    <h1>Welcome</h1>
  </ShadowRoot>
)

export default {
  title: "Layout/ShadowRoot",
  component: ShadowRoot,
}

export const EncapsulateStyles = Template.bind({})
EncapsulateStyles.args = {
  mode: "closed",
}
