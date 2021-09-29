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

