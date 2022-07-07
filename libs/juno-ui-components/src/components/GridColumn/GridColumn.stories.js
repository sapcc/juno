import React from "react"
import { GridColumn } from "./index.js"

export default {
  title: "Layout/Grid/GridColumn",
  component: GridColumn,
  argTypes: {},
}

const Template = (args) => (
  <GridColumn
    {...args}
    className={args.className || "jn-bg-juno-blue-3 jn-text-juno-grey-blue"}
  ></GridColumn>
)

export const Default = Template.bind({})
Default.args = {
  children: "Column",
}

export const AutoColumn = Template.bind({})
AutoColumn.args = {
  auto: true,
  children: "Auto Column",
}

export const WidthColumn = Template.bind({})
WidthColumn.args = {
  width: 50,
  children: "Column 50%",
}
