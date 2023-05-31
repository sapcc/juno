import React from "react"
import { RadioGroup } from "./index.js"
import { Radio } from "../Radio/"


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

const Template = ({ children, ...args }) => (
  <RadioGroup {...args}>
    { children }
  </RadioGroup>
)

export const Default = Template.bind({})
Default.args = {
  name: "default-radiogroup",
  selected: "default-1",
  children: [
    <Radio id="default-1" value="default-1" label="Option 1" />,
    <Radio id="default-2" value="default-2" label="Option 2" />,
    <Radio id="default-3" value="default-3" label="Option 3" />
  ],
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  name: "labelled-radiogroup",
  selected: "labelled-1",
  label: "Labelled RadioGroup",
  children: [
    <Radio id="labelled-1" value="labelled-1" label="Option 1"/>,
    <Radio id="labelled-2" value="labelled-2" label="Option 2"/>,
    <Radio id="labelled-3" value="labelled-3" label="Option 3"/>
  ],
}

export const Required = Template.bind({})
Required.args = {
  name: "required-radiogroup",
  selected: "required-1",
  label: "Required RadioGroup",
  required: true,
  children: [
    <Radio id="required-1" value="required-1" label="Option 1"/>,
    <Radio id="required-2" value="required-2" label="Option 2"/>,
    <Radio id="required-3" value="required-3" label="Option 3"/>
  ],
}

export const Disabled = Template.bind({})
Disabled.args = {
  name: "disabled-radiogroup",
  selected: "disabled-1",
  label: "Disabled RadioGroup",
  disabled: true,
  children: [
    <Radio id="disabled-1" value="disabled-1" label="Option 1"/>,
    <Radio id="disabled-2" value="disabled-2" label="Option 2"/>,
    <Radio id="disabled-3" value="disabled-3" label="Option 3"/>
  ],
}

export const Valid = Template.bind({})
Valid.args = {
  name: "valid-radiogroup",
  selected: "",
  label: "Valid RadioGroup",
  valid: true,
  children: [
    <Radio id="valid-1" value="valid-1" label="Option 1"/>,
    <Radio id="valid-2" value="valid-2" label="Option 2"/>,
    <Radio id="valid-3" value="valid-3" label="Option 3"/>
  ],
}

export const Invalid = Template.bind({})
Invalid.args = {
  name: "invalid-radiogroup",
  selected: "",
  label: "Invalid RadioGroup",
  invalid: true,
  children: [
    <Radio id="invalid-1" value="invalid-1" label="Option 1"/>,
    <Radio id="invalid-2" value="invalid-2" label="Option 2"/>,
    <Radio id="invalid-3" value="invalid-3" label="Option 3"/>
  ],
}

export const WithHelptext = Template.bind({})
WithHelptext.args = {
  name: "with-helptext",
  selected: "",
  label: "A RadioGroup",
  helptext: "Some additional explanation goes here",
  children: [
    <Radio id="invalid-1" value="invalid-1" label="Option 1"/>,
    <Radio id="invalid-2" value="invalid-2" label="Option 2"/>,
    <Radio id="invalid-3" value="invalid-3" label="Option 3"/>
  ],
}

export const WithHelptextAsNode = Template.bind({})
WithHelptextAsNode.args = {
  name: "with-helptext-as-node",
  selected: "",
  label: "A RadioGroup",
  helptext: <>This is a helptext with a <a href="#">Link</a></>,
  children: [
    <Radio id="invalid-1" value="invalid-1" label="Option 1"/>,
    <Radio id="invalid-2" value="invalid-2" label="Option 2"/>,
    <Radio id="invalid-3" value="invalid-3" label="Option 3"/>
  ],
}

export const WithSuccess = Template.bind({})
WithSuccess.args = {
  name: "success-radiogroup",
  selected: "success-1",
  successtext: "A RadioGroup with successful validation",
  label: "RadioGroup with success",
  children: [
    <Radio id="success-1" value="success-1" label="Option 1"/>,
    <Radio id="success-2" value="success-2" label="Option 2"/>,
    <Radio id="success-3" value="success-3" label="Option 3"/>
  ],
}

export const WithError = Template.bind({})
WithError.args = {
  name: "error-radiogroup",
  selected: "error-1",
  errortext: "A RadioGroup with failed validation",
  label: "RadioGroup with error",
  children: [
    <Radio id="error-1" value="error-1" label="Option 1"/>,
    <Radio id="error-2" value="error-2" label="Option 2"/>,
    <Radio id="error-3" value="error-3" label="Option 3"/>
  ],
}
