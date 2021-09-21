import React from "react"
import { GridRow } from "./index.js"
import { GridColumn } from "../GridColumn/index.js"

import { Default as DefaultGridColumn} from "../GridColumn/GridColumn.stories"

export default {
  title: "Design System/Grid/GridRow",
  component: GridRow,
  argTypes: {},
}

const Template = ({columns, ...args}) => (
  <GridRow {...args} >
    {columns.map((column) => 
      <GridColumn {...column} />
    )}
  </GridRow>
)

export const Default = Template.bind({})
Default.args = {
  columns: [
    DefaultGridColumn.args,
    DefaultGridColumn.args,
    DefaultGridColumn.args,
    DefaultGridColumn.args,
    DefaultGridColumn.args,
    DefaultGridColumn.args,
    DefaultGridColumn.args,
    DefaultGridColumn.args,
    DefaultGridColumn.args,
    DefaultGridColumn.args,
    DefaultGridColumn.args,
    DefaultGridColumn.args
  ]
}