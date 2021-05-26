import React from "react"
import { StyleProvider } from "."

export default {
  title: "Design System/StyleProvider",
  component: StyleProvider,
  argTypes: {
    stylesWrapper: {
      control: {
        type: "radio",
        options: ["head", "inline", "shadowRoot"],
      },
    },
  },
}

const Template = (args) => (
  <StyleProvider {...args}>{args.stylesWrapper || "undefined"}</StyleProvider>
)

export const AddStylesToHead = Template.bind({})
AddStylesToHead.args = {
  stylesWrapper: "head",
}

export const AddInlineStyles = Template.bind({})
AddInlineStyles.args = {
  stylesWrapper: "inline",
}

export const AddStylesToShadowRoot = Template.bind({})
AddStylesToShadowRoot.args = {
  stylesWrapper: "shadowRoot",
}
