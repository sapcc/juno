import React from "react"
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

export const Default = Template.bind({})
Default.args = {
  children: [
      <SelectOption value="1">1</SelectOption>,
      <SelectOption value="2">2</SelectOption>,
      <SelectOption value="3">3</SelectOption>
    ]
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  children: [
    <SelectOption value="1">1</SelectOption>,
    <SelectOption value="2">2</SelectOption>,
    <SelectOption value="3">3</SelectOption>
  ]
}

export const Error = Template.bind({})
Error.args = {
  error: true,
  children: [
    <SelectOption value="1">1</SelectOption>,
    <SelectOption value="2">2</SelectOption>,
    <SelectOption value="3">3</SelectOption>
  ]
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
  children: [
    <SelectOption value="1">1</SelectOption>,
    <SelectOption value="2">2</SelectOption>,
    <SelectOption value="3">3</SelectOption>
  ]
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
  children: [
    <SelectOption value="1">1</SelectOption>,
    <SelectOption value="2">2</SelectOption>,
    <SelectOption value="3">3</SelectOption>
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: [
    <SelectOption value="1">1</SelectOption>,
    <SelectOption value="2">2</SelectOption>,
    <SelectOption value="3">3</SelectOption>
  ]
}

export const Popper = Template.bind({})
Popper.args = {
  position: "popper",
  children: [
      <SelectOption value="1">1</SelectOption>,
      <SelectOption value="2">2</SelectOption>,
      <SelectOption value="3">3</SelectOption>
    ]
}