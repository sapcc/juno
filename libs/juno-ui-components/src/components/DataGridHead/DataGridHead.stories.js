import React from "react"
import { DataGridHead } from "./index.js"
import { DataGridHeadRow } from "../DataGridHeadRow/index.js"
import { DataGridHeadCell } from "../DataGridHeadCell/index.js"
import { Default as DataGridHeadRowStory } from "../DataGridHeadRow/DataGridHeadRow.stories.js"



export default {
  title: "Design System/DataGrid/DataGridHead",
  component: DataGridHead,
  argTypes: {},
  decorators: [ story => <table>{story()}</table>],
}

const Template = ({ items, ...args }) => (
  <DataGridHead {...args}>
    {items.map((item, i) => (
      <DataGridHeadRow key={`${i}`}>
        {item.items.map((cell, c) => (
          <DataGridHeadCell {...cell} key={`${i}_${c}`} />
        ))}
      </DataGridHeadRow>
    ))}
  </DataGridHead>
)


export const Default = Template.bind({})
Default.parameters = {
  docs: {
	  description: { 
	    story: "Juno DataGridHead for use in DataGrid"
	  }
  },
}
Default.args = {
  items: [
    {...DataGridHeadRowStory.args}
  ]
}
