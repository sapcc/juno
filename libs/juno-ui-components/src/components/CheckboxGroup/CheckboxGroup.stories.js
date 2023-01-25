import React from "react"
import { CheckboxGroup } from "./index.js"
import { CheckboxRow } from "../CheckboxRow/index.js"
// import CheckboxRow stories:
import { Default as CheckboxRowStory } from "../CheckboxRow/CheckboxRow.stories"

export default {
  title: "Forms/Checkbox/CheckboxGroup",
  component: CheckboxGroup,
  argTypes: {
    items: {
      table: {
        disable: true
      }
    }
  }
}

const Template = ({ items, ...args }) => (
  <CheckboxGroup {...args}>
    {items.map((item, i) => (
      <CheckboxRow {...item} key={`${i}`} />
    ))}
  </CheckboxGroup>
)

export const Default = Template.bind({})
Default.args = {
  name: "Default CheckboxGroup",
  items: [
    { ...CheckboxRowStory.args, value: "val-1", id: "checkbox-1" },
    { ...CheckboxRowStory.args, value: "val-2", id: "checkbox-2" },
    { ...CheckboxRowStory.args, value: "val-3", id: "checkbox-3" },
  ],
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  name: "Labelled ChechboxGroup",
  label: "A Labelled CheckboxGroup",
  items: [
    { ...CheckboxRowStory.args, value: "val-l-1", id: "checkbox-l-4" },
    { ...CheckboxRowStory.args, value: "val-l-2", id: "checkbox-l-5" },
    { ...CheckboxRowStory.args, value: "val-l-3", id: "checkbox-l-6" },
  ],
}

export const Required = Template.bind({})
Required.args = {
  name: "Required Labelled ChechboxGroup",
  label: "A Required, Labelled CheckboxGroup",
  required: true,
  items: [
    { ...CheckboxRowStory.args, value: "val-r-1", id: "checkbox-r-4" },
    { ...CheckboxRowStory.args, value: "val-r-2", id: "checkbox-r-5" },
    { ...CheckboxRowStory.args, value: "val-r-3", id: "checkbox-r-6" },
  ],
}

export const ValidCheckboxGroup = Template.bind({})
ValidCheckboxGroup.args = {
  name: "valid-checkbox-group",
  label: "A valid CheckboxGroup",
  valid: true,
  items: [
    { ...CheckboxRowStory.args, value: "val-r-1", id: "checkbox-r-4" },
    { ...CheckboxRowStory.args, value: "val-r-2", id: "checkbox-r-5" },
    { ...CheckboxRowStory.args, value: "val-r-3", id: "checkbox-r-6" },
  ],
}

export const CheckboxGroupWithSuccess = Template.bind({})
CheckboxGroupWithSuccess.args = {
  name: "checkbox-group-with-success",
  label: "A CheckboxGroup with successful validation",
  successtext: "This group is valid.",
  items: [
    { ...CheckboxRowStory.args, value: "val-r-1", id: "checkbox-r-4" },
    { ...CheckboxRowStory.args, value: "val-r-2", id: "checkbox-r-5" },
    { ...CheckboxRowStory.args, value: "val-r-3", id: "checkbox-r-6" },
  ],
}

export const InvalidCheckboxGroup = Template.bind({})
InvalidCheckboxGroup.args = {
  name: "invalid-checkbox-group",
  label: "An invalid CheckboxGroup",
  invalid: true,
  items: [
    { ...CheckboxRowStory.args, value: "val-r-1", id: "checkbox-r-4" },
    { ...CheckboxRowStory.args, value: "val-r-2", id: "checkbox-r-5" },
    { ...CheckboxRowStory.args, value: "val-r-3", id: "checkbox-r-6" },
  ],
}

export const CheckboxGroupWithError = Template.bind({})
CheckboxGroupWithError.args = {
  name: "checkbox-group-with-error",
  label: "A CheckboxGroup with an Error",
  errortext: "THis group has an error.",
  items: [
    { ...CheckboxRowStory.args, value: "val-r-1", id: "checkbox-r-4" },
    { ...CheckboxRowStory.args, value: "val-r-2", id: "checkbox-r-5" },
    { ...CheckboxRowStory.args, value: "val-r-3", id: "checkbox-r-6" },
  ],
}