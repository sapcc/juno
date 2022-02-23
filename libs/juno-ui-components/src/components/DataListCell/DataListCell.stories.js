import React from "react"
import { DataListCell } from "./index.js"

export default {
  title: "Design System/DataList/DataListCell",
  component: DataListCell,
  argTypes: {},
}

const Template = (args) =>
<DataListCell {...args}>
</DataListCell>


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	description: { 
	  story: "Juno DataListCell for displaying data"
	}
  },
}
Default.args = {
  children: [
	"DataListCell"
  ]
}

export const AutoWidth = Template.bind({})
AutoWidth.parameters = {
  docs: {
    description: {
      story: "Juno DataListCell set to 'auto' in order to maximize width"
    }
  },
}
AutoWidth.args = {
  auto: true,
  children: [
    "AutoDataListCell"
  ]
}