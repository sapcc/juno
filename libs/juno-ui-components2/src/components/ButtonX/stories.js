import React from "react"

import { ButtonX } from "."

export default {
  title: "Example/ButtonX",
  component: ButtonX,
  argTypes: {
    backgroundColor: { control: "color" },
  },
}

const Template = (args) => <ButtonX {...args} />

export const Primary = Template.bind({})
Primary.args = {
  primary: true,
  label: "Button",
}

export const Secondary = Template.bind({})
Secondary.args = {
  label: "Button",
}

export const Large = Template.bind({})
Large.args = {
  size: "large",
  label: "Button",
}

export const Small = Template.bind({})
Small.args = {
  size: "small",
  label: "Button",
}
