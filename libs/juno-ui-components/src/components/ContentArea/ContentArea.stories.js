import React from "react"

import { ContentArea } from "./index.js"

export default {
  title: "Design System/Layout/ContentArea",
  component: ContentArea,
  argTypes: {},
}

const Template = (args) => <ContentArea {...args}>Content goes here</ContentArea>

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
