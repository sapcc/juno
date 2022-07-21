import React from "react"
import { SelectRow } from "./index.js"
import { SelectOption } from "../SelectOption/"
import { Default as DefaultSelectOptionStory } from "../SelectOption/SelectOption.stories"

export default {
  title: "Forms/Select/SelectRow",
  component: SelectRow,
  argTypes: {},
}

const Template = ({ items, ...args }) => (
  <SelectRow {...args}>
    {items.map((item, i) => (
      <SelectOption {...item} key={`${i}`} />
    ))}
  </SelectRow>
)

export const Default = Template.bind({})
Default.args = {
  label: "Select Row",
  items: [
    { ...DefaultSelectOptionStory.args, value: "d-1", label: "Option 1" },
    { ...DefaultSelectOptionStory.args, value: "d-2", label: "Option 2" },
  ],
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  label: "Select Row with Helptext",
  helptext: "Select one",
  items: [
    { ...DefaultSelectOptionStory.args, value: "d-1", label: "Option 1" },
    { ...DefaultSelectOptionStory.args, value: "d-2", label: "Option 2" },
  ],
}

export const WithHelpTextWithLink = Template.bind({})
WithHelpTextWithLink.args = {
  label: "Select Row with Helptext",
  helptext: <>Helptext with a <a href="#">Link</></>,
  items: [
    { ...DefaultSelectOptionStory.args, value: "d-1", label: "Option 1" },
    { ...DefaultSelectOptionStory.args, value: "d-2", label: "Option 2" },
  ],
}

export const Required = Template.bind({})
Required.args = {
  label: "Required Select Row",
  required: true,
  items: [
    { ...DefaultSelectOptionStory.args, value: "d-1", label: "Option 1" },
    { ...DefaultSelectOptionStory.args, value: "d-2", label: "Option 2" },
  ],
}

export const Disabled = Template.bind({})
Disabled.args = {
  label: "Required Select Row",
  disabled: true,
  items: [
    { ...DefaultSelectOptionStory.args, value: "d-1", label: "Option 1" },
    { ...DefaultSelectOptionStory.args, value: "d-2", label: "Option 2" },
  ],
}
