import React from "react"
import { Button } from "../Button/index.js"
import { ButtonRow } from "../ButtonRow/index.js"
import { DataGridToolbar } from "./index.js"
import { SearchInput } from "../SearchInput/SearchInput.component"


export default {
  title: "Components/DataGrid/DataGridToolbar",
  component: DataGridToolbar,
  argTypes: {
    children: {
      control: false
    },
    search: {
      control: false
    },
  },
}

const Template = (args) => 
  <DataGridToolbar {...args}>
    <ButtonRow>
      <Button variant="subdued">Add other</Button>
      <Button>Add new</Button>
    </ButtonRow>
  </DataGridToolbar>

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story: "Optional toolbar for use in DataGrid. Use ButtonRow for multiple buttons",
    },
  },
}
Default.args = {}

export const WithSearch = Template.bind({})
WithSearch.parameters = {
  docs: {
    description: {
      story: "DataGridToolbar with optional search input",
    },
  },
}
WithSearch.args = {
  search: <SearchInput onSearch={() => {console.log("Searching…")}} />,
}
