import React from 'react'
import { Datepicker } from './index.js'

export default {
  title: "WIP/Datepicker/Datepicker",
  component: Datepicker,
  argTypes: {}
}

const Template = ({...args}) => (
  <Datepicker {...args} /> 
)

export const Default = Template.bind({})
Default.args = {}