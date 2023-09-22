import React from "react"

import { ContentAreaToolbar } from "./index.js"
import { Button } from "../Button/index.js"

export default {
  title: "Layout/ContentAreaToolbar",
  component: ContentAreaToolbar,
  argTypes: {
    children: {
      control: false
    },
  },
}

const Template = (args) => (
  <ContentAreaToolbar {...args}>
    <Button>Main Action</Button>
  </ContentAreaToolbar>
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
