import React from "react"
import { NativeSelectOption } from "./index.js"

export default {
  title: "Forms/Base Elements/NativeSelect/NativeSelectOption",
  component: NativeSelectOption,
  argTypes: {},
}

const Template = (args) => <NativeSelectOption {...args} />

export const Default = Template.bind({})
Default.args = {
  value: "my-option-value",
  label: "My option",
}

export const Disabled = Template.bind({})
Disabled.args = {
  value: "my-disabled-option-value",
  label: "My disabled option",
  disabled: true,
}
