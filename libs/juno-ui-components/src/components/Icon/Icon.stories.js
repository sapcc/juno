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

export const Red = Template.bind({})
Red.args = {
  icon: "help",
  color: "red",
}

export const Var = Template.bind({})
Var.args = {
  icon: "help",
  color: "var(--color-sap-gold-light-3)",
}
