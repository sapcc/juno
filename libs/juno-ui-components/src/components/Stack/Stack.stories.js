import React from "react"
import DummyComponentList from "../../../.storybook/components/DummyComponentList"

import { Stack } from "./index.js"

export default {
  title: "Design System/Layout/Stack",
  component: Stack,
  argTypes: {
    gap: {
      options: [0,"px",0.5,1,1.5,2,2.5,3,3.5,4,5,6,7,8,9,10,11,12,14,16,20,24,28,32,36,40,44,48,52,56,60,64,72,80,96],
    }
  },
}

const Template = (args) => <Stack {...args}><DummyComponentList count={5} /></Stack>

export const Horizontal = Template.bind({})
Horizontal.parameters = {
  docs: {
    description: { story: 'Default stack direction.'}
  },
}
Horizontal.args = {}

export const Vertical = Template.bind({})
Vertical.parameters = {
  docs: {
    description: { story: 'Children can also be stacked vertically.'}
  },
}
Vertical.args = {
  direction: "vertical"
}

export const GapHorizontal = Template.bind({})
GapHorizontal.parameters = {
  docs: {
    description: { story: 'By specifying a gap, the child elements will have the specified margin from one another. It is the same for horizontal and vertical stacks.'}
  },
}
GapHorizontal.args = {
  gap: 4
}

export const GapVertical = Template.bind({})
GapVertical.parameters = {
  docs: {
    description: { story: 'By specifying a gap, the child elements will have the specified margin from one another. It is the same for horizontal and vertical stacks.'}
  },
}
GapVertical.args = {
  direction: "vertical",
  gap: 3
}
