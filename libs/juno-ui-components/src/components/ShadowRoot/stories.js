import React from "react"
import { ShadowRoot } from "."

const Template = (args) => (
  <ShadowRoot {...args}>
    <h1>Wellcome</h1>
  </ShadowRoot>
)

export const EncapsulateStyles = Template.bind({})
EncapsulateStyles.args = {
  mode: "closed",
  styles: "h1 {color: orange;}",
}
