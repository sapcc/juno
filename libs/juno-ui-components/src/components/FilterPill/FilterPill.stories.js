import React from "react"
import { FilterPill } from "./index.js"

export default {
  title: "Components/Filter/FilterPill",
  component: FilterPill,
  argTypes: {},
}

const Template = (args) => <FilterPill {...args} />

export const Default = Template.bind({})
Default.args = {
  filterKey: "os",
  filterKeyLabel: "OS",
  filterValue: "mac_os",
  filterValueLabel: "Mac OS",
}
