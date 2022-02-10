import React from "react"

import { MainContainer } from "./index.js"

export default {
  title: "Design System/Layout/MainContainer",
  component: MainContainer,
  argTypes: {
  },
}

const Template = (args) => <MainContainer {...args}></MainContainer>

export const Main = Template.bind({})
Main.parameters = {
  docs: {
    description: { story: 'Main container for all content of the app. Wrapper for content containers.'}
  },
}
Main.args = {}

