import React from "react"

import { Button } from "../components/Button/index.js"

export default {
  title: "Example/Button",
  component: Button,
  argTypes: {
    backgroundColor: { control: "color" },
    labelColor: { control: "color" },
    hoverColor: { control: "color" },
    outlineColor: { control: "color" },
  },
}

const Template = (args) => <Button {...args} />

export const Primary = Template.bind({})
Primary.args = {
  mode: "primary",
  label: "Button",
}

export const Success = Template.bind({})
Success.args = {
  mode: "success",
  label: "Button",
}

export const Danger = Template.bind({})
Danger.args = {
  mode: "danger",
  label: "Button",
}

export const Warning = Template.bind({})
Warning.args = {
  mode: "warning",
  label: "Button",
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: "Button",
}

export const Large = Template.bind({})
Large.args = {
  size: "large",
  label: "Button",
}

export const Small = Template.bind({})
Small.args = {
  size: "small",
  label: "Button",
}
