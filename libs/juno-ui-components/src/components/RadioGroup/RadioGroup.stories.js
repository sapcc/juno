import React from "react"
import { RadioGroup } from "./index.js"
import { RadioRow } from "../RadioRow/"
import {
  Default as RadioRowStory,
  Checked as CheckedRadioRowStory,
} from "../RadioRow/RadioRow.stories"

export default {
  title: "Forms/Radio/RadioGroup",
  component: RadioGroup,
  argTypes: {
    items: {
      table: {
        disable: true
      }
    }
  }
}

const Template = ({ items, ...args }) => (
  <RadioGroup {...args}>
    {items.map((item, i) => (
      <RadioRow {...item} key={`${i}`} />
    ))}
  </RadioGroup>
)

export const Default = Template.bind({})
Default.args = {
  name: "default-radiogroup",
  selected: "v-1",
  items: [
    { ...RadioRowStory.args, label: "Option 1", value: "v-1" },
    { ...RadioRowStory.args, label: "Option 2", value: "v-2" },
    { ...RadioRowStory.args, label: "Option 3", value: "v-3" },
  ],
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  name: "labelled-radiogroup",
  selected: "v-1",
  label: "Labelled RadioGroup",
  items: [
    { ...RadioRowStory.args, label: "Option 1", value: "v-1" },
    { ...RadioRowStory.args, label: "Option 2", value: "v-2" },
    { ...RadioRowStory.args, label: "Option 3", value: "v-3" },
  ],
}

export const Required = Template.bind({})
Required.args = {
  name: "required-radiogroup",
  selected: "v-1",
  label: "Required RadioGroup",
  required: true,
  items: [
    { ...RadioRowStory.args, label: "Option 1", value: "v-1" },
    { ...RadioRowStory.args, label: "Option 2", value: "v-2" },
    { ...RadioRowStory.args, label: "Option 3", value: "v-3" },
  ],
}

export const Disabled = Template.bind({})
Disabled.args = {
  name: "disabled-radiogroup",
  selected: "v-1",
  label: "Disabled RadioGroup",
  disabled: true,
  items: [
    { ...RadioRowStory.args, label: "Option 1", value: "v-1" },
    { ...RadioRowStory.args, label: "Option 2", value: "v-2" },
    { ...RadioRowStory.args, label: "Option 3", value: "v-3" },
  ],
}

export const Valid = Template.bind({})
Valid.args = {
  name: "valid-radiogroup",
  selected: "",
  label: "Valid RadioGroup",
  valid: true,
  items: [
    { ...RadioRowStory.args, label: "Option 1", value: "v-1" },
    { ...RadioRowStory.args, label: "Option 2", value: "v-2" },
    { ...RadioRowStory.args, label: "Option 3", value: "v-3" },
  ],
}

export const WithSuccess = Template.bind({})
WithSuccess.args = {
  name: "success-radiogroup",
  selected: "v-1",
  successtext: "A RadioGroup with successful validation",
  label: "RadioGroup with success",
  items: [
    { ...RadioRowStory.args, label: "Option 1", value: "v-1" },
    { ...RadioRowStory.args, label: "Option 2", value: "v-2" },
    { ...RadioRowStory.args, label: "Option 3", value: "v-3" },
  ],
}

export const Invalid = Template.bind({})
Invalid.args = {
  name: "invalid-radiogroup",
  selected: "",
  label: "Invalid RadioGroup",
  invalid: true,
  items: [
    { ...RadioRowStory.args, label: "Option 1", value: "v-1" },
    { ...RadioRowStory.args, label: "Option 2", value: "v-2" },
    { ...RadioRowStory.args, label: "Option 3", value: "v-3" },
  ],
}

export const WithError = Template.bind({})
WithError.args = {
  name: "error-radiogroup",
  selected: "v-1",
  errortext: "A RadioGroup with failed validation",
  label: "RadioGroup with error",
  items: [
    { ...RadioRowStory.args, label: "Option 1", value: "v-1" },
    { ...RadioRowStory.args, label: "Option 2", value: "v-2" },
    { ...RadioRowStory.args, label: "Option 3", value: "v-3" },
  ],
}
