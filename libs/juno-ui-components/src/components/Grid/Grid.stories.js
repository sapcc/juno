import React from "react"
import { Grid } from "./index.js"
import { Default as GridRow } from "../GridRow/GridRow.stories.js"
import { Default as GridColumn } from "../GridColumn/GridColumn.stories.js"

export default {
  title: "Design System/Grid/Grid",
  component: Grid,
  argTypes: {},
}

const Template = (args) =>
<Grid {...args}>
</Grid>


export const Default = Template.bind({})
Default.args = {
  children: 
  <GridRow {...GridRow.args} /> 
}

export const Auto = Template.bind({})
Auto.args = {
  auto: true,
  children: <GridRow {...GridRow.args} /> 
}



