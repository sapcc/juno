import React from "react"

import { AppBody } from "./index.js"

export default {
  title: "Design System/Layout/AppBody",
  component: AppBody,
  argTypes: {},
}

const Template = (args) => <AppBody {...args}></AppBody>

export const Body = Template.bind({})
Body.parameters = {
  docs: {
    description: {
      story:
        "Body of the app. Treat this like the body tag of an html page.",
    },
  },
}
Body.args = {}
