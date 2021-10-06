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

export const AutoColumn = Template.bind({})
AutoColumn.args = {
  auto: true,
  children: "Auto Column"
}

export const WidthColumn = Template.bind({})
WidthColumn.args = {
  width: "50",
  children: "Column 50%"
}



