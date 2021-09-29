import React from "react"
import { GridRow } from "./index.js"
import { GridColumn } from "../GridColumn/index.js"


export default {
  title: "Design System/Grid/GridRow",
  component: GridRow,
  argTypes: {},
}

const Template = ({columns, ...args}) => (
  <GridRow {...args}>
    {args.children}
  </GridRow>
)

export const Default = Template.bind({})
Default.args = {}
