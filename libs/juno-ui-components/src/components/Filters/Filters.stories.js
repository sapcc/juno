import React from "react"
import { Filters } from "./index.js"

export default {
  title: "WiP/Filters",
  component: Filters,
  argTypes: {},
}

const Template = (args) => <Filters {...args} />

export const Default = Template.bind({})
Default.args = {}