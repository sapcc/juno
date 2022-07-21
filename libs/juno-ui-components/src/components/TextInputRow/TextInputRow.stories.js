import React from "react"
import { TextInputRow } from "./index.js"

export default {
  title: "Forms/TextInputRow",
  component: TextInputRow,
  argTypes: {},
}

const Template = (args) => <TextInputRow {...args} />

export const Default = Template.bind({})
Default.args = {
  label: "Text Input Row",
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Disabled Text Input Row",
  disabled: true,
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  name: "my-input",
  label: "Text Input Row with Help Text",
  helptext: "Oh so helpful helptext",
}

export const WithHelpTextWithLink = Template.bind({})
const helptext = <>Helptext with a <a href="#">Link</a></>
WithHelpTextWithLink.args = {
  name: "my-input",
  label: "Text Input Row with Help Text containing a link",
  helptext: helptext,
}

export const Required = Template.bind({})
Required.args = {
  label: "Required input",
  required: true,
}
