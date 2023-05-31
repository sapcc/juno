import React from "react"
import { CheckboxGroup } from "./index.js"
import { CheckboxRow } from "../CheckboxRow/index.js"
import { Checkbox } from "../Checkbox/index.js"


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

const Template = ({ children, ...args }) => (
  <CheckboxGroup {...args}>
    { children }
  </CheckboxGroup>
)

export const Default = Template.bind({})
Default.args = {
  name: "Default CheckboxGroup",
  children: [
    <Checkbox value="val-1" id="c-1" label="Option 1" key="1" />,
    <Checkbox value="val-2" id="c-2" label="Option 2" key="2" />,
    <Checkbox value="val-3" id="c-3" label="Option 3" key="3" />,
  ],
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  name: "Labelled ChechboxGroup",
  label: "A Labelled CheckboxGroup",
  children: [
    <Checkbox value="val-1" id="c-1" label="Option 1" key="1" />,
    <Checkbox value="val-2" id="c-2" label="Option 2" key="2" />,
    <Checkbox value="val-3" id="c-3" label="Option 3" key="3" />,
  ],
}

export const Required = Template.bind({})
Required.args = {
  name: "Required Labelled ChechboxGroup",
  label: "A Required, Labelled CheckboxGroup",
  required: true,
  children: [
    <Checkbox value="val-1" id="c-1" label="Option 1" key="1" />,
    <Checkbox value="val-2" id="c-2" label="Option 2" key="2" />,
    <Checkbox value="val-3" id="c-3" label="Option 3" key="3" />,
  ],
}

export const ValidCheckboxGroup = Template.bind({})
ValidCheckboxGroup.args = {
  name: "valid-checkbox-group",
  label: "A valid CheckboxGroup",
  valid: true,
  children: [
    <Checkbox value="val-1" id="c-1" label="Option 1" key="1" />,
    <Checkbox value="val-2" id="c-2" label="Option 2" key="2" />,
    <Checkbox value="val-3" id="c-3" label="Option 3" key="3" />,
  ],
}

export const WithHelptext = Template.bind({})
WithHelptext.args = {
  name: "checkbox-group-with-helptext",
  label: "A CheckboxGroup with helptext",
  helptext: "A helptext",
  children: [
    <Checkbox value="val-1" id="c-1" label="Option 1" key="1" />,
    <Checkbox value="val-2" id="c-2" label="Option 2" key="2" />,
    <Checkbox value="val-3" id="c-3" label="Option 3" key="3" />,
  ],
}

export const WithHelptextAsNode = Template.bind({})
WithHelptextAsNode.args = {
  name: "checkbox-group-with-helptext-as-node",
  label: "A CheckboxGroup with helptext as node",
  helptext: <>This is a helptext with a <a href="#">Link</a></>,
  children: [
    <Checkbox value="val-1" id="c-1" label="Option 1" key="1" />,
    <Checkbox value="val-2" id="c-2" label="Option 2" key="2" />,
    <Checkbox value="val-3" id="c-3" label="Option 3" key="3" />,
  ],
}

export const WithSuccesstext = Template.bind({})
WithSuccesstext.args = {
  name: "checkbox-group-with-success",
  label: "A CheckboxGroup with successful validation",
  successtext: "This group is valid.",
  children: [
    <Checkbox value="val-1" id="c-1" label="Option 1" key="1" />,
    <Checkbox value="val-2" id="c-2" label="Option 2" key="2" />,
    <Checkbox value="val-3" id="c-3" label="Option 3" key="3" />,
  ],
}

export const InvalidCheckboxGroup = Template.bind({})
InvalidCheckboxGroup.args = {
  name: "invalid-checkbox-group",
  label: "An invalid CheckboxGroup",
  invalid: true,
  children: [
    <Checkbox value="val-1" id="c-1" label="Option 1" key="1" />,
    <Checkbox value="val-2" id="c-2" label="Option 2" key="2" />,
    <Checkbox value="val-3" id="c-3" label="Option 3" key="3" />,
  ],
}

export const WithErrortext = Template.bind({})
WithErrortext.args = {
  name: "checkbox-group-with-error",
  label: "A CheckboxGroup with an Error",
  errortext: "This group has an error.",
  children: [
    <Checkbox value="val-1" id="c-1" label="Option 1" key="1" />,
    <Checkbox value="val-2" id="c-2" label="Option 2" key="2" />,
    <Checkbox value="val-3" id="c-3" label="Option 3" key="3" />,
  ],
}