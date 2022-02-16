import React from "react"

import { ContentAreaWrapper } from "./index.js"
import { ContentArea } from "../ContentArea/index.js"
import { ContentAreaToolbar } from "../ContentAreaToolbar/index.js"
import { Button } from "../Button/index.js"

export default {
  title: "Design System/Layout/ContentAreaWrapper",
  component: ContentAreaWrapper,
  argTypes: {},
}

const Template = (args) => (
  <ContentAreaWrapper {...args}>
    <ContentAreaToolbar>
      <Button>Example</Button>
    </ContentAreaToolbar>
    <ContentArea>Content goes here</ContentArea>
  </ContentAreaWrapper>
)

export const Basic = Template.bind({})
Basic.parameters = {
  docs: {
    description: {
      story:
        "This is the area in which the actual content of each page should be injected.",
    },
  },
}
Basic.args = {}
