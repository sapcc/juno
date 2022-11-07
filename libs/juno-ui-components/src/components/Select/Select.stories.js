import React from "react"
import { Select } from "./index.js"
import { SelectOption } from "../SelectOption/index.js"
import { SelectOptionGroup } from "../SelectOptionGroup/index.js"

import {
  Default as DefaultSelectOption,
  Disabled as DisabledSelectOption,
} from "../SelectOption/SelectOption.stories"
import {
  Default as DefaultSelectOptionGroup,
  Disabled as DisabledSelectOptionGroup,
} from "../SelectOptionGroup/SelectOptionGroup.stories"

export default {
  title: "Forms/Base Elements/Select",
  component: Select,
  argTypes: {},
}

const SelectTemplate = ({ options, ...args }) => (
  <Select {...args}>
    {options.map((option, i) => (
      <SelectOption {...option} key={`option-${i}`} />
    ))}
  </Select>
)

const GroupedSelectTemplate = ({ groups, ...args }) => (
  <Select {...args}>
    {groups.map((group, i) => (
      <SelectOptionGroup {...group} key={`group-${i}`}>
        {group.options.map((option, i) => (
          <SelectOption {...option} key={`option-${i}`} />
        ))}
      </SelectOptionGroup>
    ))}
  </Select>
)

export const SimpleSelect = SelectTemplate.bind({})
SimpleSelect.args = {
  name: "Simple-Select",
  options: [DefaultSelectOption.args, DisabledSelectOption.args],
}

export const DisabledSimpleSelect = SelectTemplate.bind({})
DisabledSimpleSelect.args = {
  name: "Disabled-Simple-Select",
  options: [DefaultSelectOption.args, DisabledSelectOption.args],
  disabled: true,
}

export const InvalidSelect = SelectTemplate.bind({})
InvalidSelect.args = {
  invalid: true, 
  options: [DefaultSelectOption.args, DisabledSelectOption.args],
}

export const ValidSelect = SelectTemplate.bind({})
ValidSelect.args = {
  valid: true,
  options: [DefaultSelectOption.args, DisabledSelectOption.args],
}

export const GroupedSelect = GroupedSelectTemplate.bind({})
GroupedSelect.args = {
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

export const LoadingSelect = SelectTemplate.bind({})
LoadingSelect.args = {
  name: "Loading Select",
  options: [],
  loading: true,
}