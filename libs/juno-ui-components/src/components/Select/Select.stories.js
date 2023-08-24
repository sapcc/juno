import React, { useState, useEffect } from "react"
import { Select } from "./index.js"
import { SelectOption } from "../SelectOption/"


export default {
  title: "Forms/Select/Select",
  component: Select,
  argTypes: {
    variant: {
      options: [ 'default', 'primary', 'primary-danger', 'subdued' ],
      control: { type: 'select' }
    }
  },

}

const Template = ({children, ...args}) => {
  return (
    <Select {...args}>
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
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithPlaceholder = Template.bind({})
WithPlaceholder.args = {
  placeholder: "Custom placeholder…",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithLabel = Template.bind({})
WithLabel.args = {
  label: "Your label here",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const RequiredWithLabel = Template.bind({})
RequiredWithLabel.args = {
  label: "Required Select",
  required: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const DisabledOption = Template.bind({})
DisabledOption.args = {
  helptext: "Option 2 is not avilable",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" disabled />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const Valid = Template.bind({})
Valid.args = {
  valid: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const Invalid = Template.bind({})
Invalid.args = {
  invalid: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithHelptext = Template.bind({})
WithHelptext.args = {
  helptext: "You may select anything, really.",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithHelptextAsNode = Template.bind({})
WithHelptextAsNode.args = {
  helptext: <>More Info <a href="#">here</a>.</>,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithErrortext = Template.bind({})
WithErrortext.args = {
  errortext: "Please rethink your selection, somethig seems fishy.",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const WithSuccesstext = Template.bind({})
WithSuccesstext.args = {
  successtext: "That seems to be a valid selection.",
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const Error = Template.bind({})
Error.args = {
  error: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const Loading = Template.bind({})
Loading.args = {
  loading: true,
  children: [
    <SelectOption key="1" value="Option 1" />,
    <SelectOption key="2" value="Option 2" />,
    <SelectOption key="3" value="Option 3" />
  ]
}

export const TruncatedOptions = ConstrainedWidthTemplate.bind({})
TruncatedOptions.args = {
  truncateOptions: true,
  children: [
    <SelectOption  
      value="Option with a very long title that will most likely not fit into the menu width" 
      key="1"
    />,
    <SelectOption 
      value="Another option with a very long title that will most likely not fit into the menu width" 
      key="2"      
    />,
    <SelectOption 
      value="Yet another option with a very long title that will most likely not fit into the menu width" 
      key="3"
    />
  ]
}
