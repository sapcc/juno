import React from "react"
import { SelectRow } from "./index.js"
import { SelectOption } from "../SelectOption/"
import { Default as DefaultSelectOptionStory } from "../SelectOption/SelectOption.stories"

export default {
  title: "Forms/Select/SelectRow",
  component: SelectRow,
  argTypes: {
    items: {
      table: {
        disable: true
      }
    }
  }
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
  helptext: <>Helptext with a <a href="#">Link</a></>,
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

export const WithSelectedOption = Template.bind({})
WithSelectedOption.args = {
  label: "Select Row with selected option",
  required: true,
  value: "d-2",
  items: [
    { ...DefaultSelectOptionStory.args, value: "d-1", label: "Option 1" },
    { ...DefaultSelectOptionStory.args, value: "d-2", label: "Option 2 is selected" },
    { ...DefaultSelectOptionStory.args, value: "d-3", label: "Option 3" },
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

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
  label: "Invalid SelectRow",
  items: [
    { ...DefaultSelectOptionStory.args, value: "d-1", label: "Option 1" },
    { ...DefaultSelectOptionStory.args, value: "d-2", label: "Option 2" },
  ],
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  label: "Select Row with Error Text",
  helptext: "Oh so helpful helptext",
  errortext: "When passed an errortext prop, the SelectRow will be set to invalid automatically.",
  items: [
    { ...DefaultSelectOptionStory.args, value: "d-1", label: "Option 1" },
    { ...DefaultSelectOptionStory.args, value: "d-2", label: "Option 2" },
  ],
}
WithErrorText.parameters = {
  docs: {
    description: {
      story:
        "Passing an `errortext` prop to the SelectRow component will automatically invalidate it, so there is no need to explicitly set `invalid` as well.",
    },
  },
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
  label: "Valid SelectRow",
  items: [
    { ...DefaultSelectOptionStory.args, value: "d-1", label: "Option 1" },
    { ...DefaultSelectOptionStory.args, value: "d-2", label: "Option 2" },
  ],
}

export const WithSuccessText = Template.bind({})
WithSuccessText.args = {
  label: "Select Row with Error Text",
  successtext: "When passed an successtext prop, the SelectRow will be set to valid automatically.",
  items: [
    { ...DefaultSelectOptionStory.args, value: "d-1", label: "Option 1" },
    { ...DefaultSelectOptionStory.args, value: "d-2", label: "Option 2" },
  ],
}
WithSuccessText.parameters = {
  docs: {
    description: {
      story:
        "Passing a `successtext` prop to the SelectRow component will automatically validate it, so there is no need to explicitly set `valid` as well.",
    },
  },
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  label: "Loading options…",
  items: []
}
Loading.parameters = {
  docs: {
    description: {
      story:
        "Set a SelectRow to `loading` when a Select is busy loading the optiins to display",
    },
  },
}

export const Error = Template.bind({})
Error.args = {
  error: true,
  label: "Loading options failed",
  items: [],
}
Error.parameters = {
  docs: {
    description: {
      story:
        "Set a SelectRow to `error` when a loading options, e.g. from a remote API, failed. When the Select has been negatively validated, use `invalid` instead.",
    },
  },
}
