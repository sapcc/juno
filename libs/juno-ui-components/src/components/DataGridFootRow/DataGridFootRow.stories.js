import React from "react"
import { DataGridFootRow } from "./index.js"
import { DataGridCell } from "../DataGridCell/index.js"
import { Default as DataGridCellStory } from "../DataGridCell/DataGridCell.stories.js"

export default {
  title: "Components/DataGrid/DataGridFootRow",
  component: DataGridFootRow,
  argTypes: {},
  decorators: [
    (story) => (
      <table>
        <tfoot>{story()}</tfoot>
      </table>
    ),
  ],
}

const Template = ({ items, ...args }) => (
  <DataGridFootRow {...args}>
    {items.map((item, i) => (
      <DataGridCell {...item} key={`${i}`} />
    ))}
  </DataGridFootRow>
)

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Juno DataGridFootRow for use in DataGrid",
    },
  },
}
Default.args = {
  items: [
    { ...DataGridCellStory.args },
    { ...DataGridCellStory.args },
    { ...DataGridCellStory.args },
    { ...DataGridCellStory.args },
    { ...DataGridCellStory.args },
  ],
}
