import React from "react"

import { ContentAreaHeading } from "./index.js"
import { ContentArea } from "../ContentArea/index.js"
import { Button } from "../Button/index.js"

export default {
  title: "Design System/Layout/ContentAreaHeading",
  component: ContentAreaHeading,
  argTypes: {},
}

const Template = (args) => (
  <ContentAreaHeading {...args} />
)

export const Basic = Template.bind({})
Basic.parameters = {
  docs: {
    description: {
      story:
        "This is the main heading of the content area.",
    },
  },
}
Basic.args = {
  heading: "My Page Heading"
}
