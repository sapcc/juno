import React, { useState, useEffect } from "react"
import { Select } from "./index.js"
import { SelectOption } from "../SelectOption/index.js"
import { Default as SelectOptionDefaultStory } from "../SelectOption/SelectOption.stories.js"


export default {
  title: "Forms/Base Elements/Select",
  component: Select,
  argTypes: {},
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
    <Select value={val} open={isOpen} onOpenChange={ () => {} } {...args} >
      { children }
    </Select>
  )
  
}

export const Default = Template.bind({})
Default.args = {
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
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
