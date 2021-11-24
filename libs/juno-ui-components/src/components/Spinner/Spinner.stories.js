import React from "react"

import { Spinner } from "./index.js"

export default {
  title: "Design System/Spinner",
  component: Spinner,
  argTypes: {
    // backgroundColor: { control: "color" },
    // labelColor: { control: "color" },
    // hoverColor: { control: "color" },
    // outlineColor: { control: "color" },
  },
}

const Template = (args) => <Spinner {...args} />

export const Primary = Template.bind({})
Primary.args = {
  variant: "primary",
}

export const Danger = Template.bind({})
Danger.args = { variant: "danger" }

export const Success = Template.bind({})
Success.args = { variant: "success" }

export const Warning = Template.bind({})
Warning.args = { variant: "warning" }

export const Light = Template.bind({})
Light.args = {}

export const Small = Template.bind({})
Small.args = {
  size: "small"
}

export const Large = Template.bind({})
Large.args = {
  size: "large"
}