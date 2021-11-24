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
  children: [
    <GridColumn key="1">Column</GridColumn>,
    <GridColumn key="2">Column</GridColumn>,
    <GridColumn key="3">Column</GridColumn>,
    <GridColumn key="4">Column</GridColumn>,
    <GridColumn key="5">Column</GridColumn>,
    <GridColumn key="6">Column</GridColumn>,
    <GridColumn key="7">Column</GridColumn>,
    <GridColumn key="8">Column</GridColumn>,
    <GridColumn key="9">Column</GridColumn>,
    <GridColumn key="10">Column</GridColumn>,
    <GridColumn key="11">Column</GridColumn>,
    <GridColumn key="12">Column</GridColumn>
  ]
}

