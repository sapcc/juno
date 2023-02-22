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
    <Select value={val} {...args} >
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


export const Controlled = ControlledTemplate.bind({})
Controlled.args = {
  placeholder: "Controlled Select",
  open: true,
  children: [
    <SelectOption value="1" key="1">Value 1</SelectOption>,
    <SelectOption value="2" key="2">Value 2</SelectOption>,
    <SelectOption value="3" key="3">Value 3</SelectOption>
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
