import React from "react"
import { StyleProvider } from "./index"

export default {
  title: "Layout/StyleProvider",
  component: StyleProvider,
  argTypes: {
    stylesWrapper: {
      options: ["head", "inline", "shadowRoot"],
      control: {
        type: "radio",
      },
    },
    children: {
      control: false
    },
  },
}

const Template = (args) => (
  <StyleProvider {...args}>
    {args.children || args.stylesWrapper || "undefined"}
  </StyleProvider>
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

export const WithTheme = Template.bind({})
WithTheme.args = {
  stylesWrapper: "shadowRoot",
  theme: "theme-light",
  children: "Light Theme",
}
