import React from "react"
import { SwitchRow } from "./index.js"

export default {
  title: "Forms/SwitchRow",
  component: SwitchRow,
  argTypes: {},
}

const Template = (args) => <SwitchRow {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Default Switch Row",
}

export const On = Template.bind({})
On.args = {
  label: "On Switch Row",
  on: true,
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled Switch Row",
  on: true,
  disabled: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true
}

export const WithHelptext = Template.bind({})
WithHelptext.args = {
  label: "Switch Row with Helptext",
  on: true,
  helptext: "Oh so helpful helptext",
}

export const WithHelptextWithLink = Template.bind({})
WithHelptextWithLink.args = {
  label: "Switch Row with Helptext",
  on: true,
  helptext: <>Helptext with a <a href="#">Link</a></>,
}

export const Required = Template.bind({})
Required.args = {
  label: "Required Switch",
  required: true,
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
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
