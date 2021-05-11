import React from "react"

import Stack from "./index.js"
import DummyBoxList from "../../components/storybook/DummyElements/DummyBoxList"
import DummyBox from "../../components/storybook/DummyElements/DummyBox"

export default {
  title: "Design System/Primitives/Stack",
  component: Stack,
}

const Template = (args) => (
  <Stack {...args} >
    <DummyBoxList count={5} size="small" />
  </Stack>
)

export const Horizontal = Template.bind({})
Horizontal.args = {}

export const HorizontalGap = Template.bind({})
HorizontalGap.args = {
  gap: "4"
}