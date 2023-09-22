import React from "react"

import { PageFooter } from "./index.js"

export default {
  title: "Layout/PageFooter",
  component: PageFooter,
  argTypes: {
    children: {
      control: false
    },
  },
}

const Template = (args) => <PageFooter {...args}></PageFooter>

export const Simple = Template.bind({})
Simple.parameters = {
  docs: {
    description: {
      story:
        "The page footer component renders a footer at the bottom of the website. Place as last child of AppBody.",
    },
  },
}
Simple.args = {}
