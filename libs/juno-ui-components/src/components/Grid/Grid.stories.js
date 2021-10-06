import React from "react"
import { Grid } from "./index.js"
import { Default as GridRow } from "../GridRow/GridRow.stories.js"
import { Row6 as GridRow6 } from "../GridRow/GridRow.stories.js"
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
  children: <GridRow6 {...GridRow6.args} /> 
}

export const TestGrid = Template.bind({})
TestGrid.args = {
  children: 
    <GridRow>
      <GridColumn>Column</GridColumn>
      <GridColumn auto>Auto Column</GridColumn>
      <GridColumn width={10}>Column 10%</GridColumn>
      <GridColumn cols={3}>Auto Column</GridColumn>
    </GridRow>
}

export const TestGridAuto = Template.bind({})
TestGridAuto.args = {
  auto: true,
  children:
    <GridRow>
    <GridColumn>Column</GridColumn>
    <GridColumn auto>Auto Column</GridColumn>
    <GridColumn width={10}>Column 10%</GridColumn>
    <GridColumn cols={3}>Auto Column</GridColumn>
  </GridRow>
    
}

