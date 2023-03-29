import React from "react"
import { AppShellProvider } from "."

export default {
  title: "Layout/AppShellProvider",
  component: AppShellProvider,
  argTypes: {},
}

const Template = (args) => (
  <AppShellProvider {...args}>
    {args.children}
  </AppShellProvider>
)

/** By default the app is rendered inside of a ShadowRoot */
export const Default = Template.bind({})
Default.args = {}

export const NoShadowRoot = Template.bind({})
NoShadowRoot.args = {
  shadowRoot: false,
}

export const StylesInHead = Template.bind({})
StylesInHead.args = {
  shadowRoot: false,
  styleImport: "head"
}



