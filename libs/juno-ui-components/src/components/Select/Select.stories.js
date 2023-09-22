import React, { useState, useEffect } from "react"
import { Select } from "./index.js"
import { SelectOption } from "../SelectOption/index.js"
import { SelectOptionGroup } from "../SelectOptionGroup/index.js"
import { SelectDivider } from "../SelectDivider/index.js"
import { Default as SelectOptionDefaultStory } from "../SelectOption/SelectOption.stories.js"
import { PortalProvider } from "../PortalProvider/PortalProvider.component.js"


export default {
  title: "Forms/Select/Select",
  component: Select,
  argTypes: {
    errortext: {
      control: false
    },
    helptext: {
      control: false
    },
    successtext: {
      control: false
    },
    children: {
      control: false
    },
  },
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
    <Select {...args}>
      { children }
    </Select>
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
    <Select value={val} open={isOpen} onOpenChange={ () => {} } onValueChange={ () => {} } {...args} >
      { children }
    </Select>
  )
  
}

const ConstrainedWidthTemplate = ({children, ...args}) => {
  return (
    <div style={ {width: "300px"} }>
      <Select {...args}>
        { children }
      </Select>
    </div>
  )
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <SelectOption value="val-1" key="1">Option 1</SelectOption>,
    <SelectOption value="val-2" key="2">Option 2</SelectOption>,
    <SelectOption value="val-3" key="3">Option 3</SelectOption>
  ]
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Select an Option",
  children: [
    <SelectOption value="val-1" key="1">Option 1</SelectOption>,
    <SelectOption value="val-2" key="2">Option 2</SelectOption>,
    <SelectOption value="val-3" key="3">Option 3</SelectOption>
  ]
}

export const RequiredWithLabel = Template.bind({})
RequiredWithLabel.args = {
  label: "Selecting an Option is Required",
  required: true,
  children: [
    <SelectOption value="val-1" key="1">Option 1</SelectOption>,
    <SelectOption value="val-2" key="2">Option 2</SelectOption>,
    <SelectOption value="val-3" key="3">Option 3</SelectOption>
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
    <SelectOptionGroup label="Group 1" key="1">
      <SelectOption value="1-1" key="1-1">Group 1 Value 1</SelectOption>
      <SelectOption value="1-2" key="1-2">Group 1 Value 2</SelectOption>
    </SelectOptionGroup>,
    <SelectDivider key="2"/>,
    <SelectOptionGroup label="Group 2" key="3">
      <SelectOption value="2-1" key="2-1">Group 2 Value 1</SelectOption>
      <SelectOption value="2-2" key="2-2">Group 2 Value 2</SelectOption>
    </SelectOptionGroup>,
  ]
}

export const UncontrolledWithValueSet = Template.bind({})
UncontrolledWithValueSet.args = {
  defaultValue: "2",
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  placeholder: "Controlled Select",
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const ControlledWithValueSet = Template.bind({})
ControlledWithValueSet.args = {
  value: "2",
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
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
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
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
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>,
    <SelectOption value="4" key="4">Value 4</SelectOption>,
    <SelectOption value="5" key="5">Value 5</SelectOption>,
    <SelectOption value="6" key="6">Value 6</SelectOption>,
    <SelectOption value="7" key="7">Value 7</SelectOption>,
    <SelectOption value="8" key="8">Value 8</SelectOption>,
    <SelectOption value="9" key="9">Value 9</SelectOption>,
    <SelectOption value="10" key="10">Value 10</SelectOption>,
    <SelectOption value="11" key="11">Value 11</SelectOption>,
    <SelectOption value="12" key="12">Value 12</SelectOption>,
    <SelectOption value="13" key="13">Value 13</SelectOption>,
    <SelectOption value="14" key="14">Value 14</SelectOption>,
    <SelectOption value="15" key="15">Value 15</SelectOption>,
    <SelectOption value="16" key="16">Value 16</SelectOption>,
    <SelectOption value="17" key="17">Value 17</SelectOption>,
    <SelectOption value="18" key="18">Value 18</SelectOption>,
    <SelectOption value="19" key="19">Value 19</SelectOption>,
    <SelectOption value="20" key="20">Value 20</SelectOption>,
    <SelectOption value="21" key="21">Value 21</SelectOption>,
  ]
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const Error = Template.bind({})
Error.args = {
  error: true,
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const SubduedSelect = Template.bind({})
SubduedSelect.args = {
  variant: "subdued",
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const PrimarySelect = Template.bind({})
PrimarySelect.args = {
  variant: "primary",
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const PrimaryDangerSelect = Template.bind({})
PrimaryDangerSelect.args = {
  variant: "primary-danger",
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const TruncatedOptions = ConstrainedWidthTemplate.bind({})
TruncatedOptions.args = {
  truncateOptions: true,
  children: [
    <SelectOption value="1" key="1">Option with a very long title that will most likely not fit into the menu width</SelectOption>,
    <SelectOption value="2" key="2">Another option with a very long title that will most likely not fit into the menu width</SelectOption>,
    <SelectOption value="3" key="3">Yet another option with a very long title that will most likely not fit into the menu width</SelectOption>
  ]
}

export const NonTruncatedOptions = ConstrainedWidthTemplate.bind({})
NonTruncatedOptions.args = {
  children: [
    <SelectOption value="1" key="1">Option with a very long title that will most likely not fit into the menu width</SelectOption>,
    <SelectOption value="2" key="2">Another option with a very long title that will most likely not fit into the menu width</SelectOption>,
    <SelectOption value="3" key="3">Yet another option with a very long title that will most likely not fit into the menu width</SelectOption>
  ]
}

export const WithHelpText = Template.bind({})
WithHelpText.args = {
  helptext: "This is an explanatory text referring to the input",
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const WithHelpTextAsNode = Template.bind({})
WithHelpTextAsNode.args = {
  helptext: <>This is a helptext with a <a href="#">Link</a></>,
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const WithSuccessText = Template.bind({})
WithSuccessText.args = {
  successtext: "This field is a great success!",
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}

export const WithErrorText = Template.bind({})
WithErrorText.args = {
  errortext: "This field has an error",
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
  ]
}