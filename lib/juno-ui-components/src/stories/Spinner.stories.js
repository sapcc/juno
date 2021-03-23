import React from "react"

import { Spinner } from "../components/Spinner/index.js"

export default {
  title: "Example/Spinner",
  component: Spinner,
  argTypes: {
    // backgroundColor: { control: "color" },
    // labelColor: { control: "color" },
    // hoverColor: { control: "color" },
    // outlineColor: { control: "color" },
  },
}

const Template = (args) => <Spinner {...args} />

export const Primary = Template.bind({})
Primary.args = {
  color: "primary",
}

export const Danger = Template.bind({})
Danger.args = { color: "danger" }

export const Success = Template.bind({})
Success.args = { color: "success" }

export const Warning = Template.bind({})
Warning.args = { color: "warning" }

export const Light = Template.bind({})
Light.args = {}
