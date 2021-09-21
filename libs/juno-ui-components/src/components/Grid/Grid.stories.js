import React from "react"
import { Grid } from "./index.js"
import { Default as GridRow } from "../GridRow/GridRow.stories"
import { Default as GridColumn } from "../GridColumn/GridColumn.stories"


export default {
  title: "Design System/Grid/Grid",
  component: Grid,
  argTypes: {},
}

const Template = ({ rows, ...args}) =>
<Grid {...args}>
  {rows.map((row) => (
    <GridRow {...row}>
      {row.columns.map((column) => (
        <GridColumn {...column} />
      ))}
    </GridRow>
  ))}
</Grid>

export const Default = Template.bind({})
Default.args = {
  rows: [
    {
      columns: [GridColumn.args, GridColumn.args]
    },
    {
      columns: [GridColumn.args, GridColumn.args]
    }
  ]
}
