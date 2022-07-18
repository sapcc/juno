import React from "react"
import { Button } from "../Button/index.js"
import { DataGridToolbar } from "./index.js"


export default {
  title: "Components/DataGrid/DataGridToolbar",
  component: DataGridToolbar,
  argTypes: {},
}

const Template = (args) => <DataGridToolbar {...args}><Button variant="primary">Add new</Button></DataGridToolbar>

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Optional toolbar for use in DataGrid",
    },
  },
}
Default.args = {}
