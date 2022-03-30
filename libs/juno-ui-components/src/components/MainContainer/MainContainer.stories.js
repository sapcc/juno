import React from "react"

import { MainContainer } from "./index.js"

export default {
  title: "Internal/MainContainer",
  component: MainContainer,
  argTypes: {},
}

const Template = (args) => <MainContainer {...args}></MainContainer>

export const Main = Template.bind({})
Main.parameters = {
  docs: {
    description: {
      story:
        "Only needed if you want to build your app's scaffold manually. In most cases it is better to use the AppShell component instead. Main container for all content of the app. Wrapper for content containers.",
    },
  },
}
Main.args = {}
