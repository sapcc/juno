import React from "react"
import { Box } from "./index"

export default {
  title: "Components/Box",
  component: Box,
  argTypes: {},
}

const Template = (args) => <Box {...args} />

export const Default = Template.bind({})
Default.parameters = {
  docs: {
    description: {
      story:
      "A default Box",
    },
  },
}
Default.args = {
  children: "Some content in a Box."
}

export const UnpaddedBox = Template.bind({})
UnpaddedBox.parameters = {
  docs: {
    description: {
      story: "To remove the padding, set `unpad` prop."
    }
  }
}
UnpaddedBox.args = {
  children: "Unpadded Box",
  unpad: true,
}