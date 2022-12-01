import React from "react"
import { Pagination } from "./index.js"

export default {
  title: "WiP/Pagination",
  component: Pagination,
  argTypes: {},
}

const Template = (args) => <Pagination {...args} />

export const Default = Template.bind({})
Default.args = {}

export const PaginationWithNumber = Template.bind({})
PaginationWithNumber.args = {
  variant: "number",
  currentPage: 3,
}

export const PaginationWithSelect = Template.bind({})
PaginationWithSelect.args = {
  variant: "select",
  currentPage: 2,
  pages: 6,
}

export const PaginationWithInput = Template.bind({})
PaginationWithInput.args = {
  variant: "input",
  currentPage: 3,
  pages: 6,
}