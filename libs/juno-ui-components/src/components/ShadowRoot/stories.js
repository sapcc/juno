import React from "react"
import { ShadowRoot } from "."

export default {
  title: "Design System/ShadowRoot",
  component: ShadowRoot,
  argTypes: {
    mode: {
      control: {
        type: "radio",
        options: ["open", "closed"],
      },
    },
    styles: {
      control: {
        type: "text",
      },
      defaultValue: "h1 {color: yellow;}",
    },
    delegateFocus: {
      control: {
        type: "radio",
        options: [true, false],
      },
    },
  },
}

const Template = (args) => (
  <ShadowRoot {...args}>
    <h1>Wellcome</h1>
  </ShadowRoot>
)

export const WithStyles = Template.bind({})
WithStyles.args = {
  mode: "closed",
  styles: "h1 {color: red;}",
}
