import React from "react"

import { PageHeader } from "./index.js"

export default {
  title: "Layout/PageHeader",
  component: PageHeader,
  argTypes: {},
}

const Template = (args) => <PageHeader {...args}></PageHeader>

export const Simple = Template.bind({})
Simple.parameters = {
  docs: {
    description: {
      story:
        "The page header component renders a header at the top of the website. Place as first child of AppBody.",
    },
  },
}
Simple.args = {}

export const WithHeading = Template.bind({})
WithHeading.parameters = {
  docs: {
    description: { story: "PageHeader with Heading." },
  },
}
WithHeading.args = {
  heading: "My Awesome App",
}
