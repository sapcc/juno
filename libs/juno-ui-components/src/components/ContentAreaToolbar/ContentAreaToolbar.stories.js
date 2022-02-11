import React from "react"

import { ContentAreaToolbar } from "./index.js"
import { ContentArea } from "../ContentArea/index.js"
import { Button } from "../Button/index.js"

export default {
  title: "Design System/Layout/ContentAreaToolbar",
  component: ContentAreaToolbar,
  argTypes: {},
}

const Template = (args) => (
  <ContentArea><ContentAreaToolbar {...args}><Button>Main Action</Button></ContentAreaToolbar>This is the content area</ContentArea>
)

export const Basic = Template.bind({})
Basic.parameters = {
  docs: {
    description: {
      story:
        "This is the main toolbar of the content area. Add main actions, search bar, filters for the current page here.",
    },
  },
}
Basic.args = {}

export const WithHeading = Template.bind({})
WithHeading.parameters = {
  docs: {
    description: {
      story: "Content Area with Heading.",
    },
  },
}
WithHeading.args = {
  heading: "My Content Heading",
}
