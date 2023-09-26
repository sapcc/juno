import React from "react"
import { NativeSelectOptionGroup } from "./index.js"
import { NativeSelectOption } from "../NativeSelectOption/index.js"

import {
  Default as DefaultSelectOption,
  Disabled as DisabledSelectOption,
} from "../NativeSelectOption/NativeSelectOption.stories"

export default {
  title: "Forms/NativeSelect/NativeSelectOptionGroup",
  component: NativeSelectOptionGroup,
  argTypes: {
    options: {
      table: {
        disable: true
      }
    },
    children: {
      control: false
    },
  },
}

const Template = ({ options, ...args }) => (
  <NativeSelectOptionGroup {...args}>
    {options.map((option, i) => (
      <NativeSelectOption {...option} key={`option-${i}`} />
    ))}
  </NativeSelectOptionGroup>
)

export const Default = Template.bind({})
Default.args = {
  label: "My option group",
  options: [DefaultSelectOption.args, DisabledSelectOption.args],
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "My disabled option group",
  options: [DefaultSelectOption.args, DisabledSelectOption.args],
  disabled: true,
}
