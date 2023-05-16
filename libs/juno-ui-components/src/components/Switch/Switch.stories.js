import React from "react"
import { Switch } from "./index"

export default {
  title: "Forms/Base Elements/Switch",
  component: Switch,
  parameters: {
    docs: {
      description: {
        component:
          "The basic switch component. Use for interactions that produce an immediate result when switching between two states/options. IN the context of forms that require to be submitted in order to take effect, use checkboxes instead.",
      },
    },
  },
}

const Template = (args) => <Switch {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: { story: 'Default Switch. Defaults to "off".' },
  },
}
Default.args = {
  label: "Switch"
}

export const Small = Template.bind({})
Small.args = {
  size: "small",
  label: "Small Switch"
}

export const Large = Template.bind({})
Large.args = {
  size: "large",
  label: "Large Switch"
}

export const On = Template.bind({})
On.parameters = {
  docs: {
    description: { story: 'Render a checked Switch by passing bool "on".' },
  },
}
On.args = {
  on: true,
}

export const Disabled = Template.bind({})
Disabled.parameters = {
  docs: {
    description: { story: 'Disable a Switch by passing bool "disabled".' },
  },
}
Disabled.args = {
  on: true,
  disabled: true,
  label: "Disabled Switch",
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
  label: "Invalid Switch",
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
  label: "Valid Switch",
}
