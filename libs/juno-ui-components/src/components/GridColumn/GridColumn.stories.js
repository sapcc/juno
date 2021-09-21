import React from "react"
import { GridColumn } from "./index.js"

export default {
  title: "Design System/Grid/GridColumn",
  component: GridColumn,
  argTypes: {},
}

const Template = (args) => (
  <GridColumn {...args} className="bg-juno-blue-3">
  </GridColumn>
)

export const Default = Template.bind({})
Default.args = {
  children: "Column"
}

export const Col1 = Template.bind({})
Col1.args = {
  col: 1,
  children: "Column-1"
}

export const Col2 = Template.bind({})
Col2.args = {
  col: 2,
  children: "Column-2"
}

export const Col3 = Template.bind({})
Col3.args = {
  col: 3,
  children: "Column-3"
}

export const Col4 = Template.bind({})
Col4.args = {
  col: 4,
  children: "Column-4"
}

export const Col5 = Template.bind({})
Col5.args = {
  col: 5,
  children: "Column-5"
}

export const Col6 = Template.bind({})
Col6.args = {
  col: 6,
  children: "Column-6"
}

export const Col7 = Template.bind({})
Col7.args = {
  col: 7,
  children: "Column-7"
}

export const Col8 = Template.bind({})
Col8.args = {
  col: 8,
  children: "Column-8"
}

export const Col9 = Template.bind({})
Col9.args = {
  col: 9,
  children: "Column-9"
}

export const Col10 = Template.bind({})
Col10.args = {
  col: 10,
  children: "Column-10"
}

export const Col11 = Template.bind({})
Col11.args = {
  col: 11,
  children: "Column-11"
}

export const Col12 = Template.bind({})
Col12.args = {
  col: 12,
  children: "Column-12"
}