import React from "react"
import { NativeSelect } from "./index.js"
import { NativeSelectOption } from "../NativeSelectOption/index.js"
import { NativeSelectOptionGroup } from "../NativeSelectOptionGroup/index.js"

import {
  Default as DefaultSelectOption,
  Disabled as DisabledSelectOption,
} from "../NativeSelectOption/NativeSelectOption.stories"
import {
  Default as DefaultSelectOptionGroup,
  Disabled as DisabledSelectOptionGroup,
} from "../NativeSelectOptionGroup/NativeSelectOptionGroup.stories"

export default {
  title: "Forms/Base Elements/NativeSelect/NativeSelect",
  component: NativeSelect,
  argTypes: {},
}

const NativeSelectTemplate = ({ options, ...args }) => (
  <NativeSelect {...args}>
    {options.map((option, i) => (
      <NativeSelectOption {...option} key={`option-${i}`} />
    ))}
  </NativeSelect>
)

const GroupedNativeSelectTemplate = ({ groups, ...args }) => (
  <NativeSelect {...args}>
    {groups.map((group, i) => (
      <NativeSelectOptionGroup {...group} key={`group-${i}`}>
        {group.options.map((option, i) => (
          <NativeSelectOption {...option} key={`option-${i}`} />
        ))}
      </NativeSelectOptionGroup>
    ))}
  </NativeSelect>
)

export const SimpleNativeSelect = NativeSelectTemplate.bind({})
SimpleNativeSelect.args = {
  name: "Simple-Select",
  options: [
    DefaultSelectOption.args,
    DefaultSelectOption.args,
    DisabledSelectOption.args,
  ],
}

export const DisabledSimpleNativeSelect = NativeSelectTemplate.bind({})
DisabledSimpleNativeSelect.args = {
  name: "Disabled-Simple-Select",
  options: [
    DefaultSelectOption.args,
    DefaultSelectOption.args,
    DisabledSelectOption.args,
  ],
  disabled: true,
}

export const InvalidNativeSelect = NativeSelectTemplate.bind({})
InvalidNativeSelect.args = {
  invalid: true,
  options: [DefaultSelectOption.args, DisabledSelectOption.args],
}

export const ValidNativeSelect = NativeSelectTemplate.bind({})
ValidNativeSelect.args = {
  valid: true,
  options: [DefaultSelectOption.args, DisabledSelectOption.args],
}

export const GroupedNativeSelect = GroupedNativeSelectTemplate.bind({})
GroupedNativeSelect.args = {
  name: "Grouped-Select",
  groups: [
    {
      label: "My option group",
      options: [DefaultSelectOption.args, DisabledSelectOption.args],
    },
    {
      label: "My other option group",
      options: [DefaultSelectOption.args],
    },
  ],
}

export const LoadingNativeSelect = NativeSelectTemplate.bind({})
LoadingNativeSelect.args = {
  name: "Loading Select",
  options: [],
  loading: true,
}

export const NativeSelectWithError = NativeSelectTemplate.bind({})
NativeSelectWithError.args = {
  name: "Select with Error",
  options: [],
  error: true,
}
