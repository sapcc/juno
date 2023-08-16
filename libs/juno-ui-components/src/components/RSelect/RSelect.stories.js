import React, { useState, useEffect } from "react"
import { RSelect } from "./index.js"
import { RSelectOption } from "../RSelectOption/index.js"
import { RSelectOptionGroup } from "../RSelectOptionGroup/index.js"
import { SelectDivider } from "../SelectDivider/index.js"
import { PortalProvider } from "../PortalProvider/PortalProvider.component.js"


export default {
  title: "Forms/RSelect/RSelect",
  component: RSelect,
  argTypes: {},
  decorators: [
    (story) => (
      <PortalProvider>
        {story()}
      </PortalProvider>
    ),
  ],
}

const Template = ({children, ...args}) => {
  return (
    <RSelect {...args}>
      { children }
    </RSelect>
  )
}

const ControlledTemplate = ({open, value, children, ...args}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [val, setVal] = useState(undefined)
  
  useEffect(() => {
    setIsOpen(open)
  }, [open])
  
  useEffect(() => {
    setVal(value)
  }, [value])
  
  return (
    <RSelect value={val} open={isOpen} onOpenChange={ () => {} } onValueChange={ () => {} } {...args} >
      { children }
    </RSelect>
  )
  
}

const ConstrainedWidthTemplate = ({children, ...args}) => {
  return (
    <div style={ {width: "300px"} }>
      <RSelect {...args}>
        { children }
      </RSelect>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <RSelectOption value="val-1" key="1">Option 1</RSelectOption>,
    <RSelectOption value="val-2" key="2">Option 2</RSelectOption>,
    <RSelectOption value="val-3" key="3">Option 3</RSelectOption>
  ]
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Select an Option",
  children: [
    <RSelectOption value="val-1" key="1">Option 1</RSelectOption>,
    <RSelectOption value="val-2" key="2">Option 2</RSelectOption>,
    <RSelectOption value="val-3" key="3">Option 3</RSelectOption>
  ]
}

export const RequiredWithLabel = Template.bind({})
RequiredWithLabel.args = {
  label: "Selecting an Option is Required",
  required: true,
  children: [
    <RSelectOption value="val-1" key="1">Option 1</RSelectOption>,
    <RSelectOption value="val-2" key="2">Option 2</RSelectOption>,
    <RSelectOption value="val-3" key="3">Option 3</RSelectOption>
  ]
}

export const WithGroupAndDividers = Template.bind({})
WithGroupAndDividers.parameters = {
  docs: {
    description: {
      story: "Use `SelectGroup` and `SelectDivider` to structure Select menu content."
    }
  }
}
WithGroupAndDividers.args = {
  children: [
    <RSelectOptionGroup label="Group 1" key="1">
      <RSelectOption value="1-1" key="1-1">Group 1 Value 1</RSelectOption>
      <RSelectOption value="1-2" key="1-2">Group 1 Value 2</RSelectOption>
    </RSelectOptionGroup>,
    <SelectDivider key="2"/>,
    <RSelectOptionGroup label="Group 2" key="3">
      <RSelectOption value="2-1" key="2-1">Group 2 Value 1</RSelectOption>
      <RSelectOption value="2-2" key="2-2">Group 2 Value 2</RSelectOption>
    </RSelectOptionGroup>,
  ]
}

export const UncontrolledWithValueSet = Template.bind({})
UncontrolledWithValueSet.args = {
  defaultValue: "2",
  children: [
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  placeholder: "Controlled Select",
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const ControlledWithValueSet = Template.bind({})
ControlledWithValueSet.args = {
  value: "2",
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const NonPopperPosition = Template.bind({})
NonPopperPosition.parameters = {
  docs: {
    description: {
      story: "Use `position='align-items'` to show the menu overlaying the Select trigger."
    }
  }
}
NonPopperPosition.args = {
  placeholder: "Non-popper aligned Select…",
  position: "align-items",
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const ManyOptions = Template.bind({})
ManyOptions.parameters = {
  docs: {
    description: {
      story: "Use `position='align-items'` to show the menu overlaying the Select trigger."
    }
  }
}
ManyOptions.args = {
  placeholder: "Select with many options…",
  position: "align-items",
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>,
    <RSelectOption value="4" key="4">Value 4</RSelectOption>,
    <RSelectOption value="5" key="5">Value 5</RSelectOption>,
    <RSelectOption value="6" key="6">Value 6</RSelectOption>,
    <RSelectOption value="7" key="7">Value 7</RSelectOption>,
    <RSelectOption value="8" key="8">Value 8</RSelectOption>,
    <RSelectOption value="9" key="9">Value 9</RSelectOption>,
    <RSelectOption value="10" key="10">Value 10</RSelectOption>,
    <RSelectOption value="11" key="11">Value 11</RSelectOption>,
    <RSelectOption value="12" key="12">Value 12</RSelectOption>,
    <RSelectOption value="13" key="13">Value 13</RSelectOption>,
    <RSelectOption value="14" key="14">Value 14</RSelectOption>,
    <RSelectOption value="15" key="15">Value 15</RSelectOption>,
    <RSelectOption value="16" key="16">Value 16</RSelectOption>,
    <RSelectOption value="17" key="17">Value 17</RSelectOption>,
    <RSelectOption value="18" key="18">Value 18</RSelectOption>,
    <RSelectOption value="19" key="19">Value 19</RSelectOption>,
    <RSelectOption value="20" key="20">Value 20</RSelectOption>,
    <RSelectOption value="21" key="21">Value 21</RSelectOption>,
  ]
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const Error = Template.bind({})
Error.args = {
  error: true,
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const SubduedSelect = Template.bind({})
SubduedSelect.args = {
  variant: "subdued",
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const PrimarySelect = Template.bind({})
PrimarySelect.args = {
  variant: "primary",
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const PrimaryDangerSelect = Template.bind({})
PrimaryDangerSelect.args = {
  variant: "primary-danger",
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const TruncatedOptions = ConstrainedWidthTemplate.bind({})
TruncatedOptions.args = {
  truncateOptions: true,
  children: [
    <RSelectOption value="1" key="1">Option with a very long title that will most likely not fit into the menu width</RSelectOption>,
    <RSelectOption value="2" key="2">Another option with a very long title that will most likely not fit into the menu width</RSelectOption>,
    <RSelectOption value="3" key="3">Yet another option with a very long title that will most likely not fit into the menu width</RSelectOption>
  ]
}

export const NonTruncatedOptions = ConstrainedWidthTemplate.bind({})
NonTruncatedOptions.args = {
  children: [
    <RSelectOption value="1" key="1">Option with a very long title that will most likely not fit into the menu width</RSelectOption>,
    <RSelectOption value="2" key="2">Another option with a very long title that will most likely not fit into the menu width</RSelectOption>,
    <RSelectOption value="3" key="3">Yet another option with a very long title that will most likely not fit into the menu width</RSelectOption>
  ]
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  helptext: "This is an explanatory text referring to the input",
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const WithHelpTextAsNode = Template.bind({})
WithHelpTextAsNode.args = {
  helptext: <>This is a helptext with a <a href="#">Link</a></>,
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const WithSuccessText = Template.bind({})
WithSuccessText.args = {
  successtext: "This field is a great success!",
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  errortext: "This field has an error",
  children: [
    <RSelectOption value="1" key="1">Value 1</RSelectOption>,
    <RSelectOption value="2" key="2">Value 2</RSelectOption>,
    <RSelectOption value="3" key="3">Value 3</RSelectOption>
  ]
}