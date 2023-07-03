import React from "react"
import { Switch } from "./index"

export default {
  title: "Forms/Switch",
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
  label: "Switch",
  id: "switch-default"
}

export const Small = Template.bind({})
Small.args = {
  size: "small",
  label: "Small Switch",
  id: "switch-small"
}

export const Large = Template.bind({})
Large.args = {
  size: "large",
  label: "Large Switch",
  id: "switch-large"
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
  id: "switch-disabled",
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
  label: "Invalid Switch",
  id: "switch-invalid",
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
  label: "Valid Switch",
  id: "switch-valid",
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  label: "Switch",
  helptext: "This is an explanatory text referring to the input"
}

export const WithHelpTextAsNode = Template.bind({})
WithHelpTextAsNode.args = {
  label: "Switch",
  helptext: <>This is a helptext with a <a href="#">Link</a></>
}

export const WithSuccessText = Template.bind({})
WithSuccessText.args = {
  label: "Switch",
  successtext: "This field is a great success!"
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  label: "Switch",
  errortext: "This field has an error"
}
