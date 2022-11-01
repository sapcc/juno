import React from "react"
import { RadioRow } from "./index.js"

export default {
  title: "Forms/Radio/RadioRow",
  component: RadioRow,
  argTypes: {},
}

const Template = (args) => <RadioRow {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Default Radio Row",
  id: "radio-row-default",
}

export const Checked = Template.bind({})
Checked.args = {
  label: "Checked Radio Row",
  checked: true,
  id: "radio-row-checked",
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  name: "my-input",
  label: "Radio Row with help text",
  helptext: "Oh so helpful helptext",
  id: "radio-row-withHelptext",
}

export const WithHelpTextWithLink = Template.bind({})
WithHelpTextWithLink.args = {
  name: "my-input",
  label: "Radio Row with help text",
  helptext: <>Helptext with a <a href="#">Link</a></>,
  id: "radio-row-withHelptext-WithLink",
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled Radio",
  id: "radio-row-disabled",
  disabled: true,
}

export const Invalid = Template.bind({})
Invalid.args = {
  label: "Invalid Option",
  invalid: true,
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  label: "Option with Error Text",
  helptext: "Oh so helpful helptext",
  errortext: "When passed an errortext prop, the RadioRow will be set to invalid automatically.",
}
WithErrorText.parameters = {
  docs: {
    description: {
      story:
        "Passing an `errortext` prop to the RadioRow component will automatically invalidate it, so there is no need to explicitly set `invalid` as well.",
    },
  },
}