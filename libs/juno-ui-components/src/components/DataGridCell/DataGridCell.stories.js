import React from "react"
import { DataGrid } from "../DataGrid/index.js"
import { DataGridRow } from "../DataGridRow/index.js"
import { DataGridCell } from "./index.js"

export default {
  title: "Components/DataGrid/DataGridCell",
  component: DataGridCell,
  argTypes: {
    children: {
      control: false
    },
  },
  decorators: [
    (story) => (
      <DataGrid columns={3}>
        <DataGridRow>{story()}</DataGridRow>
      </DataGrid>
    ),
  ],
  parameters: {
    docs: {
      source: {
        excludeDecorators: false,
      },
    },
  }
}

const Template = (args) => <DataGridCell {...args}></DataGridCell>

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Juno DataGridCell for use in DataGrid",
    },
  },
}
Default.args = {
  children: ["DataGridCell"],
}

export const NoWrap = Template.bind({})
NoWrap.parameters = {
  docs: {
    description: {
      story: "Juno DataGridCell with nowrap option (content has white-space: nowrap;)",
    },
  },
}
NoWrap.args = {
  nowrap: true,
  children: ["DataGridCell does not wrap"],
}

export const ColSpan = Template.bind({})
ColSpan.parameters = {
  docs: {
    description: {
      story: "Juno DataGridCell with colspan",
    },
  },
}
ColSpan.args = {
  colSpan: 3,
  children: ["DataGridCell with colspan"],
}
