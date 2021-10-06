import React from "react"
import { GridRow } from "./index.js"
import { Default as GridColumn } from "../GridColumn/GridColumn.stories.js"


export default {
  title: "Design System/Grid/GridRow",
  component: GridRow,
  argTypes: {},
}

const Template = ({columns, ...args}) => (
  <GridRow {...args}>
  </GridRow>
)

export const Default = Template.bind({})
Default.args = {
  children:
      [
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>,
        <GridColumn {...GridColumn.args}/>
      ]
}

export const Row6 = Template.bind({})
Row6.args = {
  children: [
    <GridColumn {...GridColumn.args}/>,
    <GridColumn {...GridColumn.args}/>,
    <GridColumn {...GridColumn.args}/>,
    <GridColumn {...GridColumn.args}/>,
    <GridColumn {...GridColumn.args}/>,
    <GridColumn {...GridColumn.args}/>
  ]
}
