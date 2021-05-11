import React from "react"

import Button from "./index.js"

export default {
  title: "Design System/Primitives/Button",
  component: Button,
  argTypes: {},
}

const Template = (args) => <Button {...args} />

export const Disabled = Template.bind({})
Disabled.args = {
  variant: "primary",
  label: "Primary Disabled",
  disabled: true,
}

export const Primary = Template.bind({})
Primary.args = {
  variant: "primary",
  label: "Primary",
}

export const Default = Template.bind({})
Default.args = {
  label: "Default",
}

export const Danger = Template.bind({})
Danger.args = {
  variant: "danger",
  label: "Danger",
}

export const Large = Template.bind({})
Large.args = {
  size: "large",
  label: "Large",
}

export const DefaultSize = Template.bind({})
DefaultSize.args = {
  label: "Default",
}

export const Small = Template.bind({})
Small.args = {
  size: "small",
  label: "Small",
}

