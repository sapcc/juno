import React from "react"
import { Pill } from "./index.js"

export default {
  title: "Components/Pill",
  component: Pill,
  argTypes: {},
}

const Template = (args) => <Pill {...args} />

export const Default = Template.bind({})
Default.args = {
  pillKey: "os",
  pillKeyLabel: "OS",
  pillValue: "mac_os",
  pillValueLabel: "Mac OS",
}

export const Closeable = Template.bind({})
Closeable.args = {
  pillKey: "os",
  pillKeyLabel: "OS",
  pillValue: "mac_os",
  pillValueLabel: "Mac OS",
  closeable: true
}

export const ValueOnly = Template.bind({})
ValueOnly.args = {
  pillValue: "mac_os",
  pillValueLabel: "Mac OS",
}

export const ValueOnlyCloseable = Template.bind({})
ValueOnlyCloseable.args = {
  pillValue: "mac_os",
  pillValueLabel: "Mac OS",
  closeable: true
}