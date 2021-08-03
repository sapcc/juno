import React from "react"
import { Icon } from "./index.js"

export default {
  title: "Design System/Icon",
  component: Icon,
  argTypes: {},
  parameters: {
    docs: {
      description: {
      component: 'A generic icon component. Accepts any string as a color for now.',
      },
    },
  },
}

const Template = (args) => <Icon {...args} />

export const Default = Template.bind({})
Default.args = {
	icon: "help"
}

export const Info = Template.bind({})
Info.args = {
  icon: "info",
  color: "text-info",
}

export const Danger = Template.bind({})
Danger.args = {
  icon: "error",
  color: "text-danger",
}

export const Success = Template.bind({})
Success.args = {
  icon: "success",
  color: "text-success",
}

export const Warning = Template.bind({})
Warning.args = {
  icon: "warning",
  color: "text-warning",
}

export const ThemeColor = Template.bind({})
ThemeColor.args = {
  icon: "help",
  color: "text-sap-gold",
}

export const Smaller = Template.bind({})
Smaller.args = {
  icon: "help",
  size: "18",
}

export const Larger = Template.bind({})
Larger.args = {
  icon: "help",
  size: "64",
}
