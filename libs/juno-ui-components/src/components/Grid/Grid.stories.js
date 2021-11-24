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
Default.parameters = {
  docs: {
    description: { 
      story: "By default, Juno uses a 12-column fluid grid. Columns can be made to span multiple columns by passing `cols={n}`."
    }
  },
}
Default.args = {
  children: [
  <GridRow key="1">
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
    <GridColumn>Column</GridColumn>
  </GridRow>,
  <GridRow key="2">
    <GridColumn>Column</GridColumn>
    <GridColumn cols={3}>Column cols-3</GridColumn>
    <GridColumn cols={5}>Column cols-5</GridColumn>
    <GridColumn cols={2}>Column cols-2</GridColumn>
  </GridRow>
  ]
}


export const Auto = Template.bind({})
Auto.parameters = {
  docs: {
    description: { 
      story: "By passing `auto` to the grid, all of its contained columns will automatically size to share available space equally. Columns with `cols={n}` will switch their behaviour to auto-size."
    }
  },
}
Auto.args = {
  auto: true,
  children:  [
    <GridRow key="1">
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
    </GridRow>,
    <GridRow key="2">
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
    </GridRow>,
    <GridRow key="3">
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
      <GridColumn>Column</GridColumn>
    </GridRow>
  ]
}

export const MixedGrid = Template.bind({})
MixedGrid.args = {
  children: 
    <GridRow>
      <GridColumn>Column</GridColumn>
      <GridColumn auto>Auto Column</GridColumn>
      <GridColumn width={10}>Column 10%</GridColumn>
      <GridColumn cols={3}>Auto Column</GridColumn>
    </GridRow>
}

export const MixedAutoGrid = Template.bind({})
MixedAutoGrid.args = {
  auto: true,
  children:
    <GridRow>
      <GridColumn>Column</GridColumn>
      <GridColumn auto>Auto Column</GridColumn>
      <GridColumn width={10}>Column 10%</GridColumn>
      <GridColumn cols={3}>Auto Column</GridColumn>
    </GridRow> 
}

export const NestedGrid = Template.bind({})
NestedGrid.args = {
  children:
    <GridRow>
      <GridColumn cols={3}>Column cols-3</GridColumn>
      <GridColumn cols={9}>
        <Grid>
          <GridRow>
            <GridColumn width={33.333333} className="bg-juno-blue-2">Nested Column 33.333333%</GridColumn>
            <GridColumn width={66.666666} className="bg-juno-blue-2">Nested Column 66.666666%</GridColumn>
          </GridRow>
        </Grid>
      </GridColumn>
    </GridRow>
}

