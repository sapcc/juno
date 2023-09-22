import React from "react"

import { ContentAreaHeading } from "./index.js"
import { ContentArea } from "../ContentArea/index.js"
import { Button } from "../Button/index.js"

export default {
  title: "Internal/ContentAreaHeading",
  component: ContentAreaHeading,
  argTypes: {
    children: {
      control: false
    },
  },
}

const Template = (args) => <ContentAreaHeading {...args} />

export const Basic = Template.bind({})
Basic.parameters = {
  docs: {
    description: {
      story:
        "Only needed if you want to build your app's scaffold manually. In most cases it is better to use the AppShell component instead. This is the main heading of the content area.",
    },
  },
}
Basic.args = {
  heading: "My Page Heading",
}
