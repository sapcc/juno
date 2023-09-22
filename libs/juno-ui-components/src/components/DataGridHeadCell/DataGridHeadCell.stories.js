import React from "react"
import { DataGrid } from "../DataGrid/index.js"
import { DataGridRow } from "../DataGridRow/index.js"
import { DataGridHeadCell } from "./index.js"

export default {
  title: "Components/DataGrid/DataGridHeadCell",
  component: DataGridHeadCell,
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

const Template = (args) => <DataGridHeadCell {...args}></DataGridHeadCell>

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Juno DataGridHeadCell for use in DataGrid",
    },
  },
}
Default.args = {
  children: ["DataGridHeadCell"],
}

export const NoWrap = Template.bind({})
NoWrap.parameters = {
  docs: {
    description: {
      story: "Juno DataGridHeadCell with nowrap option (content has white-space: nowrap;)",
    },
  },
}
NoWrap.args = {
  nowrap: true,
  children: ["DataGridHeadCell does not wrap"],
}

export const ColSpan = Template.bind({})
ColSpan.parameters = {
  docs: {
    description: {
      story: "Juno DataGridHeadCell with colspan",
    },
  },
}
ColSpan.args = {
  colSpan: 3,
  children: ["DataGridHeadCell with colspan"],
}