import React from "react"
import { Grid } from "./index.js"

export default {
  title: "Design System/Grid/Grid",
  component: Grid,
  argTypes: {},
}

const Template = (args) =>
<Grid {...args}>
  {args.children}
</Grid>


export const Default = Template.bind({})
Default.args = {
  
}

export const Col12 = Template.bind({})
Col12.args = {
  columns: 12
}
