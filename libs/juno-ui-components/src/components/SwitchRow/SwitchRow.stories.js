import React from "react"
import { SwitchRow } from "./index.js"

export default {
  title: "Deprecated/SwitchRow",
  component: SwitchRow,
  parameters: {
    docs: {
      description: {
        component: "SwitchRow is deprecated, use Switch instead."
      },
    },
  },
  argTypes: {},
}

const Template = (args) => <SwitchRow {...args} />

export const Default = Template.bind({})
Default.args = {
  name: "",
  id: "",
  on: false,
  disabled: false,
  helptext: "",
  required: "",
  invalid: false,
  errortext: "",
  valid: false,
  successtext: "",
  className: "",
  onChange: undefined,
  onClick: undefined,
  label: "Default Switch Row",
}

export const On = Template.bind({})
On.args = {
  name: "",
  id: "",
  disabled: false,
  helptext: "",
  required: "",
  invalid: false,
  errortext: "",
  valid: false,
  successtext: "",
  className: "",
  onChange: undefined,
  onClick: undefined,
  label: "On Switch Row",
  on: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  name: "",
  id: "",
  helptext: "",
  required: "",
  invalid: false,
  errortext: "",
  valid: false,
  successtext: "",
  className: "",
  onChange: undefined,
  onClick: undefined,
  label: "Disabled Switch Row",
  on: true,
  disabled: true,
}

export const WithHelptext = Template.bind({})
WithHelptext.args = {
  name: "",
  id: "",
  disabled: false,
  required: "",
  invalid: false,
  errortext: "",
  valid: false,
  successtext: "",
  className: "",
  onChange: undefined,
  onClick: undefined,
  label: "Switch Row with Helptext",
  on: true,
  helptext: "Oh so helpful helptext",
}

export const WithHelptextWithLink = Template.bind({})
WithHelptextWithLink.args = {
  name: "",
  id: "",
  disabled: false,
  required: "",
  invalid: false,
  errortext: "",
  valid: false,
  successtext: "",
  className: "",
  onChange: undefined,
  onClick: undefined,
  label: "Switch Row with Helptext",
  on: true,
  helptext: <>Helptext with a <a href="#">Link</a></>,
}

export const Required = Template.bind({})
Required.args = {
  name: "",
  id: "",
  on: false,
  disabled: false,
  helptext: "",
  invalid: false,
  errortext: "",
  valid: false,
  successtext: "",
  className: "",
  onChange: undefined,
  onClick: undefined,
  label: "Required Switch",
  required: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  name: "",
  id: "",
  on: false,
  disabled: false,
  helptext: "",
  required: "",
  errortext: "",
  valid: false,
  successtext: "",
  className: "",
  onChange: undefined,
  onClick: undefined,
  label: "Invalid Switch",
  invalid: true,
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  name: "",
  id: "",
  on: false,
  disabled: false,
  required: "",
  invalid: false,
  valid: false,
  successtext: "",
  className: "",
  onChange: undefined,
  onClick: undefined,
  label: "Input Row with Error Text",
  helptext: "Oh so helpful helptext",
  errortext: "When passed an errortext prop, the SwitchRow will be set to invalid automatically.",
}
WithErrorText.parameters = {
  docs: {
    description: {
      story:
        "Passing an `errortext` prop to the SwitchRow component will automatically invalidate it, so there is no need to explicitly set `invalid` as well.",
    },
  },
}

export const Valid = Template.bind({})
Valid.args = {
  name: "",
  id: "",
  on: false,
  disabled: false,
  helptext: "",
  required: "",
  invalid: false,
  errortext: "",
  successtext: "",
  className: "",
  onChange: undefined,
  onClick: undefined,
  label: "Valid Switch",
  valid: true,
}

export const WithSuccessText = Template.bind({})
WithSuccessText.args = {
  name: "",
  id: "",
  on: false,
  disabled: false,
  required: "",
  invalid: false,
  errortext: "",
  valid: false,
  className: "",
  onChange: undefined,
  onClick: undefined,
  label: "Input Row with Success Text",
  helptext: "Oh so helpful helptext",
  successtext: "When passed a successtext prop, the SwitchRow will be set to valid automatically.",
}
WithSuccessText.parameters = {
  docs: {
    description: {
      story:
        "Passing a `successtext` prop to the SwitchRow component will automatically set it to valid, so there is no need to explicitly set `valid` as well.",
    },
  },
}
