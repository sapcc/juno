import React from "react"

import { Container } from "./index.js"

export default {
  title: "Layout/Container",
  component: Container,
  argTypes: {},
}

const Template = (args) => <Container {...args}>Content goes here</Container>

export const Basic = Template.bind({})
Basic.parameters = {
  docs: {
    description: {
      story:
        "Section for content displayed in the main content area. Has padding. Typically you will want to use one of these sections to wrap your main content inside as the content area itself doesn't have padding to allow for full-width content or content to be placed at the very top or bottom.",
    },
  },
}
Basic.args = {}
