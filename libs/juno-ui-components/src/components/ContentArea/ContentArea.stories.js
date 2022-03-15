import React from "react"

import { ContentArea } from "./index.js"

export default {
  title: "Design System/Internal/ContentArea",
  component: ContentArea,
  argTypes: {},
}

const Template = (args) => (
  <ContentArea {...args}>Content goes here</ContentArea>
)

export const Basic = Template.bind({})
Basic.parameters = {
  docs: {
    description: {
      story:
        "Only needed if you want to build your app's scaffold manually. In most cases it is better to use the AppShell component instead. This is the area in which the actual content of each page should be injected.",
    },
  },
}
Basic.args = {}
