import React from "react"

import { ContentContainer } from "./index.js"

export default {
  title: "Design System/Layout/ContentContainer",
  component: ContentContainer,
  argTypes: {},
}

const Template = (args) => <ContentContainer {...args}></ContentContainer>

export const Main = Template.bind({})
Main.parameters = {
  docs: {
    description: {
      story:
        "Main container for all content of the app. Wrapper for content containers.",
    },
  },
}
Main.args = {}
