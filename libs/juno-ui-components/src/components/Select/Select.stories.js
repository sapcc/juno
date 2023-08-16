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


export const Default = Template.bind({})
Default.args = {
  children: [
    <SelectOption value="Option 1" />,
    <SelectOption value="Option 2" />,
    <SelectOption value="Option 3" />
  ]
}

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
  children: [
    
  ]
}