import React from "react"
import { Grid } from "./index.js"
import { Default as GridRow } from "../GridRow/GridRow.stories"
import { Default as GridColumn } from "../GridColumn/GridColumn.stories"


export default {
  title: "Design System/Grid/Grid",
  component: Grid,
  argTypes: {},
}

const Template = (args) => (
  <Grid>

  </Grid>
)

export const Default = Template.bind({})
Default.args = {
  
}
