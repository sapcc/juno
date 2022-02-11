import React from "react"

import { ContentContainer } from "./index.js"

export default {
  title: "Design System/Layout/ContentContainer",
  component: ContentContainer,
  argTypes: {},
}

const Template = (args) => <ContentContainer {...args}></ContentContainer>

export const Centered = Template.bind({})
Centered.parameters = {
  docs: {
    description: {
      story:
        "A wrapper for content components. Parent of ContentArea. Width will grow to the maximum breakpoint width and then be centered on the page if the browser is wider.",
    },
  },
}
Centered.args = {}
